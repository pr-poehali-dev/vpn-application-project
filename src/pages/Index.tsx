import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Home from './Home';
import Connect from './Connect';
import Servers from './Servers';
import Stats from './Stats';
import Help from './Help';
import About from './About';

type Page = 'home' | 'connect' | 'servers' | 'stats' | 'help' | 'about';

const navItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'connect', label: 'Подключение', icon: 'Shield' },
  { id: 'servers', label: 'Серверы', icon: 'Globe' },
  { id: 'stats', label: 'Статистика', icon: 'BarChart2' },
  { id: 'help', label: 'Справка', icon: 'HelpCircle' },
  { id: 'about', label: 'О приложении', icon: 'Info' },
] as const;

export default function Index() {
  const [page, setPage] = useState<Page>('home');

  const handleNavigate = (p: string) => setPage(p as Page);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'connect': return <Connect />;
      case 'servers': return <Servers />;
      case 'stats': return <Stats />;
      case 'help': return <Help />;
      case 'about': return <About />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-56 border-r border-border bg-card/50 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-emerald-400" />
          </div>
          <span className="font-bold text-white tracking-tight">Secure<span className="text-emerald-400">VPN</span></span>
        </div>

        <div className="mx-3 mt-3 mb-2 px-3 py-2.5 rounded-lg bg-emerald-400/5 border border-emerald-400/15">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-blink" />
            <span className="text-xs text-emerald-400 font-medium">Защита активна</span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 font-mono">185.220.101.42</div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as Page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-left text-sm
                ${page === item.id
                  ? 'bg-emerald-400/10 text-emerald-400 font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-border">
          <div className="text-xs text-muted-foreground font-mono">v2.4.1</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-card/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
              <Icon name="Shield" size={13} className="text-emerald-400" />
            </div>
            <span className="font-bold text-white text-sm">Secure<span className="text-emerald-400">VPN</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-blink" />
            <span className="text-xs text-emerald-400 font-medium">Активно</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>

        <nav className="md:hidden flex border-t border-border bg-card/80 backdrop-blur-sm flex-shrink-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as Page)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 transition-colors duration-150
                ${page === item.id ? 'text-emerald-400' : 'text-muted-foreground'}`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-[10px] leading-none">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
