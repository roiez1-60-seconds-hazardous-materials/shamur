'use client';
import { useState, useEffect } from 'react';

export default function SettingsPage({ onClose }: { onClose: () => void }) {
  const [notifTime, setNotifTime] = useState('21:00');
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('shamur:settings') || '{}');
    if (s.notifTime) setNotifTime(s.notifTime);
    if (s.notifEnabled) setNotifEnabled(s.notifEnabled);
    if (s.theme) setTheme(s.theme);
    if ('Notification' in window) setNotifEnabled(Notification.permission === 'granted');
  }, []);

  const save = () => {
    localStorage.setItem('shamur:settings', JSON.stringify({ notifTime, notifEnabled, theme }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotif = async () => {
    if (!notifEnabled) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setNotifEnabled(true);
        new Notification('שמור ✦', { body: `תזכורת יומית ב-${notifTime} 🌸`, icon: '/icon-192.png', dir: 'rtl' });
      }
    } else {
      setNotifEnabled(false);
    }
  };

  const clearData = () => {
    if (confirm('למחוק את כל הנתונים? פעולה זו לא ניתנת לביטול.')) {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('shamur:'));
      keys.forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-shamur-paper">
      <div className="flex items-center justify-between px-4 py-3 border-b border-shamur-gold/20 flex-shrink-0">
        <button onClick={onClose} className="text-shamur-muted text-lg">←</button>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'18px', color:'#8B2635' }}>הגדרות</div>
        <button onClick={save} className="text-xs font-sans text-shamur-rust">{saved ? '✓ נשמר' : 'שמור'}</button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">

        {/* Notifications */}
        <div className="bg-shamur-cream rounded-2xl p-4">
          <div style={{ fontFamily:'var(--font-display)', fontSize:'16px', color:'#8B2635', marginBottom:'12px' }}>
            🔔 תזכורת יומית
          </div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-sans text-shamur-ink" dir="rtl">שלחי לי תזכורת לכתוב</label>
            <button onClick={toggleNotif}
              className="w-12 h-6 rounded-full transition-colors relative flex-shrink-0"
              style={{ background: notifEnabled ? '#8B2635' : '#E8DCC8' }}>
              <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ right: notifEnabled ? '2px' : 'auto', left: notifEnabled ? 'auto' : '2px' }} />
            </button>
          </div>
          {notifEnabled && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-sans text-shamur-muted flex-1" dir="rtl">שעת תזכורת</label>
              <input type="time" value={notifTime} onChange={e => setNotifTime(e.target.value)}
                className="bg-shamur-paper rounded-xl px-3 py-2 text-sm font-sans outline-none border border-shamur-gold/20" />
            </div>
          )}
        </div>

        {/* Theme */}
        <div className="bg-shamur-cream rounded-2xl p-4">
          <div style={{ fontFamily:'var(--font-display)', fontSize:'16px', color:'#8B2635', marginBottom:'12px' }}>
            🎨 מראה
          </div>
          <div className="flex gap-3">
            {(['light','dark'] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`flex-1 py-3 rounded-xl text-sm font-sans transition-all ${theme===t ? 'text-shamur-cream' : 'text-shamur-muted bg-shamur-paper'}`}
                style={theme===t ? { background:'#8B2635' } : {}}>
                {t === 'light' ? '☀️ בהיר' : '🌙 כהה'}
              </button>
            ))}
          </div>
          <div style={{ fontFamily:'var(--font-sans)', fontSize:'10px', color:'#A09080', marginTop:'8px', textAlign:'center' }}>
            תמת לילה — בקרוב
          </div>
        </div>

        {/* About */}
        <div className="bg-shamur-cream rounded-2xl p-4">
          <div style={{ fontFamily:'var(--font-display)', fontSize:'16px', color:'#8B2635', marginBottom:'8px' }}>
            ✦ אודות שמור
          </div>
          <div className="space-y-2" style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'#6B5B4E', lineHeight:'1.6' }} dir="rtl">
            <p>שמור היא יומן דיגיטלי אישי שנבנה במיוחד לעדי צוקרמן.</p>
            <p>כל הנתונים שמורים אצלך בלבד — לא בשרת, לא בענן חיצוני.</p>
            <p>80+ מדבקות SVG · AI Stylist · לוח משפחתי · ספר שנתי</p>
            <p style={{ color:'#A09080', fontSize:'10px' }}>Built with ♡ by רועי צוקרמן · 2026</p>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-shamur-cream rounded-2xl p-4 border border-red-200">
          <div style={{ fontFamily:'var(--font-display)', fontSize:'16px', color:'#B83A2E', marginBottom:'8px' }}>
            ⚠️ מחיקת נתונים
          </div>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'#6B5B4E', marginBottom:'12px' }} dir="rtl">
            מחיקת כל הערכים, האירועים והמדבקות. לא ניתן לשחזר.
          </p>
          <button onClick={clearData}
            className="w-full py-2.5 rounded-xl text-sm font-sans font-semibold text-white"
            style={{ background:'#B83A2E' }}>
            מחקי את כל הנתונים
          </button>
        </div>
      </div>
    </div>
  );
}
