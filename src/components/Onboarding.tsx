'use client';
import { useState } from 'react';

const SLIDES = [
  {
    emoji: '✦',
    title: 'שמור',
    subtitle: 'shamur',
    desc: 'יומן דיגיטלי שמור את הרגעים שלך — בכתיבה, בתמונות, במדבקות.',
    bg: 'linear-gradient(135deg, #8B2635 0%, #6B1C28 100%)',
    accent: '#D4A94A',
  },
  {
    emoji: '🌸',
    title: 'מדבקות',
    subtitle: '80+ מדבקות בחינם',
    desc: 'קשטי כל ערך עם מדבקות SVG יפהפיות — פרחים, מצב רוח, עונות, ווינטג׳ ועוד.',
    bg: 'linear-gradient(135deg, #C4541C 0%, #8B2635 100%)',
    accent: '#F4C2C2',
  },
  {
    emoji: '✦',
    title: 'AI Stylist',
    subtitle: 'מנתחת את הטקסט שלך',
    desc: 'כתבי מה שעל הלב — שמור תציע מדבקות, פלטת צבעים וציטוט שמתאימים בדיוק לרגש.',
    bg: 'linear-gradient(135deg, #6B7340 0%, #4A5230 100%)',
    accent: '#D4A94A',
  },
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'צוקרמנייה',
    subtitle: 'לוח משפחתי',
    desc: 'עדי, רועי, מאיה, עמית, נועם ורומי — צבע לכל אחד, לוח אחד לכולם.',
    bg: 'linear-gradient(135deg, #2C3E50 0%, #1E2A38 100%)',
    accent: '#E88DA8',
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  const next = () => {
    if (isLast) {
      localStorage.setItem('shamur:onboarded', '1');
      onDone();
    } else {
      setSlide(s => s + 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between py-16 px-8 transition-all duration-500"
      style={{ background: current.bg }}>

      {/* Skip */}
      <button onClick={() => { localStorage.setItem('shamur:onboarded','1'); onDone(); }}
        style={{ fontFamily:'var(--font-sans)', fontSize:'13px', color:'rgba(250,245,235,0.5)', alignSelf:'flex-end' }}>
        דלגי ›
      </button>

      {/* Content */}
      <div className="flex flex-col items-center text-center gap-6">
        <div style={{ fontSize: slide === 0 ? '80px' : '72px', fontFamily: slide === 0 ? 'var(--font-display)' : undefined, color: current.accent, lineHeight:1 }}>
          {current.emoji}
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'42px', color:'#FAF5EB', letterSpacing:'-2px', lineHeight:1 }}>
            {current.title}
          </div>
          <div style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'14px', color: current.accent, letterSpacing:'4px', marginTop:'6px' }}>
            {current.subtitle}
          </div>
        </div>
        <p style={{ fontFamily:'var(--font-sans)', fontSize:'16px', color:'rgba(250,245,235,0.85)', lineHeight:'1.7', maxWidth:'280px' }} dir="rtl">
          {current.desc}
        </p>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{ width: i === slide ? '20px' : '6px', height:'6px', background: i === slide ? current.accent : 'rgba(250,245,235,0.3)' }} />
          ))}
        </div>

        <button onClick={next}
          className="w-full py-4 rounded-2xl font-sans font-bold text-base transition-all active:scale-95"
          style={{ background: current.accent, color: '#1A1410', maxWidth: '280px' }}>
          {isLast ? 'בואי נתחיל ✦' : 'הבאה ›'}
        </button>
      </div>
    </div>
  );
}
