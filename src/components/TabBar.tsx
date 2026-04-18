'use client';
import type { View } from '@/types';

interface Props {
  view: View;
  onViewChange: (v: View) => void;
  onNewEntry: () => void;
  onProfile: () => void;
  onToday: () => void;
}

export default function TabBar({ view, onViewChange, onNewEntry, onProfile, onToday }: Props) {
  return (
    <div className="flex items-end bg-shamur-paper/96 backdrop-blur-md border-t border-shamur-gold/15 flex-shrink-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>

      {/* שבוע */}
      <button onClick={() => onViewChange('weekly')} className="flex-1 flex flex-col items-center py-2.5 gap-0.5">
        <span className={`text-xl transition-all duration-200 ${view === 'weekly' ? 'scale-110' : 'scale-90 opacity-40'}`}>📅</span>
        <span className={`text-[9px] font-sans transition-colors ${view === 'weekly' ? 'text-shamur-bg font-bold' : 'text-shamur-muted'}`}>שבוע</span>
      </button>

      {/* חודש */}
      <button onClick={() => onViewChange('monthly')} className="flex-1 flex flex-col items-center py-2.5 gap-0.5">
        <span className={`text-xl transition-all duration-200 ${view === 'monthly' ? 'scale-110' : 'scale-90 opacity-40'}`}>🗓</span>
        <span className={`text-[9px] font-sans transition-colors ${view === 'monthly' ? 'text-shamur-bg font-bold' : 'text-shamur-muted'}`}>חודש</span>
      </button>

      {/* FAB יצירה */}
      <button onClick={onNewEntry} className="flex-1 flex flex-col items-center pb-2.5 pt-1">
        <div className="w-13 h-13 rounded-full flex items-center justify-center text-shamur-cream shadow-lg -mt-6 mb-0.5 transition-transform active:scale-95"
          style={{ width: '52px', height: '52px', background: 'linear-gradient(145deg, #C4541C, #8B2635)', boxShadow: '0 6px 20px rgba(139,38,53,0.45)' }}>
          <span style={{ fontSize: '22px' }}>✦</span>
        </div>
        <span className="text-[9px] font-sans text-shamur-muted">יצירה</span>
      </button>

      {/* יום - opens today */}
      <button onClick={onToday} className="flex-1 flex flex-col items-center py-2.5 gap-0.5">
        <span className="text-xl opacity-40 transition-all duration-200 active:scale-110 active:opacity-100">✏️</span>
        <span className="text-[9px] font-sans text-shamur-muted">היום</span>
      </button>

      {/* אני */}
      <button onClick={onProfile} className="flex-1 flex flex-col items-center py-2.5 gap-0.5">
        <span className="text-xl opacity-40">👤</span>
        <span className="text-[9px] font-sans text-shamur-muted">אני</span>
      </button>
    </div>
  );
}
