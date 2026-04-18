export const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export const HEBREW_DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
export const ENGLISH_DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function today(): string {
  return formatDate(new Date());
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function addDays(dateStr: string, days: number): string {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function getWeekDays(anchorDate: string): string[] {
  const d = parseDate(anchorDate);
  const day = d.getDay(); // 0=Sunday
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(sunday);
    dd.setDate(sunday.getDate() + i);
    return formatDate(dd);
  });
}

export function isSameMonth(dateStr: string, year: number, month: number): boolean {
  const d = parseDate(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

export function formatDisplayDate(dateStr: string): string {
  const d = parseDate(dateStr);
  return `${d.getDate()} ב${HEBREW_MONTHS[d.getMonth()]}`;
}

export function getDayName(dateStr: string): string {
  const d = parseDate(dateStr);
  const names = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  return names[d.getDay()];
}

export function getMonthName(month: number): string {
  return HEBREW_MONTHS[month];
}

export function getSeason(month: number): string {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

export const MOOD_LABELS = ['😢', '😕', '😐', '🙂', '😄'];
export const MOOD_COLORS = ['#2C3E50', '#9BA87D', '#D4A94A', '#D4846A', '#8B2635'];
