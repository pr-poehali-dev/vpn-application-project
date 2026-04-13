import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { register, login, setToken, User } from '@/lib/auth';

interface AuthProps {
  onSuccess: (user: User, token: string) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = mode === 'login'
      ? await login(email, password)
      : await register(email, password, name);

    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    setToken(res.token);
    onSuccess(res.user, res.token);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 grid-bg">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-emerald-400" />
        </div>
        <span className="font-bold text-xl text-white">Secure<span className="text-emerald-400">VPN</span></span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6">
        <h1 className="text-xl font-bold text-white mb-1">
          {mode === 'login' ? 'Вход в аккаунт' : 'Создать аккаунт'}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {mode === 'login'
            ? 'Введите данные для входа в SecureVPN'
            : 'Зарегистрируйтесь, чтобы начать защиту'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-400/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Пароль</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                required
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2.5">
              <Icon name="AlertCircle" size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-400 text-gray-900 font-semibold py-2.5 rounded-lg hover:bg-emerald-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait mt-1"
          >
            {loading
              ? <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
              : <Icon name={mode === 'login' ? 'LogIn' : 'UserPlus'} size={16} />
            }
            {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-muted-foreground">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs">
        Регистрируясь, вы соглашаетесь с политикой конфиденциальности. Мы не передаём данные третьим лицам.
      </p>
    </div>
  );
}
