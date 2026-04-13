import Icon from '@/components/ui/icon';

const team = [
  { name: 'Алексей Морозов', role: 'Основатель & CEO', avatar: 'AM' },
  { name: 'Анна Соколова', role: 'Head of Security', avatar: 'АС' },
  { name: 'Дмитрий Волков', role: 'Lead Engineer', avatar: 'ДВ' },
];

const milestones = [
  { year: '2019', event: 'Основание компании в Цюрихе' },
  { year: '2020', event: 'Запуск первой версии сервиса' },
  { year: '2021', event: 'Независимый аудит безопасности' },
  { year: '2023', event: 'Переход на протокол WireGuard' },
  { year: '2024', event: '100 000+ активных пользователей' },
];

export default function About() {
  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">О приложении</h1>
      <p className="text-muted-foreground text-sm mb-8">SecureVPN v2.4.1</p>

      {/* Mission */}
      <div className="relative bg-card border border-border rounded-xl p-5 mb-6 overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-400/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Shield" size={20} className="text-emerald-400" />
            <span className="text-sm font-semibold text-white">Наша миссия</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Мы верим, что конфиденциальность в интернете — это право каждого. 
            SecureVPN создан, чтобы обеспечить надёжную защиту данных для частных лиц и бизнеса 
            по всему миру без компромиссов в скорости и простоте.
          </p>
        </div>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Основана', value: '2019' },
          { label: 'Юрисдикция', value: 'Швейцария' },
          { label: 'Пользователей', value: '100K+' },
          { label: 'Аудит', value: 'Verified' },
        ].map((f, i) => (
          <div key={i} className="bg-secondary/50 border border-border rounded-xl p-3.5">
            <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
            <div className="text-sm font-semibold text-white">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">История</h2>
      <div className="relative pl-6 mb-8">
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border" />
        {milestones.map((m, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <div className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full border-2 border-emerald-400 bg-background" />
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-semibold text-emerald-400 w-10 flex-shrink-0">{m.year}</span>
              <span className="text-sm text-foreground">{m.event}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Команда</h2>
      <div className="space-y-2 mb-8">
        {team.map((member, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5 bg-card border border-border rounded-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-emerald-400">{member.avatar}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{member.name}</div>
              <div className="text-xs text-muted-foreground">{member.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {[
          { icon: 'Award', label: 'ISO 27001 сертифицировано', sub: 'Управление информационной безопасностью' },
          { icon: 'FileCheck', label: 'Независимый аудит Cure53', sub: 'Ежегодная проверка кода и инфраструктуры' },
          { icon: 'Eye', label: 'Нет журналов активности', sub: 'Подтверждено третьей стороной' },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <Icon name={c.icon} size={16} className="text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>SecureVPN © 2019–2024</p>
        <p className="mt-1 font-mono">Версия 2.4.1 · Build 20241013</p>
      </div>
    </div>
  );
}
