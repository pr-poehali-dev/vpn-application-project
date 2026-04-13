import Icon from '@/components/ui/icon';

const sessionData = [
  { label: 'Сессия', value: '2ч 14м', icon: 'Clock' },
  { label: 'Загружено', value: '1.2 ГБ', icon: 'Upload' },
  { label: 'Скачано', value: '4.7 ГБ', icon: 'Download' },
  { label: 'Сервер', value: 'DE-01', icon: 'Server' },
] as const;

const history = [
  { date: '13 апр', server: '🇩🇪 Германия', duration: '3ч 42м', traffic: '6.1 ГБ', proto: 'WireGuard' },
  { date: '12 апр', server: '🇳🇱 Нидерланды', duration: '1ч 05м', traffic: '0.9 ГБ', proto: 'WireGuard' },
  { date: '11 апр', server: '🇩🇪 Германия', duration: '5ч 18м', traffic: '11.2 ГБ', proto: 'WireGuard' },
  { date: '10 апр', server: '🇨🇭 Швейцария', duration: '0ч 47м', traffic: '0.3 ГБ', proto: 'OpenVPN' },
  { date: '09 апр', server: '🇫🇮 Финляндия', duration: '2ч 31м', traffic: '3.8 ГБ', proto: 'OpenVPN' },
];

const barData = [28, 45, 12, 67, 34, 89, 52];
const barLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const maxBar = Math.max(...barData);

export default function Stats() {
  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Статистика</h1>
      <p className="text-muted-foreground text-sm mb-6">Текущая сессия и история использования</p>

      {/* Session cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {sessionData.map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={item.icon} size={14} className="text-emerald-400" />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-lg font-bold text-white font-mono">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Traffic chart */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Трафик за неделю</h3>
          <span className="text-xs text-muted-foreground font-mono">ГБ</span>
        </div>
        <div className="flex items-end gap-2 h-20">
          {barData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-emerald-400/20 border-t-2 border-emerald-400 transition-all duration-500"
                style={{ height: `${(val / maxBar) * 72}px` }}
              />
              <span className="text-xs text-muted-foreground">{barLabels[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Icon name="TrendingUp" size={12} className="text-emerald-400" />
            <span className="text-xs text-muted-foreground">Всего за неделю: <span className="text-foreground font-mono font-semibold">23.4 ГБ</span></span>
          </div>
        </div>
      </div>

      {/* Connection history */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">История подключений</h3>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{h.server.split(' ')[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{h.server.slice(h.server.indexOf(' ') + 1)}</span>
                  <span className="text-xs bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{h.proto}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{h.date} · {h.duration}</div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{h.traffic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
