import { useState } from 'preact/hooks';
import { AppLayout } from './components/layout/AppLayout';
import { CalendarView } from './components/calendar/CalendarView';
import { CountdownCard } from './components/holidays/CountdownCard';
import { HolidayStats } from './components/holidays/HolidayStats';
import { HolidayList } from './components/holidays/HolidayList';
import { SelectedDateCard } from './components/holidays/SelectedDateCard';
import { useHolidays } from './hooks/useHolidays';
import { parseISO } from 'date-fns';

export function App() {
  const { 
    holidays, 
    searchQuery, 
    setSearchQuery, 
    filterType, 
    setFilterType,
    nextHoliday,
    remainingHolidaysThisYear,
    getHolidaysForDate
  } = useHolidays();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // To allow CalendarView to set month when a holiday is clicked
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const handleSelectHolidayFromList = (dateString: string) => {
    const date = parseISO(dateString);
    setSelectedDate(date);
    setCalendarMonth(date);
    // Scroll to top to see calendar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <CalendarView 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate}
            currentMonth={calendarMonth}
            onMonthChange={setCalendarMonth}
          />
          <SelectedDateCard 
            date={selectedDate} 
            holidays={getHolidaysForDate(selectedDate)} 
          />
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <CountdownCard nextHoliday={nextHoliday} />
          <HolidayStats remainingHolidays={remainingHolidaysThisYear} />
          <HolidayList 
            holidays={holidays}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
            onSelectHoliday={handleSelectHolidayFromList}
          />
        </div>
      </div>
    </AppLayout>
  );
}
