import Icon from '@/components/ui/icon';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: 'Серверов', value: '47', icon: 'Server' },
  { label: 'Стран', value: '28', icon: 'Globe' },
  { label: 'Аптайм', value: '99.9%', icon: 'Activity' },
] as const;

const features = [
  { icon: 'Zap', title: 'WireGuard', desc: 'Современный протокол с минимальными задержками и максимальной скоростью', badge: 'Рекомендуется' },
  { icon: 'Lock', title: 'OpenVPN', desc: 'Проверенный протокол с AES-256 шифрованием для максимальной совместимости', badge: 'Стабильный' },
  { icon: 'EyeOff', title: 'Kill Switch', desc: 'Автоматическое отключение трафика при потере VPN-соединения', badge: 'Встроено' },
  { icon: 'Fingerprint', title: 'No-Log политика', desc: 'Мы не храним никаких данных о вашей активности и соединениях', badge: 'Verified' },
] as const;

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-full grid-bg">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center pt-20 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-emerald-400" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-emerald-400" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-emerald-400" />
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-blink" />
          <span className="text-emerald-400 text-xs font-medium tracking-widest uppercase mono">Защита активна</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in-up delay-100">
          Secure<span className="text-emerald-400 text-glow">VPN</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mb-10 animate-fade-in-up delay-200">
          Профессиональная защита данных с поддержкой WireGuard и OpenVPN. Шифрование военного класса.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
          <button
            onClick={() => onNavigate('connect')}
            className="flex items-center gap-2 bg-emerald-400 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-300 transition-all duration-200 glow-emerald-sm"
          >
            <Icon name="Shield" size={18} />
            Подключиться
          </button>
          <button
            onClick={() => onNavigate('servers')}
            className="flex items-center gap-2 bg-secondary text-foreground font-medium px-8 py-3 rounded-lg hover:bg-secondary/70 transition-all duration-200 border border-border"
          >
            <Icon name="Globe" size={18} />
            Выбрать сервер
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 mx-6 mb-10 rounded-xl border border-border bg-card overflow-hidden animate-fade-in-up delay-400">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col items-center py-5 px-3 ${i < 2 ? 'border-r border-border' : ''}`}>
            <Icon name={stat.icon} size={20} className="text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
            <span className="text-muted-foreground text-xs mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="px-6 pb-8">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">Технологии защиты</h2>
        <div className="grid grid-cols-1 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-emerald-400/30 transition-all duration-200 animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s`, opacity: 0, animationFillMode: 'forwards' }}>
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                <Icon name={f.icon} size={18} className="text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm">{f.title}</span>
                  <span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">{f.badge}</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}