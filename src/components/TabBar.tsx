'use client';
import type { View } from '@/types';

interface Props {
  view: View;
  onViewChange: (v: View) => void;
  onNewEntry: () => void;
  onProfile: () => void;
}

export default function TabBar({ view, onViewChange, onNewEntry, onProfile }: Props) {
  return (
    <div className="flex items-end bg-shamur-paper/96 backdrop-blur-md border-t border-shamur-gold/15 flex-shrink-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      {/* שבוע */}
      <button onClick={() => onViewChange('weekly')} className="flex-1 flex flex-col items-center py-2 gap-0.5">
        <span className={`text-xl transition-transform ${view === 'weekly' ? 'scale-110' : 'scale-90 opacity-50'}`}>📅</span>
        <span className={`text-[9px] font-sans ${view === 'weekly' ? 'text-shamur-bg font-semibold' : 'text-shamur-muted'}`}>שבוע</span>
      </button>
      {/* חודש */}
      <button onClick={() => onViewChange('monthly')} className="flex-1 flex flex-col items-center py-2 gap-0.5">
        <span className={`text-xl transition-transform ${view === 'monthly' ? 'scale-110' : 'scale-90 opacity-50'}`}>🗓</span>
        <span className={`text-[9px] font-sans ${view === 'monthly' ? 'text-shamur-bg font-semibold' : 'text-shamur-muted'}`}>חודש</span>
      </button>
      {/* FAB */}
      <button onClick={onNewEntry} className="flex-1 flex flex-col items-center pb-2 pt-1">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-shamur-cream text-xl shadow-lg -mt-5 mb-0.5"
          style={{ background: 'linear-gradient(145deg, #C4541C, #8B2635)' }}>✦</div>
        <span className="text-[9px] font-sans text-shamur-muted">יצירה</span>
      </button>
      {/* יום */}
      <button onClick={() => { onViewChange('daily' as View); }} className="flex-1 flex flex-col items-center py-2 gap-0.5">
        <span className="text-xl opacity-50">✏️</span>
        <span className="text-[9px] font-sans text-shamur-muted">יום</span>
      </button>
      {/* אני */}
      <button onClick={onProfile} className="flex-1 flex flex-col items-center py-2 gap-0.5">
        <span className="text-xl opacity-50">👤</span>
        <span className="text-[9px] font-sans text-shamur-muted">אני</span>
      </button>
    </div>
  );
}
