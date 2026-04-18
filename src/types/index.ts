export type Season = 'autumn' | 'winter' | 'spring' | 'summer';
export type View = 'monthly' | 'weekly' | 'daily';
export type FamilyMember = 'adi' | 'roei' | 'maya' | 'amit' | 'noam' | 'romi';
export type StickerCategory = 'botanical' | 'seasonal' | 'mood' | 'food' | 'family' | 'vintage' | 'washi' | 'travel';

export interface PlacedSticker {
  id: string;
  stickerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: number;
  stickers: PlacedSticker[];
  wordOfWeek?: string;
  gratitude?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Sticker {
  id: string;
  name: string;
  nameHe: string;
  category: StickerCategory;
  svg: string;
  free: boolean;
  season?: Season;
  tags: string[];
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  member: FamilyMember;
  time?: string;
}

export const FAMILY_COLORS: Record<FamilyMember, string> = {
  adi: '#8B2635',
  roei: '#2C3E50',
  maya: '#D4846A',
  amit: '#6B7340',
  noam: '#D4A94A',
  romi: '#E88DA8',
};

export const FAMILY_NAMES: Record<FamilyMember, string> = {
  adi: 'עדי',
  roei: 'רועי',
  maya: 'מאיה',
  amit: 'עמית',
  noam: 'נועם',
  romi: 'רומי',
};
