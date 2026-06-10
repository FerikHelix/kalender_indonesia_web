import { Search } from 'lucide-preact';
import type { Holiday } from '../../types';

interface HolidayListProps {
  holidays: Holiday[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: 'all' | 'national' | 'collective';
  setFilterType: (f: 'all' | 'national' | 'collective') => void;
  onSelectHoliday?: (date: string) => void;
}

export function HolidayList({ holidays, searchQuery, setSearchQuery, filterType, setFilterType, onSelectHoliday }: HolidayListProps) {
  return (
    <div className="bg-white dark:bg-surface-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-surface-200/50 dark:shadow-black/20 border border-white/20 dark:border-surface-700/50 flex flex-col h-[500px]">
      <h3 className="font-bold text-surface-800 dark:text-surface-100 mb-5">Daftar Libur</h3>
      
      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input 
          type="text" 
          placeholder="Cari libur..."
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          className="w-full pl-11 pr-4 py-2.5 bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:text-surface-200 transition-all placeholder:text-surface-400"
        />
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
        {(['all', 'national', 'collective'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === type 
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30' 
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700'
            }`}
          >
            {type === 'all' ? 'Semua' : type === 'national' ? 'Nasional' : 'Cuti Bersama'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {holidays.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center text-surface-400 text-sm">
            Tidak ada libur yang ditemukan.
          </div>
        ) : (
          holidays.map(holiday => (
            <button 
              key={holiday.id} 
              onClick={() => onSelectHoliday?.(holiday.date)}
              className="w-full text-left group p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/30 border border-surface-100 dark:border-surface-800 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-white dark:hover:bg-surface-800/80 transition-all hover:shadow-md dark:hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-surface-800 dark:text-surface-200">
                  {new Date(holiday.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${
                  holiday.type === 'national' 
                    ? 'bg-national-100 text-national-700 dark:bg-national-500/20 dark:text-national-400' 
                    : 'bg-collective-100 text-collective-700 dark:bg-collective-500/20 dark:text-collective-400'
                }`}>
                  {holiday.type === 'national' ? 'Nasional' : 'Cuti'}
                </span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-snug group-hover:text-surface-900 dark:group-hover:text-surface-200 transition-colors">
                {holiday.name}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
