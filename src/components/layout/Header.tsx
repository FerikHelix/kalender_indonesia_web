import { Moon, Sun, CalendarDays } from 'lucide-preact';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-surface-900/80 border-b border-surface-200/50 dark:border-surface-800/50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl shadow-lg shadow-primary-500/20">
            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-surface-900 dark:text-white">
            Kalender <span className="text-primary-600 dark:text-primary-400">Libur</span>
          </h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 transition-all text-surface-600 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 hover:scale-105 active:scale-95"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
