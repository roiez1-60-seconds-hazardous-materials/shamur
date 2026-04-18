'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { formatDisplayDate, getDayName, MOOD_LABELS, MOOD_COLORS } from '@/lib/dates';
import {
  getEntry, createEntry, saveEntry,
  updateEntryText, updateEntryMood,
  addStickerToEntry, removeStickerFromEntry,
} from '@/lib/store';
import { getStickerById } from '@/lib/stickers';
import StickerPicker from './StickerPicker';
import type { JournalEntry, PlacedSticker, Sticker } from '@/types';

interface Props {
  date: string;
  onBack: () => void;
}

export default function DailyCanvas({ date, onBack }: Props) {
  const [entry, setEntry] = useState<JournalEntry>(() => getEntry(date) || createEntry(date));
  const [showStickers, setShowStickers] = useState(false);
  const [selectedPlaced, setSelectedPlaced] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const day = parseInt(date.split('-')[2]);
  const displayDate = formatDisplayDate(date);
  const dayName = getDayName(date);

  useEffect(() => {
    const saved = getEntry(date) || createEntry(date);
    setEntry(saved);
  }, [date]);

  const handleTextChange = (text: string) => {
    updateEntryText(date, text);
    setEntry(prev => ({ ...prev, text }));
  };

  const handleMood = (mood: number) => {
    updateEntryMood(date, mood);
    setEntry(prev => ({ ...prev, mood }));
  };

  const handleAddSticker = (sticker: Sticker) => {
    const placed: PlacedSticker = {
      id: `ps-${Date.now()}`,
      stickerId: sticker.id,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 50,
      rotation: (Math.random() - 0.5) * 30,
      scale: 1,
    };
    addStickerToEntry(date, placed);
    setEntry(prev => ({ ...prev, stickers: [...prev.stickers, placed] }));
    setShowStickers(false);
  };

  const handleRemoveSticker = (placedId: string) => {
    removeStickerFromEntry(date, placedId);
    setEntry(prev => ({ ...prev, stickers: prev.stickers.filter(s => s.id !== placedId) }));
    setSelectedPlaced(null);
  };

  // Touch drag for stickers
  const handleStickerTouchStart = useCallback((e: React.TouchEvent, id: string, sx: number, sy: number) => {
    e.stopPropagation();
    setSelectedPlaced(id);
    const touch = e.touches[0];
    setDragging({ id, startX: touch.clientX, startY: touch.clientY, origX: sx, origY: sy });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging || !canvasRef.current) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((touch.clientX - dragging.startX) / rect.width) * 100;
    const dy = ((touch.clientY - dragging.startY) / rect.height) * 100;
    const newX = Math.max(0, Math.min(90, dragging.origX + dx));
    const newY = Math.max(0, Math.min(90, dragging.origY + dy));

    setEntry(prev => ({
      ...prev,
      stickers: prev.stickers.map(s =>
        s.id === dragging.id ? { ...s, x: newX, y: newY } : s
      )
    }));
  }, [dragging]);

  const handleTouchEnd = useCallback(() => {
    if (!dragging) return;
    // Save final position
    const current = entry.stickers.find(s => s.id === dragging.id);
    if (current) {
      const updated = { ...entry, stickers: entry.stickers };
      saveEntry(updated);
    }
    setDragging(null);
  }, [dragging, entry]);

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      {/* Header */}
      <div className="relative h-28 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-shamur-rust via-shamur-bg to-[#4A0E18]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm"
        >
          ←
        </button>

        {/* Date display */}
        <div className="absolute top-4 left-4 text-right z-10" style={{ direction: 'rtl' }}>
          <div className="text-white/70 font-italic text-[11px] tracking-widest">{dayName}</div>
          <div className="text-white font-display text-5xl leading-none mt-0.5">{day}</div>
          <div className="text-white/80 font-italic text-[11px] tracking-wide mt-0.5">{displayDate.split(' ').slice(1).join(' ')}</div>
        </div>

        {/* Mood display */}
        <div className="absolute bottom-3 left-4 z-10">
          <div className="flex gap-1.5">
            {MOOD_LABELS.map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleMood(i + 1)}
                className={`text-lg transition-transform ${entry.mood === i + 1 ? 'scale-125' : 'scale-90 opacity-50'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div
        ref={canvasRef}
        className="relative flex-1 overflow-hidden"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setSelectedPlaced(null)}
        style={{ background: 'repeating-linear-gradient(0deg, transparent 0 27px, rgba(139,38,53,0.05) 27px 28px), var(--shamur-paper)' }}
      >
        {/* Text area */}
        <textarea
          ref={textRef}
          value={entry.text}
          onChange={e => handleTextChange(e.target.value)}
          placeholder="מה עבר עלייך היום?  ✿"
          className="absolute inset-0 w-full h-full bg-transparent px-4 pt-3 pb-20 font-sans text-[14px] text-shamur-ink leading-7 resize-none outline-none placeholder:text-shamur-muted/40 z-10"
          dir="rtl"
          style={{ fontFamily: 'var(--font-heebo), sans-serif' }}
        />

        {/* Placed stickers */}
        {entry.stickers.map(placed => {
          const sticker = getStickerById(placed.stickerId);
          if (!sticker) return null;
          const isSelected = selectedPlaced === placed.id;

          return (
            <div
              key={placed.id}
              className="absolute z-20 touch-none"
              style={{
                left: `${placed.x}%`,
                top: `${placed.y}%`,
                transform: `rotate(${placed.rotation}deg) scale(${placed.scale})`,
                width: '52px',
                height: '52px',
                filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.15))',
              }}
              onTouchStart={e => handleStickerTouchStart(e, placed.id, placed.x, placed.y)}
              onClick={e => { e.stopPropagation(); setSelectedPlaced(placed.id); }}
            >
              <div dangerouslySetInnerHTML={{ __html: sticker.svg }} className="w-full h-full" />
              {isSelected && (
                <button
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-shamur-bg text-white text-[10px] flex items-center justify-center shadow-md z-30"
                  onClick={e => { e.stopPropagation(); handleRemoveSticker(placed.id); }}
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-around px-4 py-3 bg-shamur-cream/95 backdrop-blur-sm border-t border-shamur-gold/20">
        <button
          onClick={() => setShowStickers(true)}
          className="flex flex-col items-center gap-0.5 text-shamur-muted hover:text-shamur-bg transition-colors"
        >
          <span className="text-xl">🌸</span>
          <span className="text-[9px] font-sans">מדבקות</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-shamur-muted hover:text-shamur-bg transition-colors">
          <span className="text-xl">📷</span>
          <span className="text-[9px] font-sans">תמונה</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-shamur-muted hover:text-shamur-bg transition-colors">
          <span className="text-xl">✏️</span>
          <span className="text-[9px] font-sans">ציור</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-shamur-muted hover:text-shamur-bg transition-colors">
          <span className="text-xl">🎙</span>
          <span className="text-[9px] font-sans">קול</span>
        </button>
      </div>

      {/* Sticker Picker Sheet */}
      {showStickers && (
        <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end">
          <div className="h-3/4 rounded-t-3xl overflow-hidden shadow-2xl">
            <StickerPicker
              onSelect={handleAddSticker}
              onClose={() => setShowStickers(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
