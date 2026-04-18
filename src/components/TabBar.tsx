'use client';
import type { View } from '@/types';

interface Props {
  view: View;
  onViewChange: (v: View) => void;
  onNewEntry: () => void;
}

const tabs: { id: View | 'create'; icon: string; label: string }[] = [
  { id: 'weekly', icon: '📅', label: 'שבוע' },
  { id: 'monthly', icon: '🗓', label: 'חודש' },
  { id: 'create', icon: '✦', label: 'יצירה' },
  { id: 'daily', icon: '✏️', label: 'יום' },
  { id: 'monthly', icon: '👤', label: 'אני' },
];

export default function TabBar({ view, onViewChange, onNewEntry }: Props) {
  return (
    <div
      className="flex items-end bg-shamur-paper/96 backdrop-blur-md border-t border-shamur-gold/15"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      {[
        { id: 'weekly' as View, icon: '📅', label: 'שבוע' },
        { id: 'monthly' as View, icon: '🗓', label: 'חודש' },
        { id: null, icon: '✦', label: 'יצירה' },
        { id: 'daily' as View, icon: '✏️', label: 'יום' },
      ].map((tab, i) => {
        if (tab.id === null) {
          return (
            <button
              key="create"
              onClick={onNewEntry}
              className="flex-1 flex flex-col items-center pb-2 pt-1"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-shamur-rust to-shamur-bg flex items-center justify-center text-shamur-cream text-lg shadow-lg -mt-5 mb-0.5">
                ✦
              </div>
              <span className="text-[9px] font-sans text-shamur-muted">יצירה</span>
            </button>
          );
        }
        const isActive = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id!)}
            className="flex-1 flex flex-col items-center py-2 gap-0.5"
          >
            <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'scale-90 opacity-50'}`}>
              {tab.icon}
            </span>
            <span className={`text-[9px] font-sans transition-colors ${isActive ? 'text-shamur-bg font-semibold' : 'text-shamur-muted'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
