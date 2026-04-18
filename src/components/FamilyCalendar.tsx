'use client';
import { useState, useEffect } from 'react';
import { getEvents, saveEvent, deleteEvent } from '@/lib/store';
import { formatDisplayDate, getDayName, today, HEBREW_MONTHS } from '@/lib/dates';
import { FAMILY_COLORS, FAMILY_NAMES, type CalendarEvent, type FamilyMember } from '@/types';

const MEMBERS = Object.keys(FAMILY_COLORS) as FamilyMember[];

export default function FamilyCalendar({ onClose }: { onClose: () => void }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [form, setForm] = useState({ title: '', date: today(), member: 'adi' as FamilyMember, time: '' });

  useEffect(() => {
    setEvents(getEvents().sort((a, b) => a.date.localeCompare(b.date)));
  }, []);

  const handleSave = () => {
    if (!form.title || !form.date) return;
    const ev: CalendarEvent = {
      id: editEvent?.id || `ev-${Date.now()}`,
      title: form.title,
      date: form.date,
      member: form.member,
      time: form.time || undefined,
    };
    saveEvent(ev);
    setEvents(getEvents().sort((a, b) => a.date.localeCompare(b.date)));
    setShowAdd(false);
    setEditEvent(null);
    setForm({ title: '', date: today(), member: 'adi', time: '' });
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    setEvents(getEvents().sort((a, b) => a.date.localeCompare(b.date)));
  };

  const handleEdit = (ev: CalendarEvent) => {
    setEditEvent(ev);
    setForm({ title: ev.title, date: ev.date, member: ev.member, time: ev.time || '' });
    setShowAdd(true);
  };

  // Group by month
  const grouped: Record<string, CalendarEvent[]> = {};
  events.forEach(ev => {
    const [y, m] = ev.date.split('-');
    const key = `${y}-${m}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  });

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div className="font-display text-shamur-bg text-lg">לוח משפחתי</div>
        <button onClick={() => { setShowAdd(true); setEditEvent(null); setForm({ title: '', date: today(), member: 'adi', time: '' }); }}
          className="w-8 h-8 rounded-full bg-shamur-bg text-shamur-cream flex items-center justify-center text-lg">+</button>
      </div>

      {/* Family member legend */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide flex-shrink-0 border-b border-shamur-gold/10">
        {MEMBERS.map(m => (
          <div key={m} className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ background: FAMILY_COLORS[m] }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#6B5B4E' }}>{FAMILY_NAMES[m]}</span>
          </div>
        ))}
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6">
        {Object.keys(grouped).sort().map(key => {
          const [y, m] = key.split('-');
          return (
            <div key={key} className="mt-4">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '8px' }}>
                {HEBREW_MONTHS[Number(m) - 1]} {y}
              </div>
              {grouped[key].map(ev => (
                <div key={ev.id}
                  className="flex items-center gap-3 bg-shamur-cream rounded-xl px-3 py-3 mb-2"
                  style={{ borderRight: `4px solid ${FAMILY_COLORS[ev.member]}` }}>
                  <div className="flex-1 text-right" dir="rtl">
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#1A1410' }}>{ev.title}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#6B5B4E', marginTop: '2px' }}>
                      {formatDisplayDate(ev.date)} · {getDayName(ev.date)}
                      {ev.time && ` · ${ev.time}`}
                      {' · '}{FAMILY_NAMES[ev.member]}
                    </div>
                  </div>
                  <button onClick={() => handleEdit(ev)} className="text-shamur-muted/50 text-xs p-1">✏️</button>
                  <button onClick={() => handleDelete(ev.id)} className="text-shamur-muted/50 text-xs p-1">🗑</button>
                </div>
              ))}
            </div>
          );
        })}
        {events.length === 0 && (
          <div className="text-center py-16 text-shamur-muted font-sans italic text-sm">
            אין אירועים עדיין.<br />לחצי + להוסיף
          </div>
        )}
      </div>

      {/* Add/Edit sheet */}
      {showAdd && (
        <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end">
          <div className="bg-shamur-paper rounded-t-3xl p-6">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#8B2635', marginBottom: '16px', textAlign: 'right' }}>
              {editEvent ? 'ערוך אירוע' : 'הוסיפי אירוע'}
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="שם האירוע..."
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="bg-shamur-cream rounded-xl px-4 py-3 text-sm font-sans text-shamur-ink outline-none border border-shamur-gold/20 text-right"
                dir="rtl"
              />

              <div className="flex gap-2">
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  className="flex-1 bg-shamur-cream rounded-xl px-3 py-2.5 text-sm font-sans outline-none border border-shamur-gold/20" />
                <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                  className="w-28 bg-shamur-cream rounded-xl px-3 py-2.5 text-sm font-sans outline-none border border-shamur-gold/20" />
              </div>

              {/* Member selector */}
              <div className="flex gap-2 flex-wrap">
                {MEMBERS.map(m => (
                  <button key={m} onClick={() => setForm(p => ({ ...p, member: m }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all ${form.member === m ? 'text-white' : 'bg-shamur-cream text-shamur-muted'}`}
                    style={form.member === m ? { background: FAMILY_COLORS[m] } : {}}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: FAMILY_COLORS[m] }} />
                    {FAMILY_NAMES[m]}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mt-1">
                <button onClick={() => { setShowAdd(false); setEditEvent(null); }}
                  className="flex-1 py-3 rounded-xl border border-shamur-gold/30 text-shamur-muted text-sm font-sans">
                  ביטול
                </button>
                <button onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-shamur-bg text-shamur-cream text-sm font-sans font-semibold">
                  {editEvent ? 'שמור' : 'הוסיפי'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
