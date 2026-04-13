const AUTH_URL = 'https://functions.poehali.dev/cc50a3a3-50d0-4375-b81b-caea41431e9b';
const TOKEN_KEY = 'vpn_token';

export interface User {
  id: number;
  email: string;
  name: string | null;
  plan: string;
  subscription_status?: string;
  subscription_expires?: string | null;
  created_at?: string;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function req(action: string, method: string, body?: object, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${AUTH_URL}?action=${action}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export async function register(email: string, password: string, name: string) {
  return req('register', 'POST', { email, password, name });
}

export async function login(email: string, password: string) {
  return req('login', 'POST', { email, password });
}

export async function getMe(token: string) {
  return req('me', 'GET', undefined, token);
}

export async function logout(token: string) {
  return req('logout', 'POST', {}, token);
}
