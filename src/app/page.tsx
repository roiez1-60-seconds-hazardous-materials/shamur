'use client';
import { useState, useEffect } from 'react';
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
import InstallBanner from '@/components/InstallBanner';
import Onboarding from '@/components/Onboarding';
import GlobalSearch from '@/components/GlobalSearch';
import SettingsPage from '@/components/SettingsPage';
import type { View } from '@/types';

type Page = 'main'|'daily'|'wotw'|'memories'|'family'|'profile'|'yearbook'|'settings';

export default function ShamurApp() {
  const [view, setView] = useState<View>('monthly');
  const [page, setPage] = useState<Page>('main');
  const [selectedDate, setSelectedDate] = useState(today());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [showSearch, setShowSearch] = useState(false);
  const [onboarded, setOnboarded] = useState(true);

  useEffect(() => {
    // Check if first time
    const done = localStorage.getItem('shamur:onboarded');
    if (!done) setOnboarded(false);
  }, []);

  const handleDayClick = (date: string) => { setSelectedDate(date); setPage('daily'); };
  const handleMonthNav = (delta: number) => {
    let m = month + delta, y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m); setYear(y);
  };
  const nav = (p: Page) => setPage(p);
  const back = () => setPage('main');

  // First time onboarding
  if (!onboarded) return <Onboarding onDone={() => setOnboarded(true)} />;

  // Full-page views
  if (page === 'daily')    return <div className="h-full"><DailyCanvas date={selectedDate} onBack={back} /></div>;
  if (page === 'wotw')     return <div className="h-full"><WordOfWeekPage onClose={back} /></div>;
  if (page === 'memories') return <div className="h-full"><MemoriesPage onDayClick={(d)=>{ setSelectedDate(d); nav('daily'); }} onClose={back} /></div>;
  if (page === 'family')   return <div className="h-full"><FamilyCalendar onClose={back} /></div>;
  if (page === 'yearbook') return <div className="h-full"><YearBook onClose={back} /></div>;
  if (page === 'settings') return <div className="h-full"><SettingsPage onClose={back} /></div>;
  if (page === 'profile')  return (
    <div className="h-full">
      <ProfilePage
        onNavigate={(p) => {
          if (p === 'settings') nav('settings');
          else nav(p as Page);
        }}
        onClose={back}
      />
    </div>
  );

  return (
    <div className="h-full flex flex-col relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-shamur-paper border-b border-shamur-gold/15 flex-shrink-0">
        <div style={{ fontFamily:'var(--font-display)', fontSize:'22px', color:'#8B2635' }}>שמור</div>
        <div className="flex items-center gap-3">
          {/* Search button */}
          <button onClick={() => setShowSearch(true)}
            className="w-8 h-8 rounded-full bg-shamur-cream flex items-center justify-center hover:bg-shamur-gold/20 transition-colors">
            <span className="text-base">🔍</span>
          </button>
          <div style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'10px', letterSpacing:'4px', color:'#6B7340' }}>shamur · יומן</div>
        </div>
      </div>

      {/* Main view */}
      <div className="flex-1 overflow-hidden">
        {view === 'monthly' && (
          <MonthlyView year={year} month={month} onDayClick={handleDayClick} onNavigate={handleMonthNav} />
        )}
        {view === 'weekly' && (
          <WeeklyView anchor={selectedDate} onDayClick={handleDayClick} onNavigate={(d) => setSelectedDate(addDays(selectedDate, d))} />
        )}
      </div>

      {/* Tab bar */}
      <TabBar
        view={view}
        onViewChange={setView}
        onNewEntry={() => { setSelectedDate(today()); setPage('daily'); }}
        onProfile={() => nav('profile')}
        onToday={() => { setSelectedDate(today()); setPage('daily'); }}
      />

      {/* Install banner */}
      <InstallBanner />

      {/* Global search overlay */}
      {showSearch && (
        <GlobalSearch
          onDayClick={(d) => { setSelectedDate(d); setPage('daily'); }}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
