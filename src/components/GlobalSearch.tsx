'use client';
import { useState, useEffect, useRef } from 'react';
import { getEntries, getEvents } from '@/lib/store';
import { formatDisplayDate, getDayName } from '@/lib/dates';
import { getStickerById } from '@/lib/stickers';
import { FAMILY_COLORS, FAMILY_NAMES } from '@/types';

interface Props {
  onDayClick: (date: string) => void;
  onClose: () => void;
}

export default function GlobalSearch({ onDayClick, onClose }: Props) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Array<{ type: 'entry'|'event'; date: string; title: string; preview?: string; color?: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q;
    const found: typeof results = [];

    // Search entries
    Object.values(getEntries()).forEach(e => {
      if (!e.text) return;
      if (e.text.includes(lower) || e.date.includes(lower)) {
        const idx = e.text.indexOf(lower);
        const preview = idx >= 0 ? '...' + e.text.slice(Math.max(0, idx-20), idx+60) + '...' : e.text.slice(0,80);
        found.push({ type:'entry', date:e.date, title:`${formatDisplayDate(e.date)} · ${getDayName(e.date)}`, preview });
      }
    });

    // Search events
    getEvents().forEach(ev => {
      if (ev.title.includes(lower) || FAMILY_NAMES[ev.member].includes(lower)) {
        found.push({ type:'event', date:ev.date, title:ev.title, preview:`${formatDisplayDate(ev.date)} · ${FAMILY_NAMES[ev.member]}`, color:FAMILY_COLORS[ev.member] });
      }
    });

    found.sort((a,b) => b.date.localeCompare(a.date));
    setResults(found.slice(0, 25));
  }, [q]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background:'rgba(26,20,16,0.85)', backdropFilter:'blur(12px)' }}>
      {/* Search bar */}
      <div className="px-4 pt-14 pb-3 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-shamur-paper rounded-2xl px-4 py-3 shadow-lg">
          <span className="text-shamur-muted text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="חפשי כל מה שכתבת..."
            className="flex-1 bg-transparent text-right text-base font-sans text-shamur-ink placeholder:text-shamur-muted/50 outline-none"
            dir="rtl"
          />
          {q && <button onClick={() => setQ('')} className="text-shamur-muted text-sm">✕</button>}
        </div>
        <button onClick={onClose} className="text-shamur-cream font-sans text-sm px-3 py-2 rounded-xl bg-white/10">ביטול</button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">
        {!q && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <div style={{ fontFamily:'var(--font-cardo)', fontStyle:'italic', fontSize:'15px', color:'rgba(250,245,235,0.6)' }}>
              חפשי בכל הכתיבה, האירועים והמדבקות שלך
            </div>
          </div>
        )}

        {q && results.length === 0 && (
          <div className="text-center py-12">
            <div style={{ fontFamily:'var(--font-sans)', fontSize:'14px', color:'rgba(250,245,235,0.5)' }}>לא נמצאו תוצאות עבור "{q}"</div>
          </div>
        )}

        <div className="space-y-2">
          {results.map((r, i) => (
            <button key={i} onClick={() => { onDayClick(r.date); onClose(); }}
              className="w-full text-right bg-shamur-paper/95 rounded-2xl p-4 hover:bg-shamur-cream transition-colors">
              <div className="flex items-start gap-3">
                {r.color && <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background:r.color }} />}
                <div className="flex-1" dir="rtl">
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'14px', color:'#8B2635' }}>{r.title}</div>
                  {r.preview && (
                    <div style={{ fontFamily:'var(--font-sans)', fontStyle:'italic', fontSize:'12px', color:'#6B5B4E', marginTop:'3px', lineHeight:'1.5' }}>
                      {r.preview}
                    </div>
                  )}
                </div>
                <span style={{ fontFamily:'var(--font-sans)', fontSize:'10px', color:'#A09080', flexShrink:0 }}>
                  {r.type === 'entry' ? '✍️' : '📅'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
