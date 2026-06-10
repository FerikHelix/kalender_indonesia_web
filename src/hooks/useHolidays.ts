import { useMemo, useState } from 'preact/hooks';
import { holidays } from '../data/holidays';
import { isAfter, isSameDay, parseISO, startOfDay } from 'date-fns';

export function useHolidays() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'national' | 'collective'>('all');

  const today = startOfDay(new Date());

  const upcomingHolidays = useMemo(() => {
    return holidays.filter(h => {
      const holidayDate = parseISO(h.date);
      return isAfter(holidayDate, today) || isSameDay(holidayDate, today);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [today]);

  const nextHoliday = upcomingHolidays[0] || null;

  const currentYear = today.getFullYear();

  const remainingHolidaysThisYear = useMemo(() => {
    return upcomingHolidays.filter(h => parseISO(h.date).getFullYear() === currentYear);
  }, [upcomingHolidays, currentYear]);

  const filteredHolidays = useMemo(() => {
    return upcomingHolidays.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || h.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType, upcomingHolidays]);

  const getHolidaysForDate = (date: Date) => {
    return holidays.filter(h => isSameDay(parseISO(h.date), date));
  };

  return {
    holidays: filteredHolidays,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    nextHoliday,
    remainingHolidaysThisYear,
    getHolidaysForDate
  };
}
