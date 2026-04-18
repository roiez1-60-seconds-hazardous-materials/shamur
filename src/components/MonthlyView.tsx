'use client';
import { useState, useEffect } from 'react';
import { HEBREW_DAYS, getDaysInMonth, getFirstDayOfMonth, formatDate, today, getMonthName } from '@/lib/dates';
import { getEntry, getEventsForMonth } from '@/lib/store';
import { FAMILY_COLORS } from '@/types';

interface Props {
  year: number;
  month: number;
  onDayClick: (date: string) => void;
  onNavigate: (delta: number) => void;
}

export default function MonthlyView({ year, month, onDayClick, onNavigate }: Props) {
  const [entryDates, setEntryDates] = useState<Set<string>>(new Set());
  const [eventMap, setEventMap] = useState<Map<string, Array<{title:string;color:string}>>>(new Map());
  const todayStr = today();

  useEffect(() => {
    // Events
    const evts = getEventsForMonth(year, month);
    const em = new Map<string, Array<{title:string;color:string}>>();
    evts.forEach(ev => {
      if (!em.has(ev.date)) em.set(ev.date, []);
      em.get(ev.date)!.push({ title: ev.title, color: FAMILY_COLORS[ev.member] });
    });
    setEventMap(em);

    // Entry dots
    const daysInMonth = getDaysInMonth(year, month);
    const dates = new Set<string>();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(new Date(year, month, d));
      const entry = getEntry(dateStr);
      if (entry?.text) dates.add(dateStr);
    }
    setEntryDates(dates);
  }, [year, month]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (string | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(formatDate(new Date(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-shamur-gold/15 flex-shrink-0">
        <button onClick={() => onNavigate(-1)}
          className="w-9 h-9 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted text-xl active:bg-shamur-gold/20">‹</button>
        <div className="text-center">
          <div style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'11px', letterSpacing:'4px', color:'#6B7340', textTransform:'uppercase' }}>{year}</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'26px', color:'#8B2635', letterSpacing:'-1px', lineHeight:1.1 }}>{getMonthName(month)}</div>
        </div>
        <button onClick={() => onNavigate(1)}
          className="w-9 h-9 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted text-xl active:bg-shamur-gold/20">›</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 flex-shrink-0" style={{ background:'#EFE3CF' }}>
        {HEBREW_DAYS.map(d => (
          <div key={d} className="text-center py-1.5" style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'10px', color:'#6B7340', letterSpacing:'1px' }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-7 h-full" style={{ gap:'1px', background:'rgba(139,38,53,0.12)' }}>
          {cells.map((dateStr, i) => {
            if (!dateStr) return <div key={i} style={{ background:'#FAF5EB', opacity:0.3 }} />;

            const isToday = dateStr === todayStr;
            const hasEntry = entryDates.has(dateStr);
            const dayEvents = eventMap.get(dateStr) || [];
            const day = parseInt(dateStr.split('-')[2]);

            return (
              <button
                key={dateStr}
                onClick={() => onDayClick(dateStr)}
                style={{
                  background: isToday ? '#EFE3CF' : '#FAF5EB',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '3px 4px',
                  textAlign: 'right',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  position: 'relative',
                  minHeight: '0',
                }}
              >
                {/* Day number */}
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? '#FAF5EB' : '#1A1410',
                  lineHeight: 1,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isToday ? '#8B2635' : 'transparent',
                  marginBottom: '2px',
                  flexShrink: 0,
                }}>{day}</span>

                {/* Events */}
                <div style={{ display:'flex', flexDirection:'column', gap:'1px', flex:1 }}>
                  {dayEvents.slice(0,2).map((ev, j) => (
                    <div key={j} style={{
                      fontSize: '6.5px',
                      padding: '1px 2px',
                      borderRadius: '2px',
                      background: ev.color,
                      color: '#FAF5EB',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                    }}>{ev.title}</div>
                  ))}
                </div>

                {/* Entry dot */}
                {hasEntry && (
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '3px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#C4541C',
                    opacity: 0.7,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
