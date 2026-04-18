'use client';
import { useState } from 'react';
import { STICKERS } from '@/lib/stickers';
import type { Sticker } from '@/types';

interface AISuggestion {
  stickers: string[];
  palette: string[];
  quote: string;
  mood: string;
  intent: string;
}

interface Props {
  entryText: string;
  onSelectSticker: (sticker: Sticker) => void;
  onClose: () => void;
}

export default function AIStylist({ entryText, onSelectSticker, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [error, setError] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const analyze = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setSuggestion(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSuggestion(data);
    } catch (e: unknown) {
      setError('לא הצלחתי לנתח. נסי שוב.');
    } finally {
      setLoading(false);
    }
  };

  const suggestedStickers = suggestion?.stickers
    .map(id => STICKERS.find(s => s.id === id))
    .filter(Boolean) as Sticker[] ?? [];

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div className="text-center">
          <div className="font-display text-shamur-bg text-lg">✦ שמור מציעה</div>
          <div className="font-italic text-shamur-olive text-[9px] tracking-widest">AI Stylist · Powered by Claude</div>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
        {/* Entry text preview */}
        {entryText ? (
          <div className="relative bg-shamur-cream rounded-xl p-4 mb-4 border border-shamur-gold/20">
            <div className="absolute -top-2.5 right-3 bg-shamur-paper px-2 text-[9px] font-sans tracking-widest text-shamur-olive">הטקסט שלך</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '13px', color: '#1A1410', lineHeight: '1.6' }} dir="rtl">
              {entryText.slice(0, 200)}{entryText.length > 200 ? '...' : ''}
            </p>
          </div>
        ) : (
          <div className="bg-shamur-cream rounded-xl p-4 mb-4 text-center">
            <div className="text-shamur-muted text-sm font-sans italic">כתבי משהו ביומן כדי שאוכל לנתח ולהציע מדבקות מתאימות</div>
          </div>
        )}

        {/* Custom prompt */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="או ספרי לי איך את מרגישה היום..."
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && analyze(customPrompt || entryText)}
            className="flex-1 bg-shamur-cream rounded-xl px-3 py-2.5 text-sm font-sans text-shamur-ink placeholder:text-shamur-muted/50 outline-none border border-shamur-gold/20 text-right"
            dir="rtl"
          />
        </div>

        {/* Analyze button */}
        {!suggestion && !loading && (
          <button
            onClick={() => analyze(customPrompt || entryText)}
            disabled={!entryText && !customPrompt}
            className="w-full py-4 rounded-2xl text-shamur-cream font-sans font-semibold text-base transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #C4541C, #8B2635)' }}
          >
            ✦ ניתחי את הטקסט שלי
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 animate-pulse">✦</div>
            <div style={{ fontFamily: 'var(--font-cardo)', fontStyle: 'italic', fontSize: '15px', color: '#6B5B4E' }}>
              שמור חושבת...
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-4 text-shamur-rust text-sm font-sans">{error}</div>
        )}

        {/* Suggestions */}
        {suggestion && (
          <div className="space-y-4">
            {/* Mood badge */}
            <div className="flex items-center gap-3 bg-shamur-cream-warm rounded-xl px-4 py-3">
              <div className="text-2xl">{suggestion.mood}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#8B2635' }}>המצב שלך עכשיו</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#6B5B4E' }}>{suggestion.intent}</div>
              </div>
            </div>

            {/* Suggested stickers */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#8B2635', marginBottom: '8px' }}>
                מדבקות שמתאימות לך עכשיו ✦
              </div>
              <div className="grid grid-cols-4 gap-2">
                {suggestedStickers.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { onSelectSticker(s); }}
                    className="aspect-square bg-shamur-cream rounded-xl p-2 hover:bg-shamur-gold/20 hover:scale-105 transition-all active:scale-95"
                    title={s.nameHe}
                  >
                    <div dangerouslySetInnerHTML={{ __html: s.svg }} className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            {suggestion.palette.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#8B2635', marginBottom: '8px' }}>
                  פלטת הצבעים שלך
                </div>
                <div className="flex gap-2">
                  {suggestion.palette.map((color, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      style={{ background: color }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quote */}
            {suggestion.quote && (
              <div className="bg-shamur-cream rounded-xl p-4 border-r-4 border-shamur-rust">
                <div style={{ fontFamily: 'var(--font-cardo)', fontStyle: 'italic', fontSize: '15px', color: '#3D2E20', lineHeight: '1.6' }} dir="rtl">
                  "{suggestion.quote}"
                </div>
              </div>
            )}

            {/* Re-analyze */}
            <button
              onClick={() => analyze(customPrompt || entryText)}
              className="w-full py-3 rounded-xl border border-shamur-gold/30 text-shamur-muted text-sm font-sans"
            >
              🔄 הצעות חדשות
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
