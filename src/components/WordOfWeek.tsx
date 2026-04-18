'use client';
import { useState, useEffect } from 'react';
import { getWordOfWeek, saveWordOfWeek } from '@/lib/store';

const WORDS = [
  { word: 'BLOOM', hebrew: 'לפרוח', desc: 'השבוע של הפריחה — לצמוח, להאיר, להיות.' },
  { word: 'GROW', hebrew: 'לצמוח', desc: 'לא חייבים להיות מושלמים. רק לצמוח קצת כל יום.' },
  { word: 'BRAVE', hebrew: 'אמיצה', desc: 'אומץ זה לא העדר פחד — זה לעשות למרות הפחד.' },
  { word: 'DREAM', hebrew: 'לחלום', desc: 'תני לעצמך להרגיש את החלומות כאמיתיים.' },
  { word: 'REST', hebrew: 'לנוח', desc: 'מנוחה היא לא בזבוז זמן — היא השקעה.' },
  { word: 'SHINE', hebrew: 'לזהור', desc: 'האור שלך לא מכבה אחרים — הוא מאיר אותם.' },
  { word: 'HEAL', hebrew: 'להחלים', desc: 'ריפוי הוא לא קו ישר. לפעמים צועדים אחורה.' },
  { word: 'LOVE', hebrew: 'לאהוב', desc: 'קודם כל — לאהוב את עצמך.' },
  { word: 'CREATE', hebrew: 'ליצור', desc: 'כל ביטוי יצירתי הוא מתנה לעולם.' },
  { word: 'TRUST', hebrew: 'לבטוח', desc: 'בטחי בתהליך. גם מה שלא נראה עובד — עובד.' },
  { word: 'WILD', hebrew: 'פרועה', desc: 'הפראיות שלך היא כוח, לא חולשה.' },
  { word: 'STILL', hebrew: 'דממה', desc: 'בדממה שומעים את מה שחשוב באמת.' },
];

const INTENTIONS_TEMPLATES = [
  'לצאת החוצה פעם ביום',
  'להתקשר לאמא / חברה',
  'שעה של קריאה לבד',
  'תודה אחת ביום',
  'לא לבדוק טלפון לפני 8 בבוקר',
  'ארוחת ערב בלי מסכים',
  'לעשות יוגה / מדיטציה',
  'לשתות 8 כוסות מים',
  'לישון לפני 23:00',
  'לנשום עמוק כשמרגישה לחץ',
];

