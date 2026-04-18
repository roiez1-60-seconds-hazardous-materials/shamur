'use client';
import { useState } from 'react';
import { STICKERS, searchStickers, getStickersByCategory } from '@/lib/stickers';
import type { Sticker, StickerCategory } from '@/types';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'הכל' },
  { id: 'botanical', label: 'פרחים 🌸' },
  { id: 'seasonal', label: 'עונות 🍂' },
  { id: 'mood', label: 'רגש ❤️' },
  { id: 'washi', label: 'סרטי נייר' },
  { id: 'vintage', label: 'רטרו ✉️' },
  { id: 'family', label: 'משפחה 🏠' },
  { id: 'food', label: 'אוכל ☕' },
  { id: 'travel', label: 'טיול ✈️' },
];

interface Props {
  onSelect: (sticker: Sticker) => void;
  onClose: () => void;
}

export default function StickerPicker({ onSelect, onClose }: Props) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const stickers = search
    ? searchStickers(search)
    : getStickersByCategory(category);

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20">
        <button onClick={onClose} className="text-shamur-muted text-xl leading-none">✕</button>
        <div className="font-display text-shamur-bg text-lg">חנות מדבקות</div>
        <div className="font-italic text-shamur-olive text-xs tracking-wider">sticker shop</div>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 bg-shamur-cream rounded-2xl px-3 py-2 border border-shamur-gold/20">
          <span className="text-shamur-muted text-sm">🔍</span>
          <input
            type="text"
            placeholder="חפשי: פרחים, לב, עלה..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-right text-sm font-sans text-shamur-ink placeholder:text-shamur-muted outline-none"
            dir="rtl"
          />
        </div>
      </div>

      {/* Categories */}
      {!search && (
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-sans font-medium transition-colors
                ${category === cat.id
                  ? 'bg-shamur-bg text-shamur-cream'
                  : 'bg-shamur-cream text-shamur-muted hover:bg-shamur-gold/20'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="px-4 pb-1">
        <span className="text-[10px] font-sans italic text-shamur-muted">{stickers.length} מדבקות · הכל חינם ✓</span>
      </div>

      {/* Sticker grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-hide">
        <div className="grid grid-cols-5 gap-2">
          {stickers.map(sticker => (
            <button
              key={sticker.id}
              onClick={() => onSelect(sticker)}
              className="aspect-square bg-shamur-cream rounded-xl flex flex-col items-center justify-center p-1.5 hover:bg-shamur-gold/20 hover:scale-105 transition-all active:scale-95"
              title={sticker.nameHe}
            >
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: sticker.svg }}
              />
            </button>
          ))}
        </div>

        {stickers.length === 0 && (
          <div className="text-center py-8 text-shamur-muted font-sans italic text-sm">
            לא נמצאו מדבקות
          </div>
        )}
      </div>
    </div>
  );
}
