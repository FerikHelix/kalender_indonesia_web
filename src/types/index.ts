export type HolidayType = 'national' | 'collective';

export interface Holiday {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  name: string;
  type: HolidayType;
  description?: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  holidays: Holiday[];
}
