import { useEffect, useState } from 'preact/hooks';
import { differenceInDays, parseISO } from 'date-fns';
import { Timer } from 'lucide-preact';
import type { Holiday } from '../../types';

interface CountdownCardProps {
  nextHoliday: Holiday | null;
}

export function CountdownCard({ nextHoliday }: CountdownCardProps) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (nextHoliday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const holidayDate = parseISO(nextHoliday.date);
      setDaysLeft(differenceInDays(holidayDate, today));
    }
  }, [nextHoliday]);

  if (!nextHoliday || daysLeft === null) return null;

  return (
    <div className="group relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-primary-500/20 transition-all hover:shadow-primary-500/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-indigo-800"></div>
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
      
      {/* Decorative Icon Background */}
      <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
        <Timer className="w-48 h-48" />
      </div>
      
      <div className="relative z-10 text-white">
        <div className="flex items-center gap-2 text-primary-100 font-medium mb-2 tracking-wide text-sm uppercase">
          <Timer className="w-4 h-4" />
          <span>Libur Berikutnya</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-6xl sm:text-7xl font-black tracking-tighter drop-shadow-sm">{daysLeft}</span>
          <span className="text-primary-100 font-medium text-lg sm:text-xl">hari lagi</span>
        </div>
        
        <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <h4 className="text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">{nextHoliday.name}</h4>
          <p className="text-primary-100 mt-1.5 text-sm font-medium">
            {new Date(nextHoliday.date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <div className="mt-3 flex">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase border backdrop-blur-sm
              ${nextHoliday.type === 'national' 
                ? 'bg-national-500/20 border-national-500/30 text-national-100' 
                : 'bg-collective-500/20 border-collective-500/30 text-collective-100'}`
            }>
              {nextHoliday.type === 'national' ? 'Libur Nasional' : 'Cuti Bersama'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
