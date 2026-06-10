import { ChevronLeft, ChevronRight } from 'lucide-preact';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onToday }: CalendarHeaderProps) {
  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-black text-surface-800 dark:text-surface-100">
          {monthName} <span className="text-primary-600 dark:text-primary-400">{year}</span>
        </h2>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={onToday}
          className="px-2.5 py-1.5 sm:px-3 sm:py-2 mr-1 sm:mr-2 text-xs sm:text-sm font-bold bg-surface-100 text-surface-700 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 rounded-lg sm:rounded-xl transition-all active:scale-95 shadow-sm"
        >
          Hari Ini
        </button>
        <button 
          onClick={onPrevMonth}
          className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-surface-50 text-surface-600 hover:bg-surface-100 hover:text-primary-600 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 active:scale-95 shadow-sm"
          aria-label="Bulan Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button 
          onClick={onNextMonth}
          className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-surface-50 text-surface-600 hover:bg-surface-100 hover:text-primary-600 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-primary-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 active:scale-95 shadow-sm"
          aria-label="Bulan Berikutnya"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
