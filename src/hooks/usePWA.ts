'use client';
import { useEffect, useState } from 'react';

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notifPerm, setNotifPerm] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capture install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Notification permission
    if ('Notification' in window) {
      setNotifPerm(Notification.permission);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setInstallPrompt(null);
  };

  const requestNotifications = async () => {
    if (!('Notification' in window)) return;
    const perm = await Notification.requestPermission();
    setNotifPerm(perm);

    if (perm === 'granted') {
      // Schedule daily reminder via periodic sync if supported
      if ('serviceWorker' in navigator && 'periodicSync' in (await navigator.serviceWorker.ready)) {
        try {
          const reg = await navigator.serviceWorker.ready;
          await (reg as any).periodicSync.register('daily-reminder', { minInterval: 24 * 60 * 60 * 1000 });
        } catch {}
      }
      // Immediate test notification
      new Notification('שמור ✦', {
        body: 'התראות מופעלות! תזכורת יומית ב-21:00 🌸',
        icon: '/icon-192.png',
        dir: 'rtl',
      });
    }
  };

  return { installPrompt, isInstalled, install, notifPerm, requestNotifications };
}
