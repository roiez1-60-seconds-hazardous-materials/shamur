'use client';
import { useState } from 'react';
import { today, addDays } from '@/lib/dates';
import MonthlyView from '@/components/MonthlyView';
import WeeklyView from '@/components/WeeklyView';
import DailyCanvas from '@/components/DailyCanvas';
import TabBar from '@/components/TabBar';
import type { View } from '@/types';

export default function ShamurApp() {
  const [view, setView] = useState<View>('monthly');
  const [selectedDate, setSelectedDate] = useState(today());
  const [showDaily, setShowDaily] = useState(false);
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowDaily(true);
  };

  const handleMonthNav = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y);
  };

  if (showDaily) {
    return (
      <div className="h-full flex flex-col">
        <DailyCanvas date={selectedDate} onBack={() => setShowDaily(false)} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-shamur-paper border-b border-shamur-gold/10 flex-shrink-0">
        <div className="font-display text-shamur-bg text-xl">שמור</div>
        <div className="font-italic text-shamur-olive text-[10px] tracking-widest">shamur · יומן</div>
      </div>
      <div className="flex-1 overflow-hidden">
        {view === 'monthly' && (
          <MonthlyView year={year} month={month} onDayClick={handleDayClick} onNavigate={handleMonthNav} />
        )}
        {view === 'weekly' && (
          <WeeklyView anchor={selectedDate} onDayClick={handleDayClick} onNavigate={(d) => setSelectedDate(addDays(selectedDate, d))} />
        )}
        {view === 'daily' && (
          <DailyCanvas date={selectedDate} onBack={() => setView('monthly')} />
        )}
      </div>
      <TabBar view={view} onViewChange={setView} onNewEntry={() => { setSelectedDate(today()); setShowDaily(true); }} />
    </div>
  );
}
