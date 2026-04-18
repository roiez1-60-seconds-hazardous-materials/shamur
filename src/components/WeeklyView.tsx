'use client';
import { useEffect, useState } from 'react';
import { getWeekDays, formatDisplayDate, getDayName, today, HEBREW_MONTHS } from '@/lib/dates';
import { getEventsForDate, getEntry } from '@/lib/store';
import { FAMILY_COLORS, FAMILY_NAMES, type CalendarEvent } from '@/types';

interface Props {
  anchor: string;
  onDayClick: (date: string) => void;
  onNavigate: (delta: number) => void;
}

export default function WeeklyView({ anchor, onDayClick, onNavigate }: Props) {
  const [weekData, setWeekData] = useState<Array<{ date: string; events: CalendarEvent[]; hasEntry: boolean }>>([]);
  const todayStr = today();
  const days = getWeekDays(anchor);

  useEffect(() => {
    setWeekData(days.map(date => ({
      date,
      events: getEventsForDate(date),
      hasEntry: !!getEntry(date)?.text,
    })));
  }, [anchor]);

  const [sy, sm] = days[0].split('-').map(Number);
  const [, em] = days[6].split('-').map(Number);
  const monthLabel = sm === em
    ? `${HEBREW_MONTHS[sm-1]} ${sy}`
    : `${HEBREW_MONTHS[sm-1]} – ${HEBREW_MONTHS[em-1]} ${sy}`;

  const dayNames = ['א׳','ב׳','ג׳','ד׳','ה׳','ו׳','ש׳'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={() => onNavigate(-7)}
          className="w-9 h-9 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted text-lg hover:bg-shamur-gold/20 transition-colors active:scale-95">‹</button>
        <div className="text-center">
          <div style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'10px', letterSpacing:'4px', color:'#6B7340', textTransform:'uppercase' }}>{monthLabel}</div>
          <div style={{ fontFamily:'var(--font-script)', fontSize:'20px', color:'#C4541C', marginTop:'1px' }}>השבוע</div>
        </div>
        <button onClick={() => onNavigate(7)}
          className="w-9 h-9 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted text-lg hover:bg-shamur-gold/20 transition-colors active:scale-95">›</button>
      </div>

      {/* Day strip */}
      <div className="grid grid-cols-7 border-b border-shamur-gold/10 bg-shamur-cream/60 flex-shrink-0">
        {days.map(date => {
          const d = parseInt(date.split('-')[2]);
          const dow = new Date(date).getDay();
          const isToday = date === todayStr;
          const hasEntry = weekData.find(w => w.date === date)?.hasEntry;
          return (
            <button key={date} onClick={() => onDayClick(date)}
              className="flex flex-col items-center py-2 gap-0.5 hover:bg-shamur-gold/10 transition-colors">
              <span style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'9px', color:'#6B7340' }}>{dayNames[dow]}</span>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-sans font-semibold transition-colors
                ${isToday ? 'text-shamur-cream' : 'text-shamur-ink'}`}
                style={isToday ? { background:'#8B2635' } : {}}>
                {d}
              </span>
              {hasEntry && <div className="w-1 h-1 rounded-full bg-shamur-rust opacity-70" />}
            </button>
          );
        })}
      </div>

      {/* Events list — all 7 days */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-2.5">
        {weekData.map(({ date, events, hasEntry }) => {
          const d = parseInt(date.split('-')[2]);
          const dow = new Date(date).getDay();
          const isToday = date === todayStr;
          const isPast = date < todayStr;
          const isWeekend = dow === 5 || dow === 6;

          return (
            <button key={date} onClick={() => onDayClick(date)}
              className={`w-full text-right rounded-2xl p-3.5 relative transition-all active:scale-98 border
                ${isToday ? 'border-shamur-gold/40 shadow-md' : 'border-transparent'}
                ${isWeekend ? 'bg-shamur-cream-warm/80' : 'bg-shamur-cream/90'}
                ${isPast && !hasEntry && !isToday ? 'opacity-50' : ''}
              `}>

              {/* Day indicator */}
              <div className="absolute top-3.5 left-4 text-center">
                <div style={{ fontFamily:'var(--font-display)', fontSize:'26px', color: isToday ? '#8B2635' : '#C4541C', lineHeight:1 }}>{d}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:'9px', color:'#6B7340', marginTop:'1px' }}>{getDayName(date)}</div>
              </div>

              {/* Content */}
              <div className="pl-14">
                {events.length > 0 ? (
                  <div className="space-y-1.5">
                    {events.map(ev => (
                      <div key={ev.id} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: FAMILY_COLORS[ev.member] }} />
                        <span style={{ fontFamily:'var(--font-sans)', fontWeight:500, fontSize:'13px', color:'#1A1410', flex:1, textAlign:'right' }}>{ev.title}</span>
                        {ev.time && <span style={{ fontFamily:'var(--font-sans)', fontSize:'11px', color:'#6B5B4E' }}>{ev.time}</span>}
                      </div>
                    ))}
                  </div>
                ) : isToday ? (
                  <span style={{ fontFamily:'var(--font-cardo)', fontStyle:'italic', fontSize:'13px', color:'#6B5B4E' }}>
                    לחצי לכתוב ביומן היום ✿
                  </span>
                ) : (
                  <span style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'#A09080' }}>
                    {isPast ? (hasEntry ? 'יש ערך ביומן ✦' : 'יום ללא ערך') : 'יום פנוי'}
                  </span>
                )}

                {hasEntry && events.length > 0 && (
                  <div style={{ fontFamily:'var(--font-sans)', fontSize:'10px', color:'#C4541C', marginTop:'4px', opacity:0.7 }}>✦ יש ערך ביומן</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
