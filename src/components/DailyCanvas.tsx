'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { formatDisplayDate, getDayName, MOOD_LABELS } from '@/lib/dates';
import {
  getEntry, createEntry, saveEntry,
  updateEntryText, updateEntryMood,
  addStickerToEntry, removeStickerFromEntry,
} from '@/lib/store';
import { getStickerById } from '@/lib/stickers';
import StickerPicker from './StickerPicker';
import AIStylist from './AIStylist';
import type { JournalEntry, PlacedSticker, Sticker } from '@/types';

interface Props {
  date: string;
  onBack: () => void;
}

export default function DailyCanvas({ date, onBack }: Props) {
  const [entry, setEntry] = useState<JournalEntry>(() => getEntry(date) || createEntry(date));
  const [panel, setPanel] = useState<'none' | 'stickers' | 'ai'>('none');
  const [selectedPlaced, setSelectedPlaced] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const day = parseInt(date.split('-')[2]);
  const displayDate = formatDisplayDate(date);
  const dayName = getDayName(date);

  useEffect(() => {
    const saved = getEntry(date) || createEntry(date);
    setEntry(saved);
    setPanel('none');
    setSelectedPlaced(null);
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
      x: 15 + Math.random() * 65,
      y: 10 + Math.random() * 60,
      rotation: (Math.random() - 0.5) * 28,
      scale: 1,
    };
    addStickerToEntry(date, placed);
    setEntry(prev => ({ ...prev, stickers: [...prev.stickers, placed] }));
    setPanel('none');
  };

  const handleRemoveSticker = (placedId: string) => {
    removeStickerFromEntry(date, placedId);
    setEntry(prev => ({ ...prev, stickers: prev.stickers.filter(s => s.id !== placedId) }));
    setSelectedPlaced(null);
  };

  // Touch drag
  const handleStickerTouchStart = useCallback((e: React.TouchEvent, id: string, sx: number, sy: number) => {
    e.stopPropagation();
    setSelectedPlaced(id);
    const touch = e.touches[0];
    setDragging({ id, startX: touch.clientX, startY: touch.clientY, origX: sx, origY: sy });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging || !canvasRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((touch.clientX - dragging.startX) / rect.width) * 100;
    const dy = ((touch.clientY - dragging.startY) / rect.height) * 100;
    const newX = Math.max(0, Math.min(88, dragging.origX + dx));
    const newY = Math.max(0, Math.min(88, dragging.origY + dy));
    setEntry(prev => ({
      ...prev,
      stickers: prev.stickers.map(s => s.id === dragging.id ? { ...s, x: newX, y: newY } : s)
    }));
  }, [dragging]);

  const handleTouchEnd = useCallback(() => {
    if (!dragging) return;
    const current = { ...entry };
    saveEntry(current);
    setDragging(null);
  }, [dragging, entry]);

  // Voice recording
  const toggleVoice = () => {
    if (typeof window === 'undefined') return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert('הדפדפן שלך לא תומך בזיהוי קול'); return; }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = 'he-IL';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e: any) => {
      let final = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + ' ';
      }
      setTranscript(final);
    };

    recognition.onend = () => {
      setListening(false);
      if (transcript) {
        const newText = entry.text ? entry.text + '\n' + transcript : transcript;
        handleTextChange(newText);
        setTranscript('');
      }
    };

    recognition.start();
    setListening(true);
  };

  // Photo from camera
  const handlePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const photos: string[] = JSON.parse(localStorage.getItem(`shamur:photos:${date}`) || '[]');
        photos.push(ev.target?.result as string);
        localStorage.setItem(`shamur:photos:${date}`, JSON.stringify(photos));
        setEntry(prev => ({ ...prev })); // trigger re-render
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // Load photos
  const photos: string[] = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem(`shamur:photos:${date}`) || '[]')
    : [];

  return (
    <div className="flex flex-col h-full bg-shamur-paper relative">
      {/* Header */}
      <div className="relative h-28 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C4541C 0%, #8B2635 60%, #4A0E18 100%)' }} />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <button onClick={onBack} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white text-base">
          ←
        </button>

        {/* Date */}
        <div className="absolute top-3 left-3 z-10" dir="rtl">
          <div className="text-white/60 text-[10px] tracking-widest" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{dayName}</div>
          <div className="text-white leading-none mt-0.5" style={{ fontFamily: 'var(--font-display)', fontSize: '52px', letterSpacing: '-2px' }}>{day}</div>
          <div className="text-white/75 text-[10px] tracking-wide" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            {displayDate.split(' ').slice(1).join(' ')}
          </div>
        </div>

        {/* Mood */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          {MOOD_LABELS.map((emoji, i) => (
            <button key={i} onClick={() => handleMood(i + 1)}
              className={`text-lg transition-transform ${entry.mood === i + 1 ? 'scale-125' : 'scale-90 opacity-50'}`}>
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative flex-1 overflow-hidden"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setSelectedPlaced(null)}
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 27px, rgba(139,38,53,0.05) 27px, rgba(139,38,53,0.05) 28px)',
          background: '#FAF5EB'
        }}
      >
        {/* Listening indicator */}
        {listening && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-shamur-rust text-white px-4 py-1.5 rounded-full text-xs font-sans flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {transcript || 'מקשיבה...'}
          </div>
        )}

        {/* Text area */}
        <textarea
          value={entry.text}
          onChange={e => handleTextChange(e.target.value)}
          placeholder="מה עבר עלייך היום?  ✿"
          className="absolute inset-0 w-full h-full bg-transparent px-4 pt-3 pb-24 text-[14px] text-shamur-ink leading-7 resize-none outline-none placeholder:text-shamur-muted/30 z-10"
          dir="rtl"
          style={{ fontFamily: 'var(--font-sans)', lineHeight: '28px' }}
        />

        {/* Photos */}
        {photos.map((src, i) => (
          <div key={i} className="absolute z-20 shadow-lg"
            style={{ left: `${10 + i * 35}%`, top: `${5 + i * 15}%`, transform: `rotate(${(i % 2 === 0 ? -3 : 4)}deg)`, padding: '5px 5px 16px', background: '#F5EDE0' }}>
            <img src={src} alt="" className="w-20 h-20 object-cover" />
          </div>
        ))}

        {/* Placed stickers */}
        {entry.stickers.map(placed => {
          const sticker = getStickerById(placed.stickerId);
          if (!sticker) return null;
          const isSelected = selectedPlaced === placed.id;
          return (
            <div
              key={placed.id}
              className="absolute z-20 touch-none select-none"
              style={{
                left: `${placed.x}%`,
                top: `${placed.y}%`,
                transform: `rotate(${placed.rotation}deg) scale(${placed.scale})`,
                width: '54px',
                height: '54px',
                filter: 'drop-shadow(1px 2px 5px rgba(0,0,0,0.18))',
              }}
              onTouchStart={e => handleStickerTouchStart(e, placed.id, placed.x, placed.y)}
              onClick={e => { e.stopPropagation(); setSelectedPlaced(placed.id); }}
            >
              <div dangerouslySetInnerHTML={{ __html: sticker.svg }} className="w-full h-full" />
              {isSelected && (
                <button
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-shamur-bg text-white text-[10px] flex items-center justify-center shadow-md z-30"
                  onClick={e => { e.stopPropagation(); handleRemoveSticker(placed.id); }}
                >✕</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-around px-4 py-2.5 bg-shamur-cream/95 backdrop-blur-sm border-t border-shamur-gold/20 flex-shrink-0">
        <button onClick={() => setPanel(p => p === 'stickers' ? 'none' : 'stickers')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${panel === 'stickers' ? 'text-shamur-bg' : 'text-shamur-muted'}`}>
          <span className="text-xl">🌸</span>
          <span className="text-[9px] font-sans">מדבקות</span>
        </button>
        <button onClick={() => setPanel(p => p === 'ai' ? 'none' : 'ai')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${panel === 'ai' ? 'text-shamur-bg' : 'text-shamur-muted'}`}>
          <span className="text-xl">✦</span>
          <span className="text-[9px] font-sans">AI</span>
        </button>
        <button onClick={handlePhoto} className="flex flex-col items-center gap-0.5 text-shamur-muted">
          <span className="text-xl">📷</span>
          <span className="text-[9px] font-sans">תמונה</span>
        </button>
        <button onClick={toggleVoice}
          className={`flex flex-col items-center gap-0.5 transition-colors ${listening ? 'text-shamur-rust' : 'text-shamur-muted'}`}>
          <span className="text-xl">{listening ? '⏹' : '🎙'}</span>
          <span className="text-[9px] font-sans">{listening ? 'עצרי' : 'קול'}</span>
        </button>
        {entry.text && (
          <button
            onClick={() => {
              const text = `✦ ${dayName}, ${displayDate}\n\n${entry.text}`;
              if (navigator.share) navigator.share({ text });
              else navigator.clipboard.writeText(text);
            }}
            className="flex flex-col items-center gap-0.5 text-shamur-muted">
            <span className="text-xl">📤</span>
            <span className="text-[9px] font-sans">שתפי</span>
          </button>
        )}
      </div>

      {/* Sticker Picker Sheet */}
      {panel === 'stickers' && (
        <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end" onClick={() => setPanel('none')}>
          <div className="h-3/4 rounded-t-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <StickerPicker onSelect={handleAddSticker} onClose={() => setPanel('none')} />
          </div>
        </div>
      )}

      {/* AI Stylist Sheet */}
      {panel === 'ai' && (
        <div className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end" onClick={() => setPanel('none')}>
          <div className="h-4/5 rounded-t-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <AIStylist
              entryText={entry.text}
              onSelectSticker={(s) => { handleAddSticker(s); setPanel('none'); }}
              onClose={() => setPanel('none')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
