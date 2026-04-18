import type { JournalEntry, CalendarEvent, PlacedSticker } from '@/types';

const KEYS = {
  entries: 'shamur:entries',
  events: 'shamur:events',
  wordOfWeek: 'shamur:wotw',
  settings: 'shamur:settings',
};

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function set(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ENTRIES
export function getEntries(): Record<string, JournalEntry> {
  return get(KEYS.entries, {});
}

export function getEntry(date: string): JournalEntry | null {
  const entries = getEntries();
  return entries[date] || null;
}

export function saveEntry(entry: JournalEntry) {
  const entries = getEntries();
  entries[entry.date] = { ...entry, updatedAt: Date.now() };
  set(KEYS.entries, entries);
}

export function createEntry(date: string): JournalEntry {
  return {
    id: `entry-${date}`,
    date,
    text: '',
    mood: 3,
    stickers: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function updateEntryText(date: string, text: string) {
  const entry = getEntry(date) || createEntry(date);
  saveEntry({ ...entry, text });
}

export function updateEntryMood(date: string, mood: number) {
  const entry = getEntry(date) || createEntry(date);
  saveEntry({ ...entry, mood });
}

export function addStickerToEntry(date: string, placed: PlacedSticker) {
  const entry = getEntry(date) || createEntry(date);
  saveEntry({ ...entry, stickers: [...entry.stickers, placed] });
}

export function removeStickerFromEntry(date: string, placedId: string) {
  const entry = getEntry(date) || createEntry(date);
  saveEntry({ ...entry, stickers: entry.stickers.filter(s => s.id !== placedId) });
}

// EVENTS
export function getEvents(): CalendarEvent[] {
  return get(KEYS.events, getDefaultEvents());
}

export function saveEvent(event: CalendarEvent) {
  const events = getEvents();
  const idx = events.findIndex(e => e.id === event.id);
  if (idx >= 0) events[idx] = event;
  else events.push(event);
  set(KEYS.events, events);
}

export function deleteEvent(id: string) {
  const events = getEvents().filter(e => e.id !== id);
  set(KEYS.events, events);
}

export function getEventsForDate(date: string): CalendarEvent[] {
  return getEvents().filter(e => e.date === date);
}

export function getEventsForMonth(year: number, month: number): CalendarEvent[] {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return getEvents().filter(e => e.date.startsWith(prefix));
}

// WORD OF WEEK
export function getWordOfWeek(): { word: string; hebrew: string; week: number } {
  return get(KEYS.wordOfWeek, { word: 'BLOOM', hebrew: 'לפרוח', week: getCurrentWeek() });
}

export function saveWordOfWeek(word: string, hebrew: string) {
  set(KEYS.wordOfWeek, { word, hebrew, week: getCurrentWeek() });
}

function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
}

function getDefaultEvents(): CalendarEvent[] {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  return [
    { id: 'ev1', date: `${y}-${m}-15`, title: 'יוגה', member: 'adi', time: '07:30' },
    { id: 'ev2', date: `${y}-${m}-16`, title: 'חוג בלט — רומי', member: 'romi', time: '16:00' },
    { id: 'ev3', date: `${y}-${m}-18`, title: 'טיול משפחתי', member: 'roei', time: '08:00' },
    { id: 'ev4', date: `${y}-${m}-20`, title: 'פגישת הורים — נועם', member: 'noam', time: '17:30' },
  ];
}
