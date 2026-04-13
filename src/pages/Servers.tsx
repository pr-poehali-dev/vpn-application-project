import { useState } from 'react';
import Icon from '@/components/ui/icon';

const servers = [
  { id: 1, country: 'Германия', city: 'Франкфурт', flag: '🇩🇪', ping: 12, load: 34, protocol: 'WireGuard', featured: true },
  { id: 2, country: 'Нидерланды', city: 'Амстердам', flag: '🇳🇱', ping: 18, load: 51, protocol: 'WireGuard' },
  { id: 3, country: 'Финляндия', city: 'Хельсинки', flag: '🇫🇮', ping: 24, load: 22, protocol: 'OpenVPN' },
  { id: 4, country: 'США', city: 'Нью-Йорк', flag: '🇺🇸', ping: 89, load: 67, protocol: 'WireGuard' },
  { id: 5, country: 'Великобритания', city: 'Лондон', flag: '🇬🇧', ping: 31, load: 45, protocol: 'WireGuard' },
  { id: 6, country: 'Япония', city: 'Токио', flag: '🇯🇵', ping: 142, load: 19, protocol: 'OpenVPN' },
  { id: 7, country: 'Швейцария', city: 'Цюрих', flag: '🇨🇭', ping: 27, load: 38, protocol: 'WireGuard' },
  { id: 8, country: 'Канада', city: 'Торонто', flag: '🇨🇦', ping: 95, load: 28, protocol: 'OpenVPN' },
  { id: 9, country: 'Австрия', city: 'Вена', flag: '🇦🇹', ping: 21, load: 15, protocol: 'WireGuard' },
  { id: 10, country: 'Франция', city: 'Париж', flag: '🇫🇷', ping: 35, load: 58, protocol: 'WireGuard' },
];

export default function Servers() {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'wireguard' | 'openvpn'>('all');

  const filtered = servers.filter(s => {
    const matchSearch = s.country.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.protocol.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const getLoadColor = (load: number) => {
    if (load < 40) return 'bg-emerald-400';
    if (load < 70) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getPingColor = (ping: number) => {
    if (ping < 30) return 'text-emerald-400';
    if (ping < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-full px-6 pt-8 pb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Серверы</h1>
      <p className="text-muted-foreground text-sm mb-6">{servers.length} серверов в 28 странах</p>

      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по стране или городу..."
          className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-400/50 transition-colors"
        />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6">
        {(['all', 'wireguard', 'openvpn'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-emerald-400 text-gray-900'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {f === 'all' ? 'Все' : f === 'wireguard' ? 'WireGuard' : 'OpenVPN'}
          </button>
        ))}
      </div>

      {/* Server list */}
      <div className="space-y-2">
        {filtered.map(server => (
          <button
            key={server.id}
            onClick={() => setSelected(server.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
              selected === server.id
                ? 'bg-emerald-400/10 border-emerald-400/40'
                : 'bg-card border-border hover:border-border/80 hover:bg-card/80'
            }`}
          >
            <span className="text-2xl">{server.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{server.country}</span>
                {server.featured && (
                  <span className="text-xs bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded">★ Лучший</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">{server.city}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{server.protocol}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-xs font-mono font-semibold ${getPingColor(server.ping)}`}>{server.ping} мс</span>
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getLoadColor(server.load)}`} style={{ width: `${server.load}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{server.load}%</span>
              </div>
            </div>
            {selected === server.id && (
              <Icon name="CheckCircle" size={16} className="text-emerald-400 ml-1" />
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Серверы не найдены</p>
        </div>
      )}
    </div>
  );
}
