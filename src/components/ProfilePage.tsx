'use client';
import { useEffect, useState } from 'react';
import { getWordOfWeek, getStats } from '@/lib/store';
import { FAMILY_COLORS, FAMILY_NAMES, type FamilyMember } from '@/types';

const MEMBERS = Object.keys(FAMILY_COLORS) as FamilyMember[];

export default function ProfilePage({ onNavigate, onClose }: {
  onNavigate: (page: string) => void;
  onClose: () => void;
}) {
  const [wotw, setWotw] = useState({ word: 'BLOOM', hebrew: 'לפרוח', week: 1 });
  const [stats, setStats] = useState({ totalEntries: 0, totalWords: 0, totalStickers: 0, moodAvg: 3, streak: 0 });

  useEffect(() => {
    setWotw(getWordOfWeek());
    setStats(getStats());
  }, []);

  const menuItems = [
    { icon: '✦', label: 'מילת השבוע', sub: `${wotw.word} · ${wotw.hebrew}`, page: 'wotw' },
    { icon: '👨‍👩‍👧‍👦', label: 'לוח משפחתי', sub: 'אירועי המשפחה', page: 'family' },
    { icon: '🕰', label: 'זיכרונות', sub: 'ביום הזה · חיפוש', page: 'memories' },
    { icon: '📚', label: 'ספר שנתי', sub: `${stats.totalEntries} ערכים השנה`, page: 'yearbook' },
  ];

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635' }}>אני</div>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Family */}
        <div className="px-4 py-5">
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#6B7340', marginBottom: '14px', textAlign: 'center' }}>
            צוקרמנייה · zuckermania
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {MEMBERS.map(m => (
              <div key={m} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '20px', background: `linear-gradient(135deg, ${FAMILY_COLORS[m]}, ${FAMILY_COLORS[m]}99)`, border: '2.5px solid #FAF5EB' }}>
                  {FAMILY_NAMES[m][0]}
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#6B5B4E' }}>{FAMILY_NAMES[m]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex gap-0 mx-4 mb-4 rounded-2xl overflow-hidden border border-shamur-gold/20">
          {[
            { n: stats.totalEntries, l: 'ערכים' },
            { n: stats.totalWords, l: 'מילים' },
            { n: stats.streak, l: 'ברצף' },
          ].map((s, i) => (
            <div key={i} className={`flex-1 text-center py-3 ${i < 2 ? 'border-l border-shamur-gold/20' : ''}`}
              style={{ background: i === 0 ? '#F5EDE0' : '#FAF5EB' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#8B2635', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#6B5B4E', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Word of week card */}
        <div className="mx-4 mb-4 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #8B2635, #6B1C28)', padding: '20px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '9px', letterSpacing: '5px', color: 'rgba(212,169,74,0.85)', textTransform: 'uppercase' }}>מילת השבוע</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', color: '#FAF5EB', letterSpacing: '-2px', lineHeight: 1.1 }}>{wotw.word}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'rgba(250,245,235,0.65)' }}>{wotw.hebrew}</div>
          <button onClick={() => onNavigate('wotw')}
            className="mt-3 px-4 py-1.5 rounded-full text-xs font-sans font-semibold"
            style={{ background: 'rgba(212,169,74,0.2)', color: '#D4A94A', border: '1px solid rgba(212,169,74,0.35)' }}>
            שני מילה חדשה ←
          </button>
        </div>

        {/* Menu */}
        <div className="mx-4 space-y-2 pb-8">
          {menuItems.map(item => (
            <button key={item.page} onClick={() => onNavigate(item.page)}
              className="w-full flex items-center gap-4 bg-shamur-cream rounded-2xl px-4 py-4 hover:bg-shamur-gold/10 transition-colors">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1 text-right" dir="rtl">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#8B2635' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#6B5B4E', marginTop: '1px' }}>{item.sub}</div>
              </div>
              <span className="text-shamur-muted text-sm">›</span>
            </button>
          ))}

          <div className="mt-4 text-center py-4 border-t border-shamur-gold/20">
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '24px', color: '#8B2635' }}>שמור</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: '#A09080', letterSpacing: '2px', marginTop: '2px' }}>
              יומן דיגיטלי · 2026 · כל הנתונים שמורים אצלך בלבד ♡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
