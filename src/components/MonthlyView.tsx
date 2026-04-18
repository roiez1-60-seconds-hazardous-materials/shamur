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
  const [events, setEvents] = useState<Array<{ date: string; color: string; title: string }>>([]);
  const todayStr = today();

  useEffect(() => {
    const entries = getEventsForMonth(year, month);
    setEvents(entries.map(e => ({ date: e.date, color: FAMILY_COLORS[e.member], title: e.title })));

    // Check which days have entries
    const daysInMonth = getDaysInMonth(year, month);
    const dates = new Set<string>();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(new Date(year, month, d));
      const entry = getEntry(dateStr);
      if (entry && (entry.text || entry.stickers.length > 0)) {
        dates.add(dateStr);
      }
    }
    setEntryDates(dates);
  }, [year, month]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (string | null)[] = [];

  // Pad start
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(formatDate(new Date(year, month, d)));
  }
  // Pad end to 42 cells
  while (cells.length < 42) cells.push(null);

  const monthEvents = new Map<string, typeof events>();
  events.forEach(ev => {
    if (!monthEvents.has(ev.date)) monthEvents.set(ev.date, []);
    monthEvents.get(ev.date)!.push(ev);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20">
        <button
          onClick={() => onNavigate(-1)}
          className="w-8 h-8 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted hover:bg-shamur-gold/20 transition-colors"
        >
          ‹
        </button>
        <div className="text-center">
          <div className="font-script text-shamur-rust text-xs tracking-widest uppercase opacity-70">
            {year}
          </div>
          <div className="font-display text-shamur-bg text-2xl leading-tight">
            {getMonthName(month)}
          </div>
        </div>
        <button
          onClick={() => onNavigate(1)}
          className="w-8 h-8 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted hover:bg-shamur-gold/20 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 bg-shamur-cream-warm border-b border-shamur-gold/15">
        {HEBREW_DAYS.map(d => (
          <div key={d} className="text-center py-1.5 font-serif italic text-[10px] text-shamur-olive tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 gap-px bg-shamur-bg/30">
        {cells.map((dateStr, i) => {
          if (!dateStr) {
            return <div key={i} className="bg-shamur-paper opacity-30" />;
          }

          const isToday = dateStr === todayStr;
          const hasEntry = entryDates.has(dateStr);
          const dayEvents = monthEvents.get(dateStr) || [];
          const day = parseInt(dateStr.split('-')[2]);

          return (
            <button
              key={dateStr}
              onClick={() => onDayClick(dateStr)}
              className={`
                relative bg-shamur-paper flex flex-col p-1 min-h-[52px] text-right
                hover:bg-shamur-cream-warm transition-colors group
                ${isToday ? 'bg-shamur-cream-warm' : ''}
              `}
            >
              <span className={`
                text-[11px] font-sans font-medium leading-none mb-1
                ${isToday ? 'text-shamur-bg font-bold' : 'text-shamur-ink'}
              `}>
                {isToday ? (
                  <span className="w-5 h-5 rounded-full bg-shamur-bg text-shamur-cream inline-flex items-center justify-center text-[10px] font-bold">
                    {day}
                  </span>
                ) : day}
              </span>

              {/* Event dots */}
              <div className="flex flex-wrap gap-[2px] mt-auto">
                {dayEvents.slice(0, 3).map((ev, j) => (
                  <div
                    key={j}
                    className="text-[6px] leading-[1.3] px-0.5 rounded text-white font-sans truncate max-w-full"
                    style={{ background: ev.color }}
                  >
                    {ev.title.length > 6 ? ev.title.slice(0, 6) + '…' : ev.title}
                  </div>
                ))}
              </div>

              {/* Entry indicator */}
              {hasEntry && (
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-shamur-rust opacity-60" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
