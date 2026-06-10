import { PieChart, CalendarDays } from 'lucide-preact';
import type { Holiday } from '../../types';

interface HolidayStatsProps {
  remainingHolidays: Holiday[];
}

export function HolidayStats({ remainingHolidays }: HolidayStatsProps) {
  const national = remainingHolidays.filter(h => h.type === 'national').length;
  const collective = remainingHolidays.filter(h => h.type === 'collective').length;
  const total = remainingHolidays.length;

  return (
    <div className="bg-white dark:bg-surface-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-surface-200/50 dark:shadow-black/20 border border-white/20 dark:border-surface-700/50">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-primary-500" />
        <h3 className="font-bold text-surface-800 dark:text-surface-100">Sisa Libur Tahun Ini</h3>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-4xl font-black text-surface-900 dark:text-white drop-shadow-sm">{total}</span>
          <span className="text-sm font-medium text-surface-500 dark:text-surface-400 ml-2">hari libur</span>
        </div>
        <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl ring-1 ring-primary-500/20">
          <CalendarDays className="w-7 h-7 text-primary-600 dark:text-primary-400" />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-surface-600 dark:text-surface-300">Libur Nasional</span>
            <span className="text-surface-900 dark:text-white">{national}</span>
          </div>
          <div className="w-full bg-surface-100 dark:bg-surface-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-national-400 to-national-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${total ? (national / total) * 100 : 0}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-surface-600 dark:text-surface-300">Cuti Bersama</span>
            <span className="text-surface-900 dark:text-white">{collective}</span>
          </div>
          <div className="w-full bg-surface-100 dark:bg-surface-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-collective-400 to-collective-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${total ? (collective / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
