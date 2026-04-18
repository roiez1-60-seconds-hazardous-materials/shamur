'use client';
import { useState, useEffect } from 'react';
import { getEntries } from '@/lib/store';
import { formatDisplayDate, getDayName, MOOD_LABELS } from '@/lib/dates';
import { getStickerById } from '@/lib/stickers';
import type { JournalEntry } from '@/types';

interface Memory {
  entry: JournalEntry;
  yearsAgo: number;
}

export default function MemoriesPage({ onDayClick, onClose }: { onDayClick: (date: string) => void; onClose: () => void }) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<JournalEntry[]>([]);
  const [mode, setMode] = useState<'today' | 'search'>('today');

  useEffect(() => {
    loadTodayMemories();
  }, []);

  const loadTodayMemories = () => {
    const entries = getEntries();
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentYear = today.getFullYear();

    const found: Memory[] = [];
    Object.values(entries).forEach(entry => {
      const [ey, em, ed] = entry.date.split('-');
      if (em === mm && ed === dd && Number(ey) < currentYear) {
        if (entry.text || entry.stickers.length > 0) {
          found.push({ entry, yearsAgo: currentYear - Number(ey) });
        }
      }
    });
    found.sort((a, b) => b.yearsAgo - a.yearsAgo);
    setMemories(found);
  };

  const doSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const entries = Object.values(getEntries());
    const results = entries.filter(e =>
      e.text?.includes(q) ||
      e.stickers.some(s => getStickerById(s.stickerId)?.nameHe.includes(q))
    ).sort((a, b) => b.date.localeCompare(a.date));
    setSearchResults(results.slice(0, 20));
  };

  const yearsText = (n: number) => {
    if (n === 1) return 'לפני שנה';
    if (n === 2) return 'לפני שנתיים';
    return `לפני ${n} שנים`;
  };

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div className="font-display text-shamur-bg text-lg">זיכרונות</div>
        <div className="font-italic text-shamur-olive text-[10px] tracking-widest">memories</div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-2 bg-shamur-cream rounded-2xl px-3 py-2 border border-shamur-gold/20">
          <span className="text-shamur-muted text-sm">🔍</span>
          <input
            type="text"
            placeholder='חפשי בכל הזיכרונות — "ים", "רומי", "שבת"...'
            value={searchQuery}
            onChange={e => { doSearch(e.target.value); setMode(e.target.value ? 'search' : 'today'); }}
            className="flex-1 bg-transparent text-right text-sm font-sans text-shamur-ink placeholder:text-shamur-muted/50 outline-none"
            dir="rtl"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setSearchResults([]); setMode('today'); }} className="text-shamur-muted text-xs">✕</button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 px-4 pb-2 flex-shrink-0">
        <button onClick={() => setMode('today')} className={`text-sm font-sans px-3 py-1 rounded-full ${mode === 'today' ? 'bg-shamur-bg text-shamur-cream' : 'text-shamur-muted'}`}>
          ביום הזה
        </button>
        <button onClick={() => setMode('search')} className={`text-sm font-sans px-3 py-1 rounded-full ${mode === 'search' ? 'bg-shamur-bg text-shamur-cream' : 'text-shamur-muted'}`}>
          כל הערכים
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6">
        {mode === 'today' && (
          <>
            {memories.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🌸</div>
                <div style={{ fontFamily: 'var(--font-cardo)', fontStyle: 'italic', fontSize: '15px', color: '#6B5B4E', lineHeight: '1.6' }}>
                  עדיין אין זיכרונות ליום הזה.<br />
                  ככל שתכתבי יותר — כך יצטברו זיכרונות יפים.
                </div>
              </div>
            ) : (
              memories.map(({ entry, yearsAgo }) => (
                <MemoryCard key={entry.id} entry={entry} label={yearsText(yearsAgo)} onClick={() => onDayClick(entry.date)} />
              ))
            )}
          </>
        )}

        {mode === 'search' && (
          <>
            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-10 text-shamur-muted font-sans italic text-sm">לא נמצאו תוצאות</div>
            )}
            {(searchQuery ? searchResults : Object.values(getEntries()).filter(e => e.text).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30))
              .map(entry => (
                <MemoryCard key={entry.id} entry={entry} label={formatDisplayDate(entry.date)} onClick={() => onDayClick(entry.date)} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}

function MemoryCard({ entry, label, onClick }: { entry: JournalEntry; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-right bg-shamur-paper rounded-2xl p-4 mb-3 border border-shamur-gold/15 shadow-sm hover:shadow-md transition-shadow relative"
    >
      {/* Washi tape decoration */}
      <div className="absolute -top-1.5 right-8 w-14 h-3 rounded-sm opacity-70"
        style={{ background: 'repeating-linear-gradient(90deg, #8B2635 0 3px, #FAF5EB 3px 6px)' }} />

      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B7340', marginBottom: '4px', marginTop: '4px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#8B2635', letterSpacing: '-0.5px', marginBottom: '8px' }}>
        {formatDisplayDate(entry.date)} · {getDayName(entry.date)}
      </div>

      {/* Stickers preview */}
      {entry.stickers.length > 0 && (
        <div className="flex gap-1.5 mb-2">
          {entry.stickers.slice(0, 5).map(ps => {
            const s = getStickerById(ps.stickerId);
            if (!s) return null;
            return (
              <div key={ps.id} className="w-8 h-8 bg-shamur-cream rounded-lg p-1"
                dangerouslySetInnerHTML={{ __html: s.svg }} />
            );
          })}
        </div>
      )}

      {/* Text preview */}
      {entry.text && (
        <div style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '13px', color: '#6B5B4E', lineHeight: '1.6', borderRight: '2px solid #C4541C', paddingRight: '10px' }} dir="rtl">
          "{entry.text.slice(0, 120)}{entry.text.length > 120 ? '...' : ''}"
        </div>
      )}

      {/* Mood */}
      {entry.mood && (
        <div className="mt-2 text-lg">{MOOD_LABELS[entry.mood - 1]}</div>
      )}
    </button>
  );
}
