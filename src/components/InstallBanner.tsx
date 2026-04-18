'use client';
import { usePWA } from '@/hooks/usePWA';

export default function InstallBanner() {
  const { installPrompt, isInstalled, install, notifPerm, requestNotifications } = usePWA();

  if (isInstalled) return null;
  if (!installPrompt && notifPerm !== 'default') return null;

  return (
    <div className="pointer-events-none fixed bottom-20 inset-x-4 z-40">
      {installPrompt && (
        <div className="pointer-events-auto rounded-2xl overflow-hidden shadow-2xl mb-2"
          style={{ background:'linear-gradient(135deg,#8B2635,#6B1C28)', border:'1px solid rgba(212,169,74,0.4)' }}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-xl bg-shamur-cream flex items-center justify-center flex-shrink-0"
              style={{ fontFamily:'var(--font-display)', fontSize:'20px', color:'#8B2635' }}>ש</div>
            <div className="flex-1 text-right" dir="rtl">
              <div style={{ fontFamily:'var(--font-display)', fontSize:'13px', color:'#FAF5EB' }}>הוסיפי שמור למסך הבית</div>
              <div style={{ fontFamily:'var(--font-sans)', fontSize:'10px', color:'rgba(250,245,235,0.65)' }}>גישה מהירה כמו אפליקציה ✦</div>
            </div>
            <button onClick={install} className="px-3 py-1.5 rounded-xl text-xs font-sans font-bold flex-shrink-0"
              style={{ background:'#D4A94A', color:'#1A1410' }}>הוסיפי</button>
          </div>
        </div>
      )}

      {!installPrompt && notifPerm === 'default' && (
        <div className="pointer-events-auto rounded-2xl overflow-hidden shadow-xl bg-shamur-cream border border-shamur-gold/30">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-2xl flex-shrink-0">🔔</span>
            <div className="flex-1 text-right" dir="rtl">
              <div style={{ fontFamily:'var(--font-display)', fontSize:'13px', color:'#8B2635' }}>תזכורת יומית?</div>
              <div style={{ fontFamily:'var(--font-sans)', fontSize:'10px', color:'#6B5B4E' }}>תזכורת ב-21:00 לכתוב ביומן</div>
            </div>
            <button onClick={requestNotifications} className="px-3 py-1.5 rounded-xl text-xs font-sans font-bold text-shamur-cream flex-shrink-0"
              style={{ background:'#8B2635' }}>כן ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
