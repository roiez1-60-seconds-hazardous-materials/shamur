'use client';
import { useEffect, useState } from 'react';
import { getWeekDays, formatDisplayDate, getDayName, today, addDays } from '@/lib/dates';
import { getEventsForDate, getEntry } from '@/lib/store';
import { FAMILY_COLORS, FAMILY_NAMES, type CalendarEvent } from '@/types';

interface Props {
  anchor: string;
  onDayClick: (date: string) => void;
  onNavigate: (delta: number) => void;
}

export default function WeeklyView({ anchor, onDayClick, onNavigate }: Props) {
  const [weekData, setWeekData] = useState<Array<{
    date: string;
    events: CalendarEvent[];
    hasEntry: boolean;
  }>>([]);

  const todayStr = today();
  const days = getWeekDays(anchor);

  useEffect(() => {
    const data = days.map(date => {
      const events = getEventsForDate(date);
      const entry = getEntry(date);
      return {
        date,
        events,
        hasEntry: !!(entry && (entry.text || entry.stickers.length > 0)),
      };
    });
    setWeekData(data);
  }, [anchor]);

  const weekLabel = () => {
    const start = days[0];
    const end = days[6];
    const [sy, sm, sd] = start.split('-').map(Number);
    const [, em, ed] = end.split('-').map(Number);
    if (sm === em) return `${sd}–${ed} ב${['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'][sm-1]} ${sy}`;
    return `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20">
        <button onClick={() => onNavigate(-7)} className="w-8 h-8 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted hover:bg-shamur-gold/20">‹</button>
        <div className="text-center">
          <div className="font-italic text-shamur-olive text-xs tracking-widest">{weekLabel()}</div>
          <div className="font-script text-shamur-rust text-xl mt-0.5">השבוע</div>
        </div>
        <button onClick={() => onNavigate(7)} className="w-8 h-8 rounded-full bg-shamur-cream flex items-center justify-center text-shamur-muted hover:bg-shamur-gold/20">›</button>
      </div>

      {/* Days strip */}
      <div className="grid grid-cols-7 border-b border-shamur-gold/15 bg-shamur-cream">
        {days.map(date => {
          const day = parseInt(date.split('-')[2]);
          const isToday = date === todayStr;
          const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
          const dow = new Date(date).getDay();
          return (
            <button
              key={date}
              onClick={() => onDayClick(date)}
              className="flex flex-col items-center py-2 hover:bg-shamur-gold/10 transition-colors"
            >
              <span className="text-[9px] font-serif italic text-shamur-olive">{dayNames[dow]}</span>
              <span className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-sm font-sans font-semibold
                ${isToday ? 'bg-shamur-bg text-shamur-cream' : 'text-shamur-ink'}`}>
                {day}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
        {weekData.map(({ date, events, hasEntry }) => {
          const day = parseInt(date.split('-')[2]);
          const isToday = date === todayStr;
          const dow = new Date(date).getDay();
          const isWeekend = dow === 5 || dow === 6;

          if (events.length === 0 && !hasEntry && date > today() && !isToday) return null;

          return (
            <button
              key={date}
              onClick={() => onDayClick(date)}
              className={`
                w-full text-right mb-2.5 rounded-xl p-3 relative
                border transition-all hover:shadow-sm
                ${isToday ? 'border-shamur-gold bg-shamur-cream-warm' : isWeekend ? 'border-shamur-rust/10 bg-shamur-cream/60' : 'border-transparent bg-shamur-cream/80'}
              `}
            >
              {/* Day number — positioned top left for RTL */}
              <div className="absolute top-3 left-3 text-center">
                <div className={`text-2xl leading-none font-display
                  ${isToday ? 'text-shamur-bg' : 'text-shamur-rust'}`}>
                  {day}
                </div>
                <div className="text-[8px] font-serif italic text-shamur-olive tracking-wider mt-0.5">
                  {getDayName(date)}
                </div>
              </div>

              <div className="pr-2 pl-10">
                {events.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {events.map(ev => (
                      <div key={ev.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: FAMILY_COLORS[ev.member] }} />
                        <span className="text-[13px] font-sans font-medium text-shamur-ink">{ev.title}</span>
                        {ev.time && (
                          <span className="text-[11px] font-sans text-shamur-muted mr-auto">{ev.time}</span>
                        )}
                        <span className="text-[10px] font-sans text-shamur-muted opacity-70">{FAMILY_NAMES[ev.member]}</span>
                      </div>
                    ))}
                  </div>
                ) : isToday ? (
                  <span className="text-[12px] font-sans italic text-shamur-muted">לחצי להוסיף ערך ✿</span>
                ) : (
                  <span className="text-[12px] font-sans text-shamur-muted opacity-50">יום פנוי</span>
                )}

                {hasEntry && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-shamur-rust opacity-50" />
                    <span className="text-[10px] font-sans italic text-shamur-rust opacity-60">יש ערך יומן</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
