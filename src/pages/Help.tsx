import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    q: 'Чем WireGuard отличается от OpenVPN?',
    a: 'WireGuard — более новый и быстрый протокол с меньшей задержкой. OpenVPN — проверенный временем протокол с максимальной совместимостью. Рекомендуем WireGuard для большинства задач.',
  },
  {
    q: 'Что такое Kill Switch?',
    a: 'Kill Switch автоматически блокирует весь интернет-трафик, если VPN-соединение прерывается. Это защищает ваш реальный IP-адрес от случайной утечки.',
  },
  {
    q: 'Снижается ли скорость интернета при использовании VPN?',
    a: 'Незначительно. WireGuard обеспечивает скорость близкую к прямому соединению. Выбирайте ближайший сервер с низким пингом для лучшей производительности.',
  },
  {
    q: 'Можно ли использовать VPN на нескольких устройствах?',
    a: 'Да, ваш аккаунт поддерживает до 5 одновременных подключений на разных устройствах.',
  },
  {
    q: 'Как обеспечивается No-Log политика?',
    a: 'Мы не записываем ваш IP-адрес, посещаемые сайты, время сессии или объём трафика. Это подтверждено независимым аудитом.',
  },
];

const guides = [
  { icon: 'Smartphone', title: 'Настройка на Android', time: '5 мин' },
  { icon: 'Monitor', title: 'Настройка на Windows', time: '3 мин' },
  { icon: 'Apple', title: 'Настройка на macOS/iOS', time: '4 мин' },
  { icon: 'Terminal', title: 'Ручная настройка WireGuard', time: '10 мин' },
] as const;

export default function Help() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Справка</h1>
      <p className="text-muted-foreground text-sm mb-8">Ответы на вопросы и руководства</p>

      {/* Guides */}
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Руководства</h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {guides.map((g, i) => (
          <button key={i} className="flex flex-col items-start p-4 bg-card border border-border rounded-xl hover:border-emerald-400/30 transition-all duration-200 text-left">
            <div className="w-9 h-9 rounded-lg bg-emerald-400/10 flex items-center justify-center mb-3">
              <Icon name={g.icon} size={16} className="text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-foreground leading-tight mb-1">{g.title}</span>
            <span className="text-xs text-muted-foreground">{g.time}</span>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Частые вопросы</h2>
      <div className="space-y-2 mb-8">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-3 p-4 text-left"
            >
              <span className="text-sm font-medium text-foreground leading-snug">{faq.q}</span>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support */}
      <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
            <Icon name="MessageCircle" size={18} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Служба поддержки</h3>
            <p className="text-xs text-muted-foreground mb-3">Не нашли ответа? Напишите нам — ответим в течение 2 часов</p>
            <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
              Написать в поддержку
              <Icon name="ArrowRight" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
