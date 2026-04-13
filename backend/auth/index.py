"""
Авторизация пользователей: регистрация, вход, профиль, выход.
POST /register — регистрация (email, password, name)
POST /login — вход (email, password)
GET /me — профиль текущего пользователя (токен в X-Authorization)
POST /logout — выход (токен в X-Authorization)
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p55258415_vpn_application_proj')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def get_user_by_token(conn, token: str):
    cur = conn.cursor()
    cur.execute(
        f"""SELECT u.id, u.email, u.name, u.created_at,
                   s.expires_at, sub.plan, sub.status, sub.expires_at
            FROM {SCHEMA}.sessions s
            JOIN {SCHEMA}.users u ON u.id = s.user_id
            LEFT JOIN {SCHEMA}.subscriptions sub ON sub.user_id = u.id
            WHERE s.token = %s AND s.expires_at > NOW()
            ORDER BY sub.id DESC LIMIT 1""",
        (token,)
    )
    return cur.fetchone()


def json_resp(data: dict, status: int = 200) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, default=str),
    }


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    token = (event.get('headers') or {}).get('X-Authorization', '').replace('Bearer ', '')

    # POST /register
    if method == 'POST' and action == 'register':
        email = (body.get('email') or '').strip().lower()
        password = body.get('password') or ''
        name = (body.get('name') or '').strip()

        if not email or not password:
            return json_resp({'error': 'Email и пароль обязательны'}, 400)
        if len(password) < 6:
            return json_resp({'error': 'Пароль должен быть не менее 6 символов'}, 400)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
        if cur.fetchone():
            conn.close()
            return json_resp({'error': 'Пользователь с таким email уже существует'}, 409)

        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id",
            (email, pw_hash, name or None)
        )
        user_id = cur.fetchone()[0]

        cur.execute(
            f"INSERT INTO {SCHEMA}.subscriptions (user_id, plan, status) VALUES (%s, 'free', 'active')",
            (user_id,)
        )

        new_token = make_token()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)",
            (user_id, new_token)
        )
        conn.commit()
        conn.close()

        return json_resp({
            'token': new_token,
            'user': {'id': user_id, 'email': email, 'name': name, 'plan': 'free'}
        }, 201)

    # POST /login
    if method == 'POST' and action == 'login':
        email = (body.get('email') or '').strip().lower()
        password = body.get('password') or ''

        if not email or not password:
            return json_resp({'error': 'Email и пароль обязательны'}, 400)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, email, name FROM {SCHEMA}.users WHERE email = %s AND password_hash = %s",
            (email, hash_password(password))
        )
        user = cur.fetchone()
        if not user:
            conn.close()
            return json_resp({'error': 'Неверный email или пароль'}, 401)

        user_id, user_email, user_name = user

        cur.execute(
            f"SELECT plan FROM {SCHEMA}.subscriptions WHERE user_id = %s ORDER BY id DESC LIMIT 1",
            (user_id,)
        )
        sub = cur.fetchone()
        plan = sub[0] if sub else 'free'

        new_token = make_token()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)",
            (user_id, new_token)
        )
        conn.commit()
        conn.close()

        return json_resp({
            'token': new_token,
            'user': {'id': user_id, 'email': user_email, 'name': user_name, 'plan': plan}
        })

    # GET /me
    if method == 'GET' and action == 'me':
        if not token:
            return json_resp({'error': 'Требуется авторизация'}, 401)

        conn = get_conn()
        row = get_user_by_token(conn, token)
        conn.close()

        if not row:
            return json_resp({'error': 'Сессия истекла или недействительна'}, 401)

        user_id, email, name, created_at, sess_expires, plan, sub_status, sub_expires = row
        return json_resp({
            'user': {
                'id': user_id,
                'email': email,
                'name': name,
                'created_at': str(created_at),
                'plan': plan or 'free',
                'subscription_status': sub_status or 'active',
                'subscription_expires': str(sub_expires) if sub_expires else None,
            }
        })

    # POST /logout
    if method == 'POST' and action == 'logout':
        if token:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at = NOW() WHERE token = %s", (token,))
            conn.commit()
            conn.close()
        return json_resp({'ok': True})

    return json_resp({'error': 'Маршрут не найден'}, 404)