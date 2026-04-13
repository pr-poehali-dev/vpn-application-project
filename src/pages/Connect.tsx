import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Protocol = 'wireguard' | 'openvpn';
type Status = 'disconnected' | 'connecting' | 'connected';

export default function Connect() {
  const [status, setStatus] = useState<Status>('disconnected');
  const [protocol, setProtocol] = useState<Protocol>('wireguard');
  const [killSwitch, setKillSwitch] = useState(true);

  const handleConnect = () => {
    if (status === 'disconnected') {
      setStatus('connecting');
      setTimeout(() => setStatus('connected'), 2500);
    } else if (status === 'connected') {
      setStatus('disconnected');
    }
  };

  const statusConfig = {
    disconnected: { label: 'Отключено', color: 'text-muted-foreground', dot: 'bg-muted-foreground', ring: 'border-muted/30' },
    connecting: { label: 'Подключение...', color: 'text-yellow-400', dot: 'bg-yellow-400', ring: 'border-yellow-400/30' },
    connected: { label: 'Защищено', color: 'text-emerald-400', dot: 'bg-emerald-400', ring: 'border-emerald-400/30' },
  };

  const cfg = statusConfig[status];

  return (
    <div className="min-h-full px-6 pt-8 pb-8 grid-bg">
      <h1 className="text-2xl font-bold text-white mb-1">Подключение</h1>
      <p className="text-muted-foreground text-sm mb-8">Управление VPN-соединением</p>

      {/* Main connect button */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative flex items-center justify-center mb-6">
          {status === 'connected' && (
            <>
              <div className={`absolute w-32 h-32 rounded-full border-2 ${cfg.ring} animate-pulse-ring`} />
              <div className={`absolute w-32 h-32 rounded-full border-2 ${cfg.ring} animate-pulse-ring2`} />
            </>
          )}
          <button
            onClick={handleConnect}
            disabled={status === 'connecting'}
            className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 border-2 transition-all duration-500 font-semibold text-sm
              ${status === 'connected'
                ? 'bg-emerald-400/15 border-emerald-400 text-emerald-400 glow-emerald'
                : status === 'connecting'
                  ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400 cursor-wait'
                  : 'bg-secondary border-border text-foreground hover:border-emerald-400/40 hover:bg-secondary/70'
              }`}
          >
            {status === 'connecting' ? (
              <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
            ) : (
              <Icon name={status === 'connected' ? 'ShieldCheck' : 'Shield'} size={32} />
            )}
            <span className="text-xs">{status === 'connected' ? 'Вкл.' : status === 'connecting' ? '...' : 'Выкл.'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${cfg.dot} ${status === 'connecting' ? 'animate-blink' : ''}`} />
          <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</span>
        </div>
        {status === 'connected' && (
          <div className="mt-2 font-mono text-xs text-muted-foreground">
            IP: 185.220.101.42 · 🇩🇪 Германия
          </div>
        )}
      </div>

      {/* Protocol selection */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Протокол</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['wireguard', 'openvpn'] as Protocol[]).map((p) => (
            <button
              key={p}
              onClick={() => setProtocol(p)}
              className={`flex flex-col items-start p-3 rounded-lg border transition-all duration-200 ${
                protocol === p
                  ? 'bg-emerald-400/10 border-emerald-400/40 text-emerald-400'
                  : 'bg-secondary/50 border-transparent text-muted-foreground hover:border-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name={p === 'wireguard' ? 'Zap' : 'Lock'} size={14} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {p === 'wireguard' ? 'WireGuard' : 'OpenVPN'}
                </span>
              </div>
              <span className="text-xs opacity-70">
                {p === 'wireguard' ? 'Быстрый · ChaCha20' : 'Надёжный · AES-256'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-medium text-foreground">Kill Switch</div>
            <div className="text-xs text-muted-foreground mt-0.5">Блокировать трафик без VPN</div>
          </div>
          <button
            onClick={() => setKillSwitch(!killSwitch)}
            className={`w-12 h-6 rounded-full transition-all duration-200 relative ${killSwitch ? 'bg-emerald-400' : 'bg-muted'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${killSwitch ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-medium text-foreground">DNS защита</div>
            <div className="text-xs text-muted-foreground mt-0.5">Безопасный DNS 1.1.1.1</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-medium text-foreground">Шифрование</div>
            <div className="text-xs text-muted-foreground mt-0.5">AES-256-GCM / ChaCha20</div>
          </div>
          <Icon name="CheckCircle" size={16} className="text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
