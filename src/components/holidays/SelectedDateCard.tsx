import { CalendarDays, Info } from 'lucide-preact';
import type { Holiday } from '../../types';

interface SelectedDateCardProps {
  date: Date;
  holidays: Holiday[];
}

export function SelectedDateCard({ date, holidays }: SelectedDateCardProps) {
  const formattedDate = date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-surface-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-surface-200/50 dark:shadow-black/20 border border-white/20 dark:border-surface-700/50 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-100 dark:bg-primary-500/20 rounded-xl text-primary-600 dark:text-primary-400">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-surface-900 dark:text-white">
          {formattedDate}
        </h3>
      </div>

      {holidays.length === 0 ? (
        <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800/50 p-4 rounded-2xl border border-surface-100 dark:border-surface-700">
          <Info className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Tidak ada libur atau cuti bersama pada tanggal ini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {holidays.map(holiday => (
            <div 
              key={holiday.id} 
              className={`p-4 rounded-2xl border transition-all shadow-md ${
                holiday.type === 'national' 
                  ? 'bg-gradient-to-r from-national-50 to-white border-national-200 dark:from-national-500/20 dark:to-surface-800/80 dark:border-national-500/30' 
                  : 'bg-gradient-to-r from-collective-50 to-white border-collective-200 dark:from-collective-500/20 dark:to-surface-800/80 dark:border-collective-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-base ${
                  holiday.type === 'national' ? 'text-national-700 dark:text-national-300 drop-shadow-sm' : 'text-collective-700 dark:text-collective-300 drop-shadow-sm'
                }`}>
                  {holiday.name}
                </h4>
                <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${
                  holiday.type === 'national' 
                    ? 'bg-national-500 text-white shadow-sm shadow-national-500/30' 
                    : 'bg-collective-500 text-white shadow-sm shadow-collective-500/30'
                }`}>
                  {holiday.type === 'national' ? 'Libur Nasional' : 'Cuti Bersama'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
