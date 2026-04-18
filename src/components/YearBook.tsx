'use client';
import { useState, useEffect } from 'react';
import { getEntries, getStats } from '@/lib/store';
import { MOOD_LABELS, HEBREW_MONTHS } from '@/lib/dates';
import { getStickerById } from '@/lib/stickers';
import type { JournalEntry } from '@/types';

export default function YearBook({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState({ totalEntries: 0, totalWords: 0, totalStickers: 0, moodAvg: 3, streak: 0 });
  const [monthlyData, setMonthlyData] = useState<{ month: number; count: number; avgMood: number }[]>([]);
  const [topStickers, setTopStickers] = useState<{ id: string; count: number }[]>([]);
  const [highlights, setHighlights] = useState<JournalEntry[]>([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const s = getStats();
    setStats(s);

    const entries = Object.values(getEntries()).filter(e => e.date.startsWith(String(year)));

    // Monthly stats
    const byMonth: Record<number, JournalEntry[]> = {};
    entries.forEach(e => {
      const m = Number(e.date.split('-')[1]) - 1;
      if (!byMonth[m]) byMonth[m] = [];
      byMonth[m].push(e);
    });
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const mes = byMonth[i] || [];
      return {
        month: i,
        count: mes.filter(e => e.text).length,
        avgMood: mes.length ? mes.reduce((s, e) => s + (e.mood || 3), 0) / mes.length : 0,
      };
    });
    setMonthlyData(monthly);

    // Top stickers
    const stickerCount: Record<string, number> = {};
    entries.forEach(e => e.stickers.forEach(ps => {
      stickerCount[ps.stickerId] = (stickerCount[ps.stickerId] || 0) + 1;
    }));
    const sorted = Object.entries(stickerCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
    setTopStickers(sorted.map(([id, count]) => ({ id, count })));

    // Highlights (longest entries)
    const hi = entries.filter(e => e.text && e.text.length > 50)
      .sort((a, b) => b.text.length - a.text.length).slice(0, 3);
    setHighlights(hi);
  }, []);

  const maxCount = Math.max(...monthlyData.map(m => m.count), 1);

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div className="font-display text-shamur-bg text-lg">ספר שנתי {year}</div>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">
        {/* Book cover mini */}
        <div className="mx-auto mt-4 w-32 h-44 rounded-lg shadow-2xl flex flex-col items-center justify-center text-center"
          style={{ background: 'linear-gradient(135deg, #8B2635, #6B1C28)', border: '2px solid #D4A94A', borderLeft: 'none' }}>
          <div className="text-shamur-cream/60 text-[8px] tracking-widest mb-1">Volume I</div>
          <div className="text-shamur-cream font-display text-3xl">שמור</div>
          <div className="text-shamur-gold font-italic text-sm mt-1">shamur</div>
          <div className="text-shamur-gold text-xl mt-3">{year}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { n: stats.totalEntries, l: 'ערכים כתובתי', icon: '✍️' },
            { n: stats.totalWords, l: 'מילים', icon: '📝' },
            { n: stats.totalStickers, l: 'מדבקות הוספתי', icon: '🌸' },
            { n: stats.streak, l: 'ימים ברצף', icon: '🔥' },
          ].map((s, i) => (
            <div key={i} className="bg-shamur-cream rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#8B2635', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#6B5B4E', marginTop: '3px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Monthly activity bar chart */}
        <div className="mt-5">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '10px' }}>
            פעילות לפי חודש
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {monthlyData.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${Math.max(4, (m.count / maxCount) * 60)}px`,
                    background: m.count > 0
                      ? `linear-gradient(180deg, #C4541C, #8B2635)`
                      : '#E8DCC8',
                  }} />
                <span style={{ fontSize: '8px', color: '#A09080', fontFamily: 'var(--font-sans)' }}>
                  {HEBREW_MONTHS[m.month].slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top stickers */}
        {topStickers.length > 0 && (
          <div className="mt-5">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '10px' }}>
              המדבקות האהובות שלך
            </div>
            <div className="flex flex-wrap gap-2">
              {topStickers.map(({ id, count }) => {
                const s = getStickerById(id);
                if (!s) return null;
                return (
                  <div key={id} className="flex items-center gap-1.5 bg-shamur-cream rounded-xl px-3 py-2">
                    <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: s.svg }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#3D2E20' }}>{s.nameHe}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: '#A09080' }}>{count}×</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mt-5">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '10px' }}>
              רגעים מיוחדים
            </div>
            {highlights.map(e => (
              <div key={e.id} className="bg-shamur-cream rounded-xl p-4 mb-3 border-r-4 border-shamur-rust/40">
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '10px', color: '#6B7340', letterSpacing: '2px', marginBottom: '4px' }}>
                  {e.date}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '13px', color: '#3D2E20', lineHeight: '1.6' }} dir="rtl">
                  "{e.text.slice(0, 100)}..."
                </div>
                <div className="mt-1 text-base">{MOOD_LABELS[(e.mood || 3) - 1]}</div>
              </div>
            ))}
          </div>
        )}

        {/* Export */}
        <div className="mt-5 p-4 bg-shamur-cream rounded-2xl border border-shamur-gold/20 text-center">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#8B2635', marginBottom: '6px' }}>
            ייצוא ל-PDF
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#6B5B4E', marginBottom: '12px' }}>
            הורידי את הספר השנתי שלך כ-PDF מוכן להדפסה
          </div>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl text-shamur-cream text-sm font-sans font-semibold"
            style={{ background: 'linear-gradient(135deg, #C4541C, #8B2635)' }}>
            📥 הורידי PDF
          </button>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#A09080', marginTop: '8px' }}>
            פיצ׳ר מלא בקרוב · עכשיו זמין דרך הדפסת הדפדפן
          </div>
        </div>
      </div>
    </div>
  );
}
