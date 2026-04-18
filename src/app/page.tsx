'use client';
import { useState } from 'react';
import { today, addDays } from '@/lib/dates';
import MonthlyView from '@/components/MonthlyView';
import WeeklyView from '@/components/WeeklyView';
import DailyCanvas from '@/components/DailyCanvas';
import TabBar from '@/components/TabBar';
import WordOfWeekPage from '@/components/WordOfWeek';
import MemoriesPage from '@/components/Memories';
import FamilyCalendar from '@/components/FamilyCalendar';
import ProfilePage from '@/components/ProfilePage';
import YearBook from '@/components/YearBook';
import type { View } from '@/types';

type Page = 'main' | 'daily' | 'wotw' | 'memories' | 'family' | 'profile' | 'yearbook';

export default function ShamurApp() {
  const [view, setView] = useState<View>('monthly');
  const [page, setPage] = useState<Page>('main');
  const [selectedDate, setSelectedDate] = useState(today());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());

  const handleDayClick = (date: string) => { setSelectedDate(date); setPage('daily'); };
  const handleMonthNav = (delta: number) => {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y);
  };

  const nav = (p: Page) => setPage(p);
  const back = () => setPage('main');

  if (page === 'daily')    return <div className="h-full"><DailyCanvas date={selectedDate} onBack={back} /></div>;
  if (page === 'wotw')     return <div className="h-full"><WordOfWeekPage onClose={back} /></div>;
  if (page === 'memories') return <div className="h-full"><MemoriesPage onDayClick={(d)=>{setSelectedDate(d);nav('daily');}} onClose={back} /></div>;
  if (page === 'family')   return <div className="h-full"><FamilyCalendar onClose={back} /></div>;
  if (page === 'yearbook') return <div className="h-full"><YearBook onClose={back} /></div>;
  if (page === 'profile')  return <div className="h-full"><ProfilePage onNavigate={(p)=>nav(p as Page)} onClose={back} /></div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 bg-shamur-paper border-b border-shamur-gold/15 flex-shrink-0">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#8B2635' }}>שמור</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '10px', letterSpacing: '4px', color: '#6B7340' }}>shamur · יומן</div>
      </div>
      <div className="flex-1 overflow-hidden">
        {view === 'monthly' && <MonthlyView year={year} month={month} onDayClick={handleDayClick} onNavigate={handleMonthNav} />}
        {view === 'weekly'  && <WeeklyView anchor={selectedDate} onDayClick={handleDayClick} onNavigate={(d)=>setSelectedDate(addDays(selectedDate, d))} />}
      </div>
      <TabBar view={view} onViewChange={setView} onNewEntry={()=>{setSelectedDate(today());setPage('daily');}} onProfile={()=>nav('profile')} />
    </div>
  );
}
