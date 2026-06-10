import type { CalendarDay } from '../../types';

interface DayCellProps {
  day: CalendarDay;
  isHeader?: boolean;
  label?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function DayCell({ day, isHeader, label, isSelected, onClick }: DayCellProps) {
  if (isHeader) {
    return (
      <div className="py-2 text-center text-[10px] sm:text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest">
        {label}
      </div>
    );
  }

  const isSunday = day.date.getDay() === 0;
  const hasNational = day.holidays.some(h => h.type === 'national');
  const isRedDay = isSunday || hasNational;

  return (
    <button 
      onClick={onClick}
      className={`
        relative w-full text-left min-h-[70px] sm:min-h-[100px] p-1 sm:p-1.5 rounded-2xl flex flex-col transition-all duration-200 outline-none
        ${!day.isCurrentMonth 
          ? 'opacity-40 grayscale hover:grayscale-0' 
          : 'hover:bg-surface-100 dark:hover:bg-surface-800 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20'}
        ${isSelected ? '!bg-primary-50 dark:!bg-primary-500/10 ring-2 ring-primary-500 shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="flex justify-center items-center mb-1 w-full">
        <span className={`
          text-xs sm:text-sm font-bold w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all
          ${day.isToday 
            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 ring-4 ring-primary-100 dark:ring-primary-900' 
            : isSelected
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/30 dark:text-primary-300'
              : isRedDay 
                ? 'text-national-600 dark:text-national-400' 
                : 'text-surface-700 dark:text-surface-300'}
        `}>
          {day.date.getDate()}
        </span>
      </div>

      <div className="flex-1 w-full flex flex-col pt-1">
        {/* Mobile: Dots */}
        <div className="w-full flex flex-wrap justify-center content-start gap-1 overflow-hidden px-1 md:hidden">
          {day.holidays.map(holiday => (
            <div 
              key={`${holiday.id}-dot`}
              title={holiday.name}
              className={`
                w-1.5 h-1.5 rounded-full shadow-sm
                ${holiday.type === 'national' 
                  ? 'bg-national-500 shadow-national-500/50' 
                  : 'bg-collective-500 shadow-collective-500/50'}
              `}
            />
          ))}
        </div>

        {/* Desktop/Tablet: Text Pills */}
        <div className="hidden md:flex w-full flex-col gap-1 overflow-hidden">
          {day.holidays.map(holiday => (
            <div 
              key={`${holiday.id}-pill`}
              title={holiday.name}
              className={`
                text-[9px] lg:text-[11px] font-semibold leading-none px-1.5 py-1.5 rounded-md lg:rounded-lg truncate shadow-sm transition-transform hover:scale-105
                ${holiday.type === 'national' 
                  ? 'bg-national-500 text-white dark:bg-national-600' 
                  : 'bg-collective-500 text-white dark:bg-collective-600'}
              `}
            >
              {holiday.name}
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
