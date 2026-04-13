import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { User } from '@/lib/auth';

interface PricingProps {
  user: User | null;
  onAuthRequired: () => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    color: 'text-muted-foreground',
    border: 'border-border',
    badge: null,
    features: [
      { text: '5 ГБ трафика в месяц', ok: true },
      { text: '3 сервера (DE, NL, FI)', ok: true },
      { text: 'WireGuard протокол', ok: true },
      { text: '1 устройство', ok: true },
      { text: 'Kill Switch', ok: false },
      { text: 'Безлимитный трафик', ok: false },
      { text: 'Все 47 серверов', ok: false },
      { text: 'Приоритетная поддержка', ok: false },
    ],
    cta: 'Текущий план',
    ctaStyle: 'bg-secondary text-muted-foreground cursor-default',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 399, yearly: 299 },
    color: 'text-emerald-400',
    border: 'border-emerald-400/40',
    badge: '🔥 Популярный',
    features: [
      { text: 'Безлимитный трафик', ok: true },
      { text: 'Все 47 серверов в 28 странах', ok: true },
      { text: 'WireGuard + OpenVPN', ok: true },
      { text: 'До 5 устройств', ok: true },
      { text: 'Kill Switch', ok: true },
      { text: 'DNS защита', ok: true },
      { text: 'Приоритетная поддержка', ok: false },
      { text: 'Выделенный IP-адрес', ok: false },
    ],
    cta: 'Оформить Pro',
    ctaStyle: 'bg-emerald-400 text-gray-900 hover:bg-emerald-300',
  },
  {
    id: 'business',
    name: 'Business',
    price: { monthly: 899, yearly: 699 },
    color: 'text-yellow-400',
    border: 'border-yellow-400/40',
    badge: '⭐ Максимум',
    features: [
      { text: 'Безлимитный трафик', ok: true },
      { text: 'Все 47 серверов в 28 странах', ok: true },
      { text: 'WireGuard + OpenVPN', ok: true },
      { text: 'До 10 устройств', ok: true },
      { text: 'Kill Switch', ok: true },
      { text: 'DNS защита', ok: true },
      { text: 'Приоритетная поддержка 24/7', ok: true },
      { text: 'Выделенный IP-адрес', ok: true },
    ],
    cta: 'Оформить Business',
    ctaStyle: 'bg-yellow-400 text-gray-900 hover:bg-yellow-300',
  },
] as const;

export default function Pricing({ user, onAuthRequired }: PricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = user?.plan ?? 'free';

  const handleSelect = (planId: string) => {
    if (planId === 'free') return;
    if (!user) { onAuthRequired(); return; }
    // здесь будет переход к оплате
  };

  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Тарифы</h1>
      <p className="text-muted-foreground text-sm mb-6">Выберите план, который подходит вам</p>

      {/* Billing toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-1 bg-secondary border border-border rounded-xl p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${billing === 'monthly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
          >
            Ежемесячно
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${billing === 'yearly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
          >
            Ежегодно
            <span className="text-xs bg-emerald-400/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">−25%</span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="space-y-4">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const price = plan.price[billing];

          return (
            <div
              key={plan.id}
              className={`relative bg-card border-2 rounded-2xl overflow-hidden transition-all duration-200 ${
                plan.id === 'pro' ? 'border-emerald-400/40' : isCurrent ? 'border-emerald-400/30' : plan.border
              }`}
            >
              {/* Top glow for pro */}
              {plan.id === 'pro' && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
              )}

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-lg font-bold ${plan.color}`}>{plan.name}</span>
                      {isCurrent && (
                        <span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">Ваш план</span>
                      )}
                    </div>
                    {plan.badge && (
                      <span className="text-xs text-muted-foreground">{plan.badge}</span>
                    )}
                  </div>
                  <div className="text-right">
                    {price === 0 ? (
                      <div className="text-2xl font-bold text-white">Бесплатно</div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-white font-mono">
                          {price} <span className="text-sm font-normal text-muted-foreground">₽</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {billing === 'yearly' ? 'в месяц · ежегодно' : 'в месяц'}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${f.ok ? 'bg-emerald-400/15' : 'bg-muted/50'}`}>
                        <Icon
                          name={f.ok ? 'Check' : 'X'}
                          size={10}
                          className={f.ok ? 'text-emerald-400' : 'text-muted-foreground/40'}
                        />
                      </div>
                      <span className={`text-sm ${f.ok ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isCurrent ? 'bg-secondary text-muted-foreground cursor-default' : plan.ctaStyle
                  }`}
                >
                  {isCurrent ? (
                    <><Icon name="CheckCircle" size={15} /> Текущий план</>
                  ) : plan.id === 'free' ? (
                    'Бесплатно'
                  ) : (
                    <><Icon name="Zap" size={15} /> {plan.cta}</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-6 p-4 bg-card border border-border rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="ShieldCheck" size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Все планы включают шифрование AES-256, No-Log политику и 30-дневную гарантию возврата денег. Оплата безопасна и защищена.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
