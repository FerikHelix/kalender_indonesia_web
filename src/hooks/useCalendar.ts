import { useMemo } from 'preact/hooks';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isToday
} from 'date-fns';
import type { CalendarDay } from '../types';
import { useHolidays } from './useHolidays';

export function useMonthDays(date: Date) {
  const { getHolidaysForDate } = useHolidays();
  
  return useMemo<CalendarDay[]>(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const dateFormat = eachDayOfInterval({
      start: startDate,
      end: endDate
    });

    return dateFormat.map(day => ({
      date: day,
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isToday(day),
      holidays: getHolidaysForDate(day)
    }));
  }, [date.getTime(), getHolidaysForDate]);
}