export default function WordOfWeekPage({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(getWordOfWeek());
  const [editing, setEditing] = useState(false);
  const [customWord, setCustomWord] = useState('');
  const [customHebrew, setCustomHebrew] = useState('');
  const [intentions, setIntentions] = useState<string[]>([]);
  const [newIntent, setNewIntent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('shamur:intentions');
    if (saved) setIntentions(JSON.parse(saved));
  }, []);

  const saveIntentions = (list: string[]) => {
    setIntentions(list);
    localStorage.setItem('shamur:intentions', JSON.stringify(list));
  };

  const selectWord = (w: typeof WORDS[0]) => {
    saveWordOfWeek(w.word, w.hebrew);
    setCurrent({ word: w.word, hebrew: w.hebrew, week: current.week });
  };

  const saveCustom = () => {
    if (!customWord) return;
    saveWordOfWeek(customWord.toUpperCase(), customHebrew);
    setCurrent({ word: customWord.toUpperCase(), hebrew: customHebrew, week: current.week });
    setEditing(false);
  };

  const addIntention = (text: string) => {
    if (!text.trim() || intentions.includes(text.trim())) return;
    saveIntentions([...intentions, text.trim()]);
    setNewIntent('');
  };

  const removeIntention = (i: number) => {
    saveIntentions(intentions.filter((_, j) => j !== i));
  };

  return (
    <div className="flex flex-col h-full bg-shamur-paper overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div className="font-display text-shamur-bg text-lg">מילת השבוע</div>
        <div className="font-italic text-shamur-olive text-[10px] tracking-widest">word of the week</div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero word */}
        <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.12), transparent 70%), #FAF5EB', border: '1px solid rgba(212,169,74,0.3)', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', letterSpacing: '6px', textTransform: 'uppercase', color: '#6B7340', marginBottom: '12px' }}>
            שבוע {current.week} מתוך 52
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 18vw, 100px)', lineHeight: '0.9', color: '#8B2635', letterSpacing: '-3px', position: 'relative', display: 'inline-block' }}>
            {current.word}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#6B7340', marginTop: '10px', letterSpacing: '-1px' }}>
            {current.hebrew}
          </div>
          <div style={{ fontFamily: 'var(--font-cardo)', fontStyle: 'italic', fontSize: '15px', color: '#6B5B4E', marginTop: '14px', lineHeight: '1.6', maxWidth: '280px', margin: '14px auto 0' }}>
            {WORDS.find(w => w.word === current.word)?.desc || 'המילה שלך לשבוע הזה.'}
          </div>
        </div>

        {/* Intentions */}
        <div className="mx-4 mt-5">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '12px' }}>
            כוונות לשבוע ✿
          </div>
          <div className="flex flex-col gap-2">
            {intentions.map((intent, i) => (
              <div key={i} className="flex items-center gap-2 bg-shamur-cream rounded-xl px-3 py-2.5">
                <span style={{ color: '#D4A94A', fontSize: '14px' }}>✦</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#3D2E20', flex: 1 }} dir="rtl">{intent}</span>
                <button onClick={() => removeIntention(i)} className="text-shamur-muted/50 text-xs">✕</button>
              </div>
            ))}
          </div>

          {/* Add intention */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="הוסיפי כוונה..."
              value={newIntent}
              onChange={e => setNewIntent(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addIntention(newIntent)}
              className="flex-1 bg-shamur-cream rounded-xl px-3 py-2 text-sm font-sans text-shamur-ink placeholder:text-shamur-muted/50 outline-none border border-shamur-gold/20"
              dir="rtl"
            />
            <button
              onClick={() => addIntention(newIntent)}
              className="px-3 py-2 bg-shamur-bg text-shamur-cream rounded-xl text-sm font-sans"
            >+</button>
          </div>

          {/* Quick intentions */}
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#6B5B4E', marginTop: '10px', marginBottom: '6px' }}>רעיונות מהירים:</div>
          <div className="flex flex-wrap gap-1.5">
            {INTENTIONS_TEMPLATES.filter(t => !intentions.includes(t)).slice(0, 6).map((t, i) => (
              <button
                key={i}
                onClick={() => addIntention(t)}
                className="px-2.5 py-1 bg-shamur-cream-warm rounded-full text-[11px] font-sans text-shamur-muted hover:bg-shamur-gold/20"
                dir="rtl"
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Change word */}
        <div className="mx-4 mt-5 mb-4">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#8B2635', marginBottom: '10px' }}>
            בחרי מילה אחרת
          </div>
          <div className="grid grid-cols-3 gap-2">
            {WORDS.map(w => (
              <button
                key={w.word}
                onClick={() => selectWord(w)}
                className={`rounded-xl py-3 px-2 text-center transition-all ${current.word === w.word ? 'bg-shamur-bg text-shamur-cream' : 'bg-shamur-cream hover:bg-shamur-gold/20'}`}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: current.word === w.word ? '#FAF5EB' : '#8B2635' }}>{w.word}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: current.word === w.word ? 'rgba(250,245,235,0.8)' : '#6B5B4E' }}>{w.hebrew}</div>
              </button>
            ))}
          </div>

          {/* Custom word */}
          {!editing ? (
            <button onClick={() => setEditing(true)} className="w-full mt-3 py-2.5 rounded-xl border border-dashed border-shamur-gold/40 text-shamur-muted text-sm font-sans">
              + מילה אישית משלי
            </button>
          ) : (
            <div className="mt-3 flex gap-2">
              <input placeholder="WORD" value={customWord} onChange={e => setCustomWord(e.target.value)}
                className="flex-1 bg-shamur-cream rounded-xl px-3 py-2 text-sm outline-none border border-shamur-gold/20 uppercase" />
              <input placeholder="מילה" value={customHebrew} onChange={e => setCustomHebrew(e.target.value)}
                className="flex-1 bg-shamur-cream rounded-xl px-3 py-2 text-sm outline-none border border-shamur-gold/20" dir="rtl" />
              <button onClick={saveCustom} className="px-3 py-2 bg-shamur-bg text-shamur-cream rounded-xl text-sm">✓</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
