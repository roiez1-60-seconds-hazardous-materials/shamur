'use client';
import { useState, useEffect } from 'react';
import { getEntries, getStats } from '@/lib/store';
import { MOOD_LABELS, HEBREW_MONTHS, formatDisplayDate, getDayName } from '@/lib/dates';
import { getStickerById } from '@/lib/stickers';
import type { JournalEntry } from '@/types';

export default function YearBook({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState({ totalEntries: 0, totalWords: 0, totalStickers: 0, moodAvg: 3, streak: 0 });
  const [monthlyData, setMonthlyData] = useState<{ month: number; count: number; avgMood: number }[]>([]);
  const [topStickers, setTopStickers] = useState<{ id: string; count: number }[]>([]);
  const [highlights, setHighlights] = useState<JournalEntry[]>([]);
  const [exporting, setExporting] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const s = getStats();
    setStats(s);
    const entries = Object.values(getEntries()).filter(e => e.date.startsWith(String(year)));

    const byMonth: Record<number, JournalEntry[]> = {};
    entries.forEach(e => {
      const m = Number(e.date.split('-')[1]) - 1;
      if (!byMonth[m]) byMonth[m] = [];
      byMonth[m].push(e);
    });
    setMonthlyData(Array.from({ length: 12 }, (_, i) => {
      const mes = byMonth[i] || [];
      return { month: i, count: mes.filter(e => e.text).length, avgMood: mes.length ? mes.reduce((s, e) => s + (e.mood || 3), 0) / mes.length : 0 };
    }));

    const stickerCount: Record<string, number> = {};
    entries.forEach(e => e.stickers.forEach(ps => { stickerCount[ps.stickerId] = (stickerCount[ps.stickerId] || 0) + 1; }));
    setTopStickers(Object.entries(stickerCount).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([id, count]) => ({ id, count })));

    setHighlights(entries.filter(e => e.text && e.text.length > 50).sort((a, b) => b.text.length - a.text.length).slice(0, 5));
  }, []);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
      const W = 148, H = 210;
      const entries = Object.values(getEntries())
        .filter(e => e.text && e.date.startsWith(String(year)))
        .sort((a, b) => a.date.localeCompare(b.date));

      const addPage = (bg = '#FAF5EB') => {
        doc.setFillColor(bg);
        doc.rect(0, 0, W, H, 'F');
        // Gold top line
        doc.setDrawColor(212, 169, 74);
        doc.setLineWidth(0.5);
        doc.line(10, 3, W - 10, 3);
        doc.line(10, 4, W - 10, 4);
      };

      // COVER PAGE
      doc.setFillColor(139, 38, 53);
      doc.rect(0, 0, W, H, 'F');
      doc.setDrawColor(212, 169, 74);
      doc.setLineWidth(1);
      doc.rect(6, 6, W - 12, H - 12);
      doc.rect(8, 8, W - 16, H - 16);

      doc.setTextColor(212, 169, 74);
      doc.setFontSize(8);
      doc.text('Volume I · First Edition', W / 2, 30, { align: 'center' });

      doc.setTextColor(250, 245, 235);
      doc.setFontSize(32);
      doc.text('שמור', W / 2, 70, { align: 'center' });

      doc.setFontSize(12);
      doc.setTextColor(212, 169, 74);
      doc.text('shamur', W / 2, 82, { align: 'center' });

      doc.setTextColor(250, 245, 235);
      doc.setFontSize(10);
      doc.text('יומן דיגיטלי אישי', W / 2, 110, { align: 'center' });

      doc.setFontSize(24);
      doc.setTextColor(212, 169, 74);
      doc.text(String(year), W / 2, 145, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(250, 245, 235);
      doc.text('שנה של עדי', W / 2, 160, { align: 'center' });

      doc.setFontSize(7);
      doc.setTextColor(212, 169, 74);
      doc.text(`${stats.totalEntries} ערכים · ${stats.totalWords} מילים · ${stats.totalStickers} מדבקות`, W / 2, H - 18, { align: 'center' });

      // STATS PAGE
      doc.addPage();
      addPage('#FAF5EB');
      doc.setTextColor(139, 38, 53);
      doc.setFontSize(16);
      doc.text('השנה שלי במספרים', W / 2, 20, { align: 'center' });

      const statItems = [
        { n: String(stats.totalEntries), l: 'ערכים כתובים' },
        { n: String(stats.totalWords), l: 'מילים' },
        { n: String(stats.totalStickers), l: 'מדבקות' },
        { n: String(stats.streak), l: 'ימים ברצף' },
        { n: (stats.moodAvg).toFixed(1), l: 'ממוצע מצב רוח' },
      ];
      statItems.forEach((s, i) => {
        const x = i % 2 === 0 ? 30 : W - 30;
        const y = 40 + Math.floor(i / 2) * 28;
        doc.setFillColor(245, 237, 224);
        doc.roundedRect(x - 20, y - 8, 40, 22, 3, 3, 'F');
        doc.setTextColor(139, 38, 53);
        doc.setFontSize(14);
        doc.text(s.n, x, y + 4, { align: 'center' });
        doc.setFontSize(7);
        doc.setTextColor(107, 91, 78);
        doc.text(s.l, x, y + 11, { align: 'center' });
      });

      // Bar chart
      const maxCount = Math.max(...monthlyData.map(m => m.count), 1);
      const chartY = 115, chartH = 30;
      doc.setFontSize(6);
      monthlyData.forEach((m, i) => {
        const x = 12 + i * 10.5;
        const barH = Math.max(1, (m.count / maxCount) * chartH);
        doc.setFillColor(m.count > 0 ? 139 : 232, m.count > 0 ? 38 : 220, m.count > 0 ? 53 : 200);
        doc.rect(x, chartY + chartH - barH, 7, barH, 'F');
        doc.setTextColor(107, 91, 78);
        doc.text(HEBREW_MONTHS[m.month].slice(0, 3), x + 3.5, chartY + chartH + 5, { align: 'center' });
      });

      // ENTRIES - one page per day
      entries.slice(0, 60).forEach(entry => {
        doc.addPage();
        addPage();

        const [, em, ed] = entry.date.split('-');
        const monthName = HEBREW_MONTHS[Number(em) - 1];
        const dayName = getDayName(entry.date);

        // Date header
        doc.setFillColor(139, 38, 53);
        doc.rect(0, 0, W, 22, 'F');
        doc.setTextColor(250, 245, 235);
        doc.setFontSize(20);
        doc.text(ed, 12, 15);
        doc.setFontSize(8);
        doc.text(`${dayName} · ${monthName}`, 30, 10);
        doc.setTextColor(212, 169, 74);
        doc.text(String(year), W - 12, 15, { align: 'right' });

        // Mood
        if (entry.mood) {
          doc.setTextColor(139, 38, 53);
          doc.setFontSize(7);
          const moodTexts = ['😢 עצובה', '😕 קצת קשה', '😐 בסדר', '🙂 טוב', '😄 מצוין'];
          doc.text(moodTexts[entry.mood - 1] || '', W - 10, 26, { align: 'right' });
        }

        // Text content
        doc.setTextColor(61, 46, 32);
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(entry.text, W - 20);
        doc.text(lines.slice(0, 18), W - 10, 34, { align: 'right' });

        // Bottom border
        doc.setDrawColor(212, 169, 74);
        doc.setLineWidth(0.3);
        doc.line(10, H - 8, W - 10, H - 8);
        doc.setFontSize(6);
        doc.setTextColor(160, 144, 128);
        doc.text('שמור · יומן דיגיטלי', W / 2, H - 4, { align: 'center' });
      });

      doc.save(`shamur-${year}.pdf`);
    } catch (e) {
      alert('שגיאה ביצירת PDF. נסי שוב.');
    } finally {
      setExporting(false);
    }
  };

  const maxCount = Math.max(...monthlyData.map(m => m.count), 1);

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635' }}>ספר שנתי {year}</div>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-8">
        {/* Book cover */}
        <div className="mx-auto mt-4 w-28 h-40 rounded-lg shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #8B2635, #6B1C28)', border: '2px solid #D4A94A', borderLeft: 'none' }}>
          <div className="absolute inset-1 border border-shamur-gold/30 rounded" />
          <div className="text-shamur-cream/50 text-[7px] tracking-widest mb-1" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Volume I</div>
          <div className="text-shamur-cream" style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>שמור</div>
          <div className="text-shamur-gold text-[10px]" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', letterSpacing: '3px' }}>shamur</div>
          <div className="text-shamur-gold text-lg mt-2" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{year}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {[
            { n: stats.totalEntries, l: 'ערכים כתבתי', e: '✍️' },
            { n: stats.totalWords, l: 'מילים', e: '📝' },
            { n: stats.totalStickers, l: 'מדבקות הוספתי', e: '🌸' },
            { n: stats.streak, l: 'ימים ברצף', e: '🔥' },
          ].map((s, i) => (
            <div key={i} className="bg-shamur-cream rounded-2xl p-3 text-center">
              <div className="text-xl mb-1">{s.e}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#8B2635', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#6B5B4E', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Monthly bar chart */}
        <div className="mt-4">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#8B2635', marginBottom: '8px' }}>פעילות לפי חודש</div>
          <div className="flex items-end gap-1 h-16">
            {monthlyData.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t transition-all"
                  style={{ height: `${Math.max(3, (m.count / maxCount) * 48)}px`, background: m.count > 0 ? 'linear-gradient(180deg,#C4541C,#8B2635)' : '#E8DCC8' }} />
                <span style={{ fontSize: '7px', color: '#A09080', fontFamily: 'var(--font-sans)' }}>{HEBREW_MONTHS[m.month].slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top stickers */}
        {topStickers.length > 0 && (
          <div className="mt-4">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#8B2635', marginBottom: '8px' }}>המדבקות האהובות שלך</div>
            <div className="flex flex-wrap gap-2">
              {topStickers.map(({ id, count }) => {
                const s = getStickerById(id);
                if (!s) return null;
                return (
                  <div key={id} className="flex items-center gap-1.5 bg-shamur-cream rounded-xl px-3 py-2">
                    <div className="w-7 h-7" dangerouslySetInnerHTML={{ __html: s.svg }} />
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
          <div className="mt-4">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: '#8B2635', marginBottom: '8px' }}>רגעים מיוחדים</div>
            {highlights.map(e => (
              <div key={e.id} className="bg-shamur-cream rounded-xl p-3 mb-2.5 border-r-4 border-shamur-rust/40">
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '9px', color: '#6B7340', letterSpacing: '2px', marginBottom: '3px' }}>
                  {formatDisplayDate(e.date)} · {getDayName(e.date)}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '12px', color: '#3D2E20', lineHeight: '1.6' }} dir="rtl">
                  "{e.text.slice(0, 120)}{e.text.length > 120 ? '...' : ''}"
                </div>
                <div className="mt-1">{MOOD_LABELS[(e.mood || 3) - 1]}</div>
              </div>
            ))}
          </div>
        )}

        {/* Export button */}
        <div className="mt-5 p-4 bg-shamur-cream rounded-2xl border border-shamur-gold/25 text-center">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '4px' }}>
            ייצוא לPDF 📥
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#6B5B4E', marginBottom: '12px' }}>
            ספר שנתי מלא — כל ערך על דף נפרד, עיצוב מלא
          </div>
          <button
            onClick={exportPDF}
            disabled={exporting || stats.totalEntries === 0}
            className="px-8 py-3.5 rounded-xl text-shamur-cream text-sm font-sans font-bold transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #C4541C, #8B2635)' }}>
            {exporting ? '⏳ מייצרת PDF...' : `📖 הורידי ספר ${year}`}
          </button>
          {stats.totalEntries === 0 && (
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#A09080', marginTop: '8px' }}>
              כתבי כמה ערכים ביומן כדי לייצר ספר
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
