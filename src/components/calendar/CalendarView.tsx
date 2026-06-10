import { CalendarHeader } from './CalendarHeader';
import { DayCell } from './DayCell';
import { useEffect, useRef, useMemo } from 'preact/hooks';
import { useMonthDays } from '../../hooks/useCalendar';

interface CalendarViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

function CalendarGrid({ monthDate, selectedDate, onSelectDate }: { monthDate: Date, selectedDate: Date, onSelectDate: (d: Date) => void }) {
  const days = useMonthDays(monthDate);
  
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
      {days.map((day, idx) => (
        <DayCell 
          key={`${monthDate.toISOString()}-${idx}`} 
          day={day} 
          isSelected={selectedDate.toDateString() === day.date.toDateString()}
          onClick={() => onSelectDate(day.date)}
        />
      ))}
    </div>
  );
}

export function CalendarView({ selectedDate, onSelectDate, currentMonth, onMonthChange }: CalendarViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number | null>(null);

  // Preload all months from 2024 to 2028
  const allMonths = useMemo(() => {
    const months = [];
    for (let y = 2024; y <= 2028; y++) {
      for (let m = 0; m < 12; m++) {
        months.push(new Date(y, m, 1));
      }
    }
    return months;
  }, []);

  // When currentMonth changes (via buttons, "Hari Ini", or clicking a holiday list item), scroll to it
  useEffect(() => {
    const index = allMonths.findIndex(m => m.getFullYear() === currentMonth.getFullYear() && m.getMonth() === currentMonth.getMonth());
    if (index !== -1 && scrollRef.current) {
      const targetLeft = index * scrollRef.current.clientWidth;
      // Only scroll programmatically if the container isn't already there
      if (Math.abs(scrollRef.current.scrollLeft - targetLeft) > 5) {
        scrollRef.current.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentMonth, allMonths]);

  // Initial jump to the current month without smooth scrolling on mount
  useEffect(() => {
    const index = allMonths.findIndex(m => m.getFullYear() === currentMonth.getFullYear() && m.getMonth() === currentMonth.getMonth());
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = index * scrollRef.current.clientWidth;
      // Re-enable smooth behavior for subsequent actions
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth';
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array so it runs only on mount

  const handleNextMonthButton = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    if (next.getFullYear() > 2028) return; // Prevent going beyond preloaded months
    onMonthChange(next);
  };

  const handlePrevMonthButton = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    if (prev.getFullYear() < 2024) return;
    onMonthChange(prev);
  };

  const handleToday = () => {
    const today = new Date();
    onMonthChange(today);
    onSelectDate(today);
  };

  // Sync the currentMonth state when the user physically swipes the container
  const onScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = window.setTimeout(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      
      const newMonth = allMonths[index];
      if (newMonth && (newMonth.getFullYear() !== currentMonth.getFullYear() || newMonth.getMonth() !== currentMonth.getMonth())) {
        onMonthChange(newMonth);
      }
    }, 100);
  };

  const weekDays = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div className="bg-white dark:bg-surface-800/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-xl shadow-surface-200/50 dark:shadow-black/20 border border-white/20 dark:border-surface-700/50 overflow-hidden flex flex-col">
      <CalendarHeader 
        currentDate={currentMonth} 
        onNextMonth={handleNextMonthButton} 
        onPrevMonth={handlePrevMonthButton} 
        onToday={handleToday}
      />
      
      <div className="mt-4 flex-1 flex flex-col min-h-0">
        {/* Fixed Days Header */}
        <div className="grid grid-cols-7 mb-2 gap-1 sm:gap-2">
          {weekDays.map(day => (
            <DayCell key={day} day={null as any} isHeader label={day} />
          ))}
        </div>
        
        {/* Swipable Grids Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          onScroll={onScroll}
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {allMonths.map((month, idx) => (
            <div key={`month-${idx}`} className="w-full shrink-0 snap-center">
              <CalendarGrid monthDate={month} selectedDate={selectedDate} onSelectDate={onSelectDate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
