import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { User, logout, clearToken } from '@/lib/auth';

interface ProfileProps {
  user: User;
  token: string;
  onLogout: () => void;
  onUpgrade: () => void;
}

const planLabels: Record<string, { label: string; color: string; bg: string }> = {
  free: { label: 'Бесплатный', color: 'text-muted-foreground', bg: 'bg-secondary' },
  pro: { label: 'Pro', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  business: { label: 'Business', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
};

export default function Profile({ user, token, onLogout, onUpgrade }: ProfileProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const plan = planLabels[user.plan] ?? planLabels.free;
  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  const joinDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })
    : 'Недавно';

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout(token);
    clearToken();
    onLogout();
  };

  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Профиль</h1>
      <p className="text-muted-foreground text-sm mb-8">Управление аккаунтом</p>

      {/* Avatar + name */}
      <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl mb-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-emerald-400">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-white truncate">
            {user.name || 'Пользователь'}
          </div>
          <div className="text-sm text-muted-foreground truncate">{user.email}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${plan.bg} ${plan.color}`}>
              {plan.label}
            </span>
            <span className="text-xs text-muted-foreground">с {joinDate}</span>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-card border border-border rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Подписка</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${plan.bg} ${plan.color} font-medium`}>
            {plan.label}
          </span>
        </div>

        {user.plan === 'free' ? (
          <div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Бесплатный план включает 5 ГБ трафика в месяц и доступ к 3 серверам. Обновитесь для снятия ограничений.
            </p>
            <button
              onClick={onUpgrade}
              className="w-full flex items-center justify-center gap-2 bg-emerald-400 text-gray-900 font-semibold py-2.5 rounded-lg hover:bg-emerald-300 transition-all duration-200 text-sm"
            >
              <Icon name="Zap" size={15} />
              Посмотреть тарифы
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Статус</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 font-medium">Активна</span>
              </div>
            </div>
            {user.subscription_expires && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Действует до</span>
                <span className="text-foreground font-mono text-xs">
                  {new Date(user.subscription_expires).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Security */}
      <div className="bg-card border border-border rounded-xl divide-y divide-border mb-5">
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
            <Icon name="Shield" size={15} className="text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Двухфакторная защита</div>
            <div className="text-xs text-muted-foreground">Не настроено</div>
          </div>
          <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Настроить
          </button>
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Icon name="Key" size={15} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Изменить пароль</div>
            <div className="text-xs text-muted-foreground">Обновить данные входа</div>
          </div>
          <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Icon name="Devices" size={15} className="text-muted-foreground" fallback="Monitor" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Активные сессии</div>
            <div className="text-xs text-muted-foreground">1 устройство</div>
          </div>
          <Icon name="ChevronRight" size={15} className="text-muted-foreground" />
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className="w-full flex items-center justify-center gap-2 bg-red-400/10 border border-red-400/20 text-red-400 font-medium py-3 rounded-xl hover:bg-red-400/15 transition-all duration-200 disabled:opacity-50 text-sm"
      >
        {logoutLoading
          ? <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
          : <Icon name="LogOut" size={16} />
        }
        {logoutLoading ? 'Выход...' : 'Выйти из аккаунта'}
      </button>
    </div>
  );
}