import type { Sticker } from '@/types';

export const STICKERS: Sticker[] = [
  // ── BOTANICAL ──────────────────────────────────────────
  {
    id: 'b01', name: 'Rose', nameHe: 'ורד', category: 'botanical', free: true, tags: ['flower', 'love', 'pink'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="28" r="10" fill="#E88DA8"/><circle cx="22" cy="32" r="8" fill="#D4728E"/><circle cx="38" cy="32" r="8" fill="#D4728E"/><circle cx="26" cy="20" r="7" fill="#E88DA8"/><circle cx="34" cy="20" r="7" fill="#E88DA8"/><circle cx="30" cy="26" r="6" fill="#F4C2C2"/><path d="M30 38 Q28 46 30 52" stroke="#6B7340" stroke-width="2" fill="none"/><path d="M30 44 Q24 42 22 46" stroke="#6B7340" stroke-width="1.5" fill="none"/></svg>`
  },
  {
    id: 'b02', name: 'Daisy', nameHe: 'חמנית קטנה', category: 'botanical', free: true, tags: ['flower', 'spring', 'white'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><g fill="#F5F0E8">${Array.from({length:8}, (_,i) => {const a=i*45*Math.PI/180;const x1=30+8*Math.cos(a);const y1=30+8*Math.sin(a);const x2=30+18*Math.cos(a);const y2=30+18*Math.sin(a);return `<ellipse cx="${(x1+x2)/2}" cy="${(y1+y2)/2}" rx="4" ry="8" transform="rotate(${i*45} ${(x1+x2)/2} ${(y1+y2)/2})" fill="#F5F0E8"/>`;}).join('')}</g><circle cx="30" cy="30" r="7" fill="#D4A94A"/><circle cx="30" cy="30" r="4" fill="#B8860B"/></svg>`
  },
  {
    id: 'b03', name: 'Lavender', nameHe: 'לבנדר', category: 'botanical', free: true, tags: ['flower', 'purple', 'calm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 50 L30 20" stroke="#6B7340" stroke-width="2.5"/><path d="M30 20 Q26 16 24 12" stroke="#6B7340" stroke-width="1.5" fill="none"/><path d="M30 20 Q34 16 36 12" stroke="#6B7340" stroke-width="1.5" fill="none"/><ellipse cx="24" cy="11" rx="3" ry="5" fill="#A899B5"/><ellipse cx="36" cy="11" rx="3" ry="5" fill="#A899B5"/><ellipse cx="28" cy="18" rx="2.5" ry="4" fill="#C4B5D4"/><ellipse cx="32" cy="18" rx="2.5" ry="4" fill="#C4B5D4"/><ellipse cx="27" cy="24" rx="2.5" ry="4" fill="#A899B5"/><ellipse cx="33" cy="24" rx="2.5" ry="4" fill="#A899B5"/><ellipse cx="28" cy="30" rx="2" ry="3.5" fill="#C4B5D4"/><ellipse cx="32" cy="30" rx="2" ry="3.5" fill="#C4B5D4"/><path d="M22 34 Q28 32 30 35 Q32 32 38 34" stroke="#8FA880" stroke-width="1.5" fill="none"/></svg>`
  },
  {
    id: 'b04', name: 'Tulip', nameHe: 'צבעוני', category: 'botanical', free: true, tags: ['flower', 'spring', 'colorful'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M24 30 Q22 18 30 12 Q38 18 36 30 Q33 36 30 38 Q27 36 24 30Z" fill="#C4541C"/><path d="M30 12 L30 38" stroke="#8B3515" stroke-width="1" opacity="0.4"/><path d="M30 38 L30 54" stroke="#6B7340" stroke-width="2.5"/><path d="M30 44 Q22 40 18 42" stroke="#6B7340" stroke-width="1.5" fill="none"/><ellipse cx="18" cy="43" rx="5" ry="3" fill="#8FA880" transform="rotate(-20 18 43)"/></svg>`
  },
  {
    id: 'b05', name: 'Wildflower', nameHe: 'פרח בר', category: 'botanical', free: true, tags: ['flower', 'field', 'wild'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="20" r="4" fill="#E88DA8"/><circle cx="20" cy="26" r="4" fill="#F07A5C"/><circle cx="40" cy="26" r="4" fill="#E88DA8"/><circle cx="22" cy="36" r="4" fill="#D4728E"/><circle cx="38" cy="36" r="4" fill="#F07A5C"/><circle cx="30" cy="40" r="4" fill="#E88DA8"/><circle cx="30" cy="30" r="6" fill="#D4A94A"/><path d="M30 44 L30 56" stroke="#6B7340" stroke-width="2"/><path d="M30 50 Q24 48 22 52" stroke="#6B7340" stroke-width="1.5" fill="none"/><ellipse cx="21" cy="53" rx="4" ry="2.5" fill="#8FA880" transform="rotate(-15 21 53)"/></svg>`
  },
  {
    id: 'b06', name: 'Branch', nameHe: 'ענף', category: 'botanical', free: true, tags: ['branch', 'nature', 'minimal'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 50 Q20 40 30 30 Q40 20 50 10" stroke="#6B4426" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M30 30 Q36 24 40 18" stroke="#6B4426" stroke-width="1.8" fill="none"/><path d="M25 35 Q18 30 14 24" stroke="#6B4426" stroke-width="1.8" fill="none"/><ellipse cx="42" cy="16" rx="6" ry="4" fill="#8FA880" transform="rotate(-40 42 16)"/><ellipse cx="40" cy="20" rx="5" ry="3.5" fill="#6B7340" transform="rotate(-30 40 20)"/><ellipse cx="13" cy="23" rx="5.5" ry="3.5" fill="#8FA880" transform="rotate(30 13 23)"/><ellipse cx="15" cy="27" rx="4.5" ry="3" fill="#6B7340" transform="rotate(20 15 27)"/><circle cx="48" cy="12" r="2.5" fill="#8B2635"/><circle cx="44" cy="14" r="2" fill="#8B2635"/><circle cx="12" cy="21" r="2" fill="#8B2635"/></svg>`
  },
  {
    id: 'b07', name: 'Fern', nameHe: 'שרך', category: 'botanical', free: true, tags: ['fern', 'green', 'nature'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 55 L30 15" stroke="#6B7340" stroke-width="2"/>${Array.from({length:8}, (_,i) => {const y = 20 + i*4.5; const side = i%2===0 ? -1 : 1; const x2 = 30 + side*16; const y2 = y - 4; return `<path d="M30 ${y} Q${30+side*8} ${y-2} ${x2} ${y2}" stroke="#8FA880" stroke-width="1.5" fill="none"/><ellipse cx="${x2}" cy="${y2}" rx="4" ry="2.5" fill="#8FA880" transform="rotate(${side*-30} ${x2} ${y2})"/>`}).join('')}</svg>`
  },
  {
    id: 'b08', name: 'Sunflower', nameHe: 'חמניה', category: 'botanical', free: true, tags: ['flower', 'summer', 'yellow'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><g fill="#E5A540">${Array.from({length:12}, (_,i) => {const a=i*30*Math.PI/180;const cx=30+14*Math.cos(a);const cy=30+14*Math.sin(a);return `<ellipse cx="${cx}" cy="${cy}" rx="4" ry="7" transform="rotate(${i*30} ${cx} ${cy})" fill="#E5A540"/>`;}).join('')}</g><circle cx="30" cy="30" r="10" fill="#6B4426"/><circle cx="30" cy="30" r="7" fill="#5A3518"/><path d="M30 42 L30 56" stroke="#6B7340" stroke-width="3"/><path d="M30 50 Q22 46 18 50" stroke="#6B7340" stroke-width="1.5" fill="none"/></svg>`
  },
  {
    id: 'b09', name: 'Poppy', nameHe: 'פרג', category: 'botanical', free: true, tags: ['flower', 'red', 'field'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="26" r="14" fill="#B83A2E"/><circle cx="22" cy="30" r="10" fill="#9B2E24"/><circle cx="38" cy="22" r="10" fill="#C4402E"/><circle cx="30" cy="26" r="7" fill="#8B2635" opacity="0.6"/><circle cx="30" cy="26" r="4" fill="#1A0F07"/><path d="M30 40 L30 54" stroke="#6B7340" stroke-width="2.5"/></svg>`
  },
  {
    id: 'b10', name: 'Eucalyptus', nameHe: 'אקליפטוס', category: 'botanical', free: true, tags: ['leaves', 'green', 'calming'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 56 Q20 44 16 34 Q14 24 20 16 Q26 8 30 10" stroke="#6B7340" stroke-width="2" fill="none"/><path d="M30 56 Q40 44 44 34 Q46 24 40 16 Q34 8 30 10" stroke="#6B7340" stroke-width="2" fill="none"/>${Array.from({length:5}, (_,i) => {const t = i/4; const lx = 30 + (i%2===0 ? -1:1) * (8+t*4); const ly = 18 + i*8; return `<ellipse cx="${lx}" cy="${ly}" rx="${5+t*1.5}" ry="${3.5+t}" fill="#9BA87D" opacity="${0.7+t*0.3}" transform="rotate(${(i%2===0?-20:20)} ${lx} ${ly})"/>`;}).join('')}</svg>`
  },
  {
    id: 'b11', name: 'Anemone', nameHe: 'כלנית', category: 'botanical', free: true, tags: ['flower', 'purple', 'israel'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><g fill="#7A5C9B">${Array.from({length:6}, (_,i) => {const a=i*60*Math.PI/180;const cx=30+12*Math.cos(a);const cy=30+12*Math.sin(a);return `<ellipse cx="${cx}" cy="${cy}" rx="5.5" ry="9" transform="rotate(${i*60} ${cx} ${cy})" fill="#7A5C9B"/>`;}).join('')}</g><circle cx="30" cy="30" r="7" fill="#1A0F07"/><circle cx="30" cy="30" r="4" fill="#2C1A0E"/><path d="M30 42 L30 54" stroke="#6B7340" stroke-width="2.5"/></svg>`
  },
  {
    id: 'b12', name: 'Lotus', nameHe: 'לוטוס', category: 'botanical', free: true, tags: ['flower', 'peace', 'mindful'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 36 Q24 24 20 18 Q24 14 30 16 Q36 14 40 18 Q36 24 30 36Z" fill="#F4C2C2"/><path d="M30 36 Q18 30 14 24 Q16 18 22 20 Q26 24 30 36Z" fill="#E88DA8"/><path d="M30 36 Q42 30 46 24 Q44 18 38 20 Q34 24 30 36Z" fill="#E88DA8"/><path d="M30 36 Q20 38 16 34 Q16 28 22 28 Q26 30 30 36Z" fill="#D4728E"/><path d="M30 36 Q40 38 44 34 Q44 28 38 28 Q34 30 30 36Z" fill="#D4728E"/><path d="M30 36 L30 50" stroke="#6B7340" stroke-width="2"/><path d="M14 48 Q22 42 30 50 Q38 42 46 48" stroke="#6B7340" stroke-width="1.5" fill="none"/></svg>`
  },

  // ── WASHI TAPE ──────────────────────────────────────────
  {
    id: 'w01', name: 'Washi Floral', nameHe: 'וואשי פרחוני', category: 'washi', free: true, tags: ['washi', 'tape', 'floral'],
    svg: `<svg viewBox="0 0 120 24" fill="none"><rect width="120" height="24" fill="#E88DA8" opacity="0.6"/><rect width="120" height="24" fill="none" stroke="#D4728E" stroke-width="0.5" opacity="0.4"/>${Array.from({length:8}, (_,i) => `<circle cx="${8+i*15}" cy="12" r="4" fill="#FAF5EB" opacity="0.8"/><circle cx="${8+i*15}" cy="12" r="2" fill="#D4728E" opacity="0.6"/>`).join('')}</svg>`
  },
  {
    id: 'w02', name: 'Washi Stripe', nameHe: 'וואשי פסים', category: 'washi', free: true, tags: ['washi', 'tape', 'stripes'],
    svg: `<svg viewBox="0 0 120 20" fill="none"><rect width="120" height="20" fill="#D4A94A" opacity="0.5"/>${Array.from({length:12}, (_,i) => `<rect x="${i*10}" y="0" width="5" height="20" fill="#B8860B" opacity="0.25"/>`).join('')}</svg>`
  },
  {
    id: 'w03', name: 'Washi Dots', nameHe: 'וואשי נקודות', category: 'washi', free: true, tags: ['washi', 'tape', 'dots'],
    svg: `<svg viewBox="0 0 120 20" fill="none"><rect width="120" height="20" fill="#9BA87D" opacity="0.6"/>${Array.from({length:10}, (_,i) => `<circle cx="${6+i*12}" cy="10" r="4" fill="#FAF5EB" opacity="0.7"/>`).join('')}</svg>`
  },
  {
    id: 'w04', name: 'Washi Botanical', nameHe: 'וואשי בוטני', category: 'washi', free: true, tags: ['washi', 'tape', 'botanical'],
    svg: `<svg viewBox="0 0 120 22" fill="none"><rect width="120" height="22" fill="#F5EDE0"/>${Array.from({length:6}, (_,i) => `<path d="${12+i*20} 11 Q${16+i*20} 7 ${20+i*20} 11 Q${16+i*20} 15 ${12+i*20} 11" fill="#6B7340" opacity="0.7"/>`).join('')}</svg>`
  },

  // ── SEASONAL — AUTUMN ──────────────────────────────────
  {
    id: 's01', name: 'Maple Leaf', nameHe: 'עלה מייפל', category: 'seasonal', free: true, season: 'autumn', tags: ['autumn', 'leaf', 'fall'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 8 L34 18 L44 14 L38 22 L50 24 L40 28 L46 38 L34 32 L32 44 L28 32 L16 38 L22 28 L12 24 L24 22 L18 14 L28 18 Z" fill="#C4541C"/><path d="M30 44 L30 56" stroke="#6B4426" stroke-width="2.5"/><path d="M30 8 L30 44" stroke="#B8450F" stroke-width="1" opacity="0.5"/></svg>`
  },
  {
    id: 's02', name: 'Acorn', nameHe: 'בלוט', category: 'seasonal', free: true, season: 'autumn', tags: ['autumn', 'acorn', 'nature'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="36" rx="12" ry="15" fill="#9B6B3A"/><ellipse cx="30" cy="22" rx="14" ry="8" fill="#6B4426"/><rect x="28" y="14" width="4" height="8" rx="2" fill="#5A3518"/><path d="M24 24 Q30 28 36 24" stroke="#5A3518" stroke-width="1" fill="none" opacity="0.5"/></svg>`
  },
  {
    id: 's03', name: 'Pumpkin', nameHe: 'דלעת', category: 'seasonal', free: true, season: 'autumn', tags: ['autumn', 'pumpkin', 'halloween'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="36" rx="10" ry="14" fill="#D46B30"/><ellipse cx="20" cy="36" rx="8" ry="12" fill="#C4541C"/><ellipse cx="40" cy="36" rx="8" ry="12" fill="#C4541C"/><ellipse cx="14" cy="36" rx="6" ry="10" fill="#D46B30"/><ellipse cx="46" cy="36" rx="6" ry="10" fill="#D46B30"/><rect x="28" y="22" width="4" height="10" rx="2" fill="#6B4426"/><path d="M30 22 Q26 18 22 20" stroke="#6B7340" stroke-width="2" fill="none"/></svg>`
  },
  {
    id: 's04', name: 'Mushroom', nameHe: 'פטריה', category: 'seasonal', free: true, season: 'autumn', tags: ['autumn', 'mushroom', 'forest'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="28" rx="18" ry="14" fill="#B83A2E"/><path d="M12 28 Q30 18 48 28" fill="#9B2E24"/><ellipse cx="24" cy="24" rx="3" ry="2" fill="#FAF5EB" opacity="0.8"/><ellipse cx="36" cy="22" rx="2.5" ry="1.8" fill="#FAF5EB" opacity="0.8"/><ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#FAF5EB" opacity="0.7"/><rect x="26" y="40" width="8" height="14" rx="4" fill="#F5EDE0"/><ellipse cx="30" cy="54" rx="6" ry="2" fill="#E8DCC8"/></svg>`
  },
  {
    id: 's05', name: 'Coffee Cup', nameHe: 'ספל קפה', category: 'seasonal', free: true, season: 'autumn', tags: ['coffee', 'cozy', 'warm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="14" y="26" width="28" height="22" rx="4" fill="#8B4513"/><path d="M42 32 Q50 32 50 38 Q50 44 42 44" stroke="#6B3410" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="14" y="22" width="28" height="6" rx="2" fill="#6B3410"/><path d="M22 14 Q22 8 26 10 Q26 6 30 8 Q30 4 34 6 Q34 10 38 14" stroke="#9BA87D" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6"/></svg>`
  },
  {
    id: 's06', name: 'Candle', nameHe: 'נר', category: 'seasonal', free: true, season: 'autumn', tags: ['candle', 'cozy', 'warm', 'light'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="22" y="28" width="16" height="26" rx="3" fill="#F5EDE0"/><rect x="22" y="28" width="16" height="4" rx="2" fill="#E8DCC8"/><rect x="29" y="20" width="2" height="10" rx="1" fill="#6B4426"/><ellipse cx="30" cy="18" rx="5" ry="6" fill="#D4A94A" opacity="0.8"/><ellipse cx="30" cy="16" rx="3" ry="4" fill="#E5A540"/><ellipse cx="30" cy="14" rx="2" ry="3" fill="#FAF5EB" opacity="0.9"/><ellipse cx="30" cy="52" rx="8" ry="3" fill="#E8DCC8"/></svg>`
  },
  {
    id: 's07', name: 'Pine Cone', nameHe: 'אצטרובל', category: 'seasonal', free: true, season: 'autumn', tags: ['pine', 'forest', 'nature'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="36" rx="12" ry="20" fill="#8B5E3C"/>${Array.from({length:5}, (_,i) => `<path d="M${18+i*0.5} ${20+i*5} Q30 ${16+i*5} ${42-i*0.5} ${20+i*5}" stroke="#6B4426" stroke-width="1" fill="none"/>`).join('')}<path d="M28 16 L32 16 L30 10 Z" fill="#6B4426"/></svg>`
  },

  // ── SEASONAL — WINTER ──────────────────────────────────
  {
    id: 'w05', name: 'Snowflake', nameHe: 'פתית שלג', category: 'seasonal', free: true, season: 'winter', tags: ['winter', 'snow', 'cold'],
    svg: `<svg viewBox="0 0 60 60" fill="none">${Array.from({length:6}, (_,i) => {const a=i*60*Math.PI/180;const x2=30+22*Math.cos(a);const y2=30+22*Math.sin(a);const mx=30+12*Math.cos(a);const my=30+12*Math.sin(a);const px1=mx+6*Math.cos((a+90)*Math.PI/180);const py1=my+6*Math.sin((a+90)*Math.PI/180);const px2=mx-6*Math.cos((a+90)*Math.PI/180);const py2=my-6*Math.sin((a+90)*Math.PI/180);return `<line x1="30" y1="30" x2="${x2}" y2="${y2}" stroke="#A8B5C2" stroke-width="2"/><line x1="${px1}" y1="${py1}" x2="${px2}" y2="${py2}" stroke="#A8B5C2" stroke-width="1.5"/>`;}).join('')}<circle cx="30" cy="30" r="4" fill="#C4CDD4"/></svg>`
  },
  {
    id: 'w06', name: 'Star', nameHe: 'כוכב', category: 'seasonal', free: true, season: 'winter', tags: ['star', 'night', 'winter'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 8 L34 22 L48 22 L37 31 L41 45 L30 36 L19 45 L23 31 L12 22 L26 22 Z" fill="#D4A94A"/><path d="M30 8 L30 36" stroke="#B8860B" stroke-width="1" opacity="0.4"/></svg>`
  },

  // ── SEASONAL — SPRING ──────────────────────────────────
  {
    id: 'sp01', name: 'Butterfly', nameHe: 'פרפר', category: 'seasonal', free: true, season: 'spring', tags: ['butterfly', 'spring', 'colorful'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 30 Q16 20 10 28 Q6 36 16 38 Q24 40 30 30Z" fill="#E88DA8" opacity="0.85"/><path d="M30 30 Q44 20 50 28 Q54 36 44 38 Q36 40 30 30Z" fill="#E88DA8" opacity="0.85"/><path d="M30 30 Q18 34 14 42 Q12 50 20 48 Q28 46 30 30Z" fill="#D4728E" opacity="0.75"/><path d="M30 30 Q42 34 46 42 Q48 50 40 48 Q32 46 30 30Z" fill="#D4728E" opacity="0.75"/><ellipse cx="30" cy="30" rx="3" ry="8" fill="#1A0F07"/><circle cx="28" cy="23" r="1.5" fill="#1A0F07"/><circle cx="32" cy="23" r="1.5" fill="#1A0F07"/></svg>`
  },
  {
    id: 'sp02', name: 'Bee', nameHe: 'דבורה', category: 'seasonal', free: true, season: 'spring', tags: ['bee', 'spring', 'honey'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="34" rx="12" ry="16" fill="#D4A94A"/><ellipse cx="30" cy="28" rx="10" ry="8" fill="#1A0F07"/>${Array.from({length:3}, (_,i) => `<rect x="20" y="${32+i*7}" width="20" height="3.5" rx="1.5" fill="#1A0F07" opacity="0.6"/>`).join('')}<ellipse cx="22" cy="26" rx="8" ry="5" fill="#E8F4F8" opacity="0.7" transform="rotate(-20 22 26)"/><ellipse cx="38" cy="26" rx="8" ry="5" fill="#E8F4F8" opacity="0.7" transform="rotate(20 38 26)"/><circle cx="26" cy="20" r="2" fill="#1A0F07"/><circle cx="34" cy="20" r="2" fill="#1A0F07"/></svg>`
  },
  {
    id: 'sp03', name: 'Rainbow', nameHe: 'קשת', category: 'seasonal', free: true, season: 'spring', tags: ['rainbow', 'spring', 'colorful', 'happy'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M8 44 Q8 18 30 18 Q52 18 52 44" stroke="#E83030" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M12 44 Q12 22 30 22 Q48 22 48 44" stroke="#E5A540" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M16 44 Q16 26 30 26 Q44 26 44 44" stroke="#F4C542" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M20 44 Q20 30 30 30 Q40 30 40 44" stroke="#6B7340" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M24 44 Q24 34 30 34 Q36 34 36 44" stroke="#5BA89B" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M28 44 Q28 38 30 38 Q32 38 32 44" stroke="#7A5C9B" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="48" rx="8" ry="5" fill="#F5F0E8"/><ellipse cx="46" cy="48" rx="8" ry="5" fill="#F5F0E8"/></svg>`
  },

  // ── MOOD ──────────────────────────────────────────────
  {
    id: 'm01', name: 'Heart', nameHe: 'לב', category: 'mood', free: true, tags: ['love', 'heart', 'warm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 48 Q10 36 10 22 Q10 12 20 12 Q26 12 30 18 Q34 12 40 12 Q50 12 50 22 Q50 36 30 48Z" fill="#8B2635"/><path d="M30 48 Q10 36 10 22" stroke="#6B1C28" stroke-width="1" opacity="0.3"/></svg>`
  },
  {
    id: 'm02', name: 'Smiley', nameHe: 'שמחה', category: 'mood', free: true, tags: ['happy', 'smile', 'mood'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="22" fill="#D4A94A"/><circle cx="22" cy="26" r="3.5" fill="#1A0F07"/><circle cx="38" cy="26" r="3.5" fill="#1A0F07"/><circle cx="23" cy="25" r="1.5" fill="#FAF5EB" opacity="0.6"/><path d="M20 36 Q30 44 40 36" stroke="#1A0F07" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`
  },
  {
    id: 'm03', name: 'Gratitude', nameHe: 'תודה', category: 'mood', free: true, tags: ['gratitude', 'thankful', 'positive'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 48 Q14 40 14 26 Q14 16 22 16 Q27 16 30 22 Q33 16 38 16 Q46 16 46 26 Q46 40 30 48Z" fill="#E88DA8"/><text x="30" y="35" text-anchor="middle" font-size="12" fill="#FAF5EB" font-family="serif">♡</text></svg>`
  },
  {
    id: 'm04', name: 'Star Mood', nameHe: 'מצוין', category: 'mood', free: true, tags: ['star', 'excellent', 'proud'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 10 L34 22 L48 22 L37 30 L41 44 L30 35 L19 44 L23 30 L12 22 L26 22 Z" fill="#D4A94A" stroke="#B8860B" stroke-width="1.5"/></svg>`
  },
  {
    id: 'm05', name: 'Moon', nameHe: 'ירח', category: 'mood', free: true, tags: ['moon', 'night', 'calm', 'tired'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M38 12 Q22 16 20 30 Q18 44 32 50 Q14 52 10 36 Q6 18 22 12 Q30 9 38 12Z" fill="#D4A94A"/><circle cx="36" cy="22" r="3" fill="#F5EDE0" opacity="0.6"/><circle cx="28" cy="18" r="2" fill="#F5EDE0" opacity="0.4"/></svg>`
  },
  {
    id: 'm06', name: 'Rainbow Heart', nameHe: 'לב קשת', category: 'mood', free: true, tags: ['love', 'rainbow', 'colorful'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 48 Q10 36 10 22 Q10 12 20 12 Q26 12 30 18 Q34 12 40 12 Q50 12 50 22 Q50 36 30 48Z" fill="url(#rh)"/><defs><linearGradient id="rh" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#E83030"/><stop offset="33%" stop-color="#E5A540"/><stop offset="66%" stop-color="#6B7340"/><stop offset="100%" stop-color="#7A5C9B"/></linearGradient></defs></svg>`
  },

  // ── FAMILY ──────────────────────────────────────────────
  {
    id: 'f01', name: 'House', nameHe: 'בית', category: 'family', free: true, tags: ['home', 'family', 'warm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 28 L30 10 L50 28" fill="#C4541C" stroke="#9B3D15" stroke-width="1.5"/><rect x="14" y="28" width="32" height="26" fill="#F5EDE0" stroke="#D4846A" stroke-width="1.5"/><rect x="24" y="36" width="12" height="18" rx="2" fill="#6B7340"/><rect x="24" y="36" width="12" height="18" rx="2" fill="#5A6330" opacity="0.3"/><rect x="16" y="32" width="8" height="8" rx="1" fill="#A8C5D8"/><rect x="36" y="32" width="8" height="8" rx="1" fill="#A8C5D8"/></svg>`
  },
  {
    id: 'f02', name: 'Camera', nameHe: 'מצלמה', category: 'family', free: true, tags: ['photo', 'memory', 'family'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="8" y="20" width="44" height="32" rx="6" fill="#3D2E20"/><rect x="8" y="20" width="44" height="6" rx="3" fill="#2C1E10"/><path d="M22 16 L26 20 L34 20 L38 16 Z" fill="#3D2E20"/><circle cx="30" cy="36" r="10" fill="#2C1E10"/><circle cx="30" cy="36" r="7" fill="#4A3A28"/><circle cx="30" cy="36" r="5" fill="#1A1410"/><circle cx="33" cy="33" r="2" fill="#FAF5EB" opacity="0.3"/><circle cx="16" cy="24" r="2" fill="#D4A94A"/></svg>`
  },
  {
    id: 'f03', name: 'Puzzle', nameHe: 'פאזל', category: 'family', free: true, tags: ['family', 'game', 'together'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="10" y="10" width="17" height="17" rx="2" fill="#C4541C"/><path d="M27 18 Q32 18 32 22 Q32 26 27 26" fill="#F5EDE0"/><rect x="10" y="33" width="17" height="17" rx="2" fill="#6B7340"/><path d="M19 33 Q19 28 23 28 Q27 28 27 33" fill="#F5EDE0"/><rect x="33" y="10" width="17" height="17" rx="2" fill="#D4A94A"/><path d="M41 27 Q41 32 37 32 Q33 32 33 27" fill="#F5EDE0"/><rect x="33" y="33" width="17" height="17" rx="2" fill="#8B2635"/><path d="M33 41 Q28 41 28 37 Q28 33 33 33" fill="#F5EDE0"/></svg>`
  },

  // ── FOOD ──────────────────────────────────────────────
  {
    id: 'fd01', name: 'Ice Cream', nameHe: 'גלידה', category: 'food', free: true, tags: ['sweet', 'summer', 'fun'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M20 36 L30 56 L40 36 Z" fill="#D4A94A" stroke="#B8860B" stroke-width="1"/><ellipse cx="30" cy="30" rx="14" ry="10" fill="#F4C2C2"/><ellipse cx="22" cy="28" rx="10" ry="8" fill="#E88DA8"/><ellipse cx="38" cy="28" rx="10" ry="8" fill="#F4C2C2"/><ellipse cx="30" cy="22" rx="10" ry="8" fill="#FAF5EB"/><circle cx="26" cy="22" r="2" fill="#D4A94A"/><circle cx="34" cy="24" r="1.5" fill="#C4541C"/><circle cx="30" cy="18" r="3" fill="#8B2635"/></svg>`
  },
  {
    id: 'fd02', name: 'Bread', nameHe: 'לחם / שבת', category: 'food', free: true, tags: ['challah', 'shabbat', 'bread'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="38" rx="22" ry="14" fill="#D4A94A"/><path d="M10 36 Q20 24 30 28 Q40 24 50 36" fill="#C4541C"/><path d="M14 34 Q22 28 30 32 Q38 28 46 34" fill="#B8860B" opacity="0.4"/></svg>`
  },
  {
    id: 'fd03', name: 'Wine', nameHe: 'יין', category: 'food', free: true, tags: ['wine', 'shabbat', 'celebration'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M22 10 Q18 22 22 30 Q26 36 30 36 Q34 36 38 30 Q42 22 38 10 Z" fill="#8B2635"/><path d="M22 10 Q26 18 30 20 Q34 18 38 10" stroke="#6B1C28" stroke-width="1" opacity="0.5"/><rect x="28" y="36" width="4" height="14" fill="#6B1C28"/><ellipse cx="30" cy="52" rx="10" ry="3" fill="#6B1C28"/></svg>`
  },
  {
    id: 'fd04', name: 'Tea', nameHe: 'תה', category: 'food', free: true, tags: ['tea', 'cozy', 'warm', 'calm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="16" y="28" width="28" height="20" rx="5" fill="#9BA87D"/><path d="M44 34 Q52 34 52 40 Q52 46 44 46" stroke="#6B7340" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="30" cy="28" rx="14" ry="4" fill="#8FA880"/><path d="M24 18 Q24 12 28 14 Q28 10 32 12 Q32 8 36 10 Q36 16 36 18" stroke="#9BA87D" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/><rect x="22" y="46" width="16" height="4" rx="2" fill="#8FA880"/></svg>`
  },

  // ── VINTAGE ──────────────────────────────────────────────
  {
    id: 'v01', name: 'Polaroid', nameHe: 'פולרואיד', category: 'vintage', free: true, tags: ['photo', 'vintage', 'memory'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="10" y="8" width="40" height="46" rx="3" fill="#FAF5EB"/><rect x="10" y="8" width="40" height="46" rx="3" stroke="#E8DCC8" stroke-width="1.5"/><rect x="14" y="12" width="32" height="28" rx="2" fill="#D4A94A" opacity="0.3"/><rect x="14" y="12" width="32" height="28" rx="2" fill="url(#pol)"/><defs><linearGradient id="pol" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C4541C" stop-opacity="0.6"/><stop offset="100%" stop-color="#8B2635" stop-opacity="0.4"/></linearGradient></defs></svg>`
  },
  {
    id: 'v02', name: 'Ribbon', nameHe: 'סרט', category: 'vintage', free: true, tags: ['ribbon', 'decoration', 'vintage'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 24 Q30 18 50 24 L50 36 Q30 42 10 36 Z" fill="#8B2635"/><path d="M30 24 L30 36" stroke="#6B1C28" stroke-width="1" opacity="0.4"/><path d="M10 24 Q10 30 10 36" stroke="#6B1C28" stroke-width="1" opacity="0.3"/><path d="M50 24 Q50 30 50 36" stroke="#6B1C28" stroke-width="1" opacity="0.3"/></svg>`
  },
  {
    id: 'v03', name: 'Envelope', nameHe: 'מעטפה', category: 'vintage', free: true, tags: ['letter', 'mail', 'vintage', 'love'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="8" y="16" width="44" height="32" rx="4" fill="#F5EDE0" stroke="#D4A94A" stroke-width="1.5"/><path d="M8 16 L30 34 L52 16" stroke="#D4A94A" stroke-width="1.5" fill="none"/><path d="M8 48 L24 34 M52 48 L36 34" stroke="#D4A94A" stroke-width="1" fill="none" opacity="0.5"/><circle cx="30" cy="34" r="4" fill="#8B2635"/></svg>`
  },
  {
    id: 'v04', name: 'Key', nameHe: 'מפתח', category: 'vintage', free: true, tags: ['key', 'vintage', 'secret'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="22" cy="26" r="12" stroke="#D4A94A" stroke-width="3" fill="none"/><circle cx="22" cy="26" r="6" stroke="#D4A94A" stroke-width="2" fill="none"/><path d="M30 30 L50 50" stroke="#D4A94A" stroke-width="3" stroke-linecap="round"/><rect x="40" y="44" width="8" height="4" rx="1" fill="#D4A94A"/><rect x="44" y="48" width="4" height="6" rx="1" fill="#D4A94A"/></svg>`
  },
  {
    id: 'v05', name: 'Bookmark', nameHe: 'סימנייה', category: 'vintage', free: true, tags: ['book', 'reading', 'vintage'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M18 10 L42 10 L42 50 L30 42 L18 50 Z" fill="#8B2635"/><path d="M22 14 L38 14 L38 46 L30 40 L22 46 Z" fill="none" stroke="#FAF5EB" stroke-width="1" opacity="0.3"/><path d="M24 24 L36 24 M24 30 L34 30" stroke="#FAF5EB" stroke-width="1.5" opacity="0.6"/></svg>`
  },

  // ── TRAVEL ──────────────────────────────────────────────
  {
    id: 't01', name: 'Italy', nameHe: 'איטליה', category: 'travel', free: true, tags: ['italy', 'travel', 'vacation'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="12" y="14" width="12" height="36" fill="#6B7340"/><rect x="24" y="14" width="12" height="36" fill="#FAF5EB"/><rect x="36" y="14" width="12" height="36" fill="#8B2635"/><path d="M10 12 L50 12 L50 14 L10 14 Z" fill="#3D2E20"/><path d="M10 48 L50 48 L50 50 L10 50 Z" fill="#3D2E20"/><path d="M30 8 L30 12" stroke="#3D2E20" stroke-width="2"/><circle cx="30" cy="7" r="3" fill="#D4A94A"/></svg>`
  },
  {
    id: 't02', name: 'Airplane', nameHe: 'מטוס', category: 'travel', free: true, tags: ['travel', 'airplane', 'vacation'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 32 L38 24 L48 28 Q52 30 48 32 Q44 34 38 32 L10 32 Z" fill="#A8B5C2"/><path d="M38 24 L44 14 L48 18 L42 28" fill="#C4CDD4"/><path d="M22 32 L20 42 L28 40 L30 32" fill="#C4CDD4"/><circle cx="46" cy="30" r="3" fill="#E8F4F8"/></svg>`
  },
  {
    id: 't03', name: 'Map Pin', nameHe: 'מיקום', category: 'travel', free: true, tags: ['location', 'travel', 'adventure'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 10 Q18 10 18 24 Q18 36 30 52 Q42 36 42 24 Q42 10 30 10Z" fill="#8B2635"/><circle cx="30" cy="24" r="7" fill="#FAF5EB"/><circle cx="30" cy="24" r="4" fill="#8B2635" opacity="0.3"/></svg>`
  },
  {
    id: 't04', name: 'Suitcase', nameHe: 'מזוודה', category: 'travel', free: true, tags: ['travel', 'vacation', 'trip'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="12" y="22" width="36" height="28" rx="4" fill="#C4541C"/><rect x="12" y="22" width="36" height="8" rx="2" fill="#9B3D15"/><rect x="22" y="14" width="16" height="10" rx="3" fill="none" stroke="#9B3D15" stroke-width="2.5"/><rect x="27" y="22" width="6" height="28" fill="#9B3D15" opacity="0.4"/><circle cx="20" cy="52" r="3" fill="#6B3410"/><circle cx="40" cy="52" r="3" fill="#6B3410"/></svg>`
  },

  // ── MORE BOTANICAL ──────────────────────────────────────
  {
    id: 'b13', name: 'Succulent', nameHe: 'סוקולנטה', category: 'botanical', free: true, tags: ['succulent', 'plant', 'cute'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="42" rx="14" ry="8" fill="#8FA880"/><ellipse cx="30" cy="36" rx="10" ry="7" fill="#6B7340"/><ellipse cx="24" cy="32" rx="7" ry="5" fill="#8FA880" transform="rotate(-20 24 32)"/><ellipse cx="36" cy="32" rx="7" ry="5" fill="#8FA880" transform="rotate(20 36 32)"/><ellipse cx="26" cy="26" rx="5" ry="4" fill="#9BA87D" transform="rotate(-30 26 26)"/><ellipse cx="34" cy="26" rx="5" ry="4" fill="#9BA87D" transform="rotate(30 34 26)"/><ellipse cx="30" cy="22" rx="5" ry="6" fill="#6B7340"/><ellipse cx="30" cy="52" rx="8" ry="3" fill="#6B4426"/></svg>`
  },
  {
    id: 'b14', name: 'Cactus', nameHe: 'קקטוס', category: 'botanical', free: true, tags: ['cactus', 'desert', 'cute'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="24" y="18" width="12" height="34" rx="6" fill="#6B7340"/><rect x="14" y="28" width="12" height="16" rx="6" fill="#8FA880"/><path d="M26 32 Q20 30 14 32" fill="none" stroke="#6B7340" stroke-width="2"/><rect x="34" y="24" width="12" height="14" rx="6" fill="#8FA880"/><path d="M34 28 Q40 26 46 28" fill="none" stroke="#6B7340" stroke-width="2"/><ellipse cx="30" cy="52" rx="8" ry="3" fill="#9B6B3A"/><circle cx="30" cy="18" r="4" fill="#E88DA8"/><path d="M28 15 L30 10 L32 15" fill="#E88DA8"/></svg>`
  },
  {
    id: 'b15', name: 'Wheat', nameHe: 'שיבולת', category: 'botanical', free: true, tags: ['wheat', 'harvest', 'autumn', 'field'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 54 L30 16" stroke="#D4A94A" stroke-width="2.5" stroke-linecap="round"/><path d="M30 16 Q24 10 22 6" stroke="#D4A94A" stroke-width="1.5" fill="none"/><path d="M30 16 Q36 10 38 6" stroke="#D4A94A" stroke-width="1.5" fill="none"/>${Array.from({length:5}, (_,i) => `<ellipse cx="${22}" cy="${20+i*6}" rx="5" ry="2.5" fill="#D4A94A" transform="rotate(-30 22 ${20+i*6})"/><ellipse cx="${38}" cy="${22+i*6}" rx="5" ry="2.5" fill="#C4941A" transform="rotate(30 38 ${22+i*6})"/>`).join('')}</svg>`
  },
  {
    id: 'b16', name: 'Clover', nameHe: 'תלתן', category: 'botanical', free: true, tags: ['clover', 'luck', 'green', 'nature'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="24" r="10" fill="#6B7340"/><circle cx="20" cy="32" r="10" fill="#8FA880"/><circle cx="40" cy="32" r="10" fill="#6B7340"/><circle cx="30" cy="40" r="10" fill="#8FA880"/><circle cx="30" cy="32" r="6" fill="#9BA87D"/><path d="M30 42 L30 56" stroke="#5A6330" stroke-width="2.5"/></svg>`
  },
  {
    id: 'b17', name: 'Dandelion', nameHe: 'שן הארי', category: 'botanical', free: true, tags: ['dandelion', 'wish', 'spring', 'magic'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="4" fill="#D4A94A"/><path d="M30 54 L30 34" stroke="#6B7340" stroke-width="2"/>${Array.from({length:12}, (_,i) => {const a=i*30*Math.PI/180;const x=30+20*Math.cos(a);const y=30+20*Math.sin(a);return `<path d="M30 30 L${x} ${y}" stroke="#A09080" stroke-width="1" opacity="0.7"/><circle cx="${x}" cy="${y}" r="2.5" fill="#E8DCC8" opacity="0.8"/>`;}).join('')}</svg>`
  },
];

export function getStickerById(id: string): Sticker | undefined {
  return STICKERS.find(s => s.id === id);
}

export function getStickersByCategory(category: string): Sticker[] {
  if (category === 'all') return STICKERS.filter(s => s.free);
  return STICKERS.filter(s => s.category === category && s.free);
}

export function searchStickers(query: string): Sticker[] {
  const q = query.toLowerCase();
  return STICKERS.filter(s =>
    s.free && (
      s.name.toLowerCase().includes(q) ||
      s.nameHe.includes(q) ||
      s.tags.some(t => t.includes(q))
    )
  );
}

// ── ADDITIONAL 25 STICKERS ──────────────────────────────
export const EXTRA_STICKERS: Sticker[] = [
  {
    id: 'x01', name: 'Cherry Blossom', nameHe: 'דובדבן פורח', category: 'botanical', free: true, tags: ['cherry', 'spring', 'japan', 'pink'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 50 L30 28" stroke="#8B5E3C" stroke-width="2.5"/><path d="M30 38 Q22 34 16 36" stroke="#8B5E3C" stroke-width="1.5" fill="none"/><path d="M30 32 Q38 28 44 30" stroke="#8B5E3C" stroke-width="1.5" fill="none"/><g fill="#F4C2C2">${Array.from({length:5},(_,i)=>{const a=i*72*Math.PI/180;return `<ellipse cx="${18+14*Math.cos(a)}" cy="${16+10*Math.sin(a)}" rx="5" ry="7" transform="rotate(${i*72} ${18+14*Math.cos(a)} ${16+10*Math.sin(a)})" fill="#F4C2C2"/>`}).join('')}</g><circle cx="18" cy="16" r="3" fill="#D4A94A"/><g fill="#E88DA8">${Array.from({length:5},(_,i)=>{const a=i*72*Math.PI/180;return `<ellipse cx="${42+12*Math.cos(a)}" cy="${24+9*Math.sin(a)}" rx="4" ry="6" transform="rotate(${i*72} ${42+12*Math.cos(a)} ${24+9*Math.sin(a)})" fill="#E88DA8"/>`}).join('')}</g><circle cx="42" cy="24" r="2.5" fill="#D4A94A"/></svg>`
  },
  {
    id: 'x02', name: 'Hydrangea', nameHe: 'הורטנזיה', category: 'botanical', free: true, tags: ['flower', 'blue', 'garden'],
    svg: `<svg viewBox="0 0 60 60" fill="none">${Array.from({length:9},(_,i)=>{const a=i*40*Math.PI/180;const r=i<3?6:i<6?14:20;const x=30+r*Math.cos(a);const y=28+r*Math.sin(a);return `<circle cx="${x}" cy="${y}" r="5" fill="${i%3===0?'#7A8DC4':i%3===1?'#9BA8D4':'#B5BEE0'}"/><circle cx="${x}" cy="${y}" r="2" fill="#FAF5EB" opacity="0.6"/>`;}).join('')}</svg>`
  },
  {
    id: 'x03', name: 'Peony', nameHe: 'פיאוניה', category: 'botanical', free: true, tags: ['flower', 'pink', 'luxury'],
    svg: `<svg viewBox="0 0 60 60" fill="none">${Array.from({length:5},(_,i)=>{const a=i*72*Math.PI/180;const x=30+10*Math.cos(a);const y=28+10*Math.sin(a);return `<circle cx="${x}" cy="${y}" r="9" fill="#D4728E" opacity="0.85"/>`;}).join('')}<circle cx="30" cy="28" r="10" fill="#E88DA8"/>${Array.from({length:5},(_,i)=>{const a=i*72*Math.PI/180;const x=30+5*Math.cos(a);const y=28+5*Math.sin(a);return `<circle cx="${x}" cy="${y}" r="5" fill="#F4C2C2"/>`;}).join('')}<circle cx="30" cy="28" r="4" fill="#FAF5EB"/><path d="M30 40 L30 54" stroke="#6B7340" stroke-width="2.5"/></svg>`
  },
  {
    id: 'x04', name: 'Iris', nameHe: 'אירוס', category: 'botanical', free: true, tags: ['flower', 'purple', 'israel', 'iris'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 34 Q20 28 16 18 Q20 12 26 16 Q28 22 30 26 Q32 22 34 16 Q40 12 44 18 Q40 28 30 34Z" fill="#7A5C9B"/><path d="M30 34 Q18 36 14 30 Q12 24 18 22 Q24 24 28 30 Q32 24 42 22 Q48 24 46 30 Q42 36 30 34Z" fill="#9B7DC4"/><circle cx="30" cy="30" r="4" fill="#D4A94A"/><path d="M30 34 L30 52" stroke="#6B7340" stroke-width="2.5"/></svg>`
  },
  {
    id: 'x05', name: 'Morning Glory', nameHe: 'נבעת הבוקר', category: 'botanical', free: true, tags: ['flower', 'morning', 'blue', 'vine'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 50 Q14 40 22 36 Q30 32 38 36 Q46 40 50 50" stroke="#6B7340" stroke-width="1.5" fill="none"/><path d="M22 36 Q18 28 20 20 Q24 14 30 16 Q36 14 40 20 Q42 28 38 36" stroke="#7A8DC4" stroke-width="1" fill="none"/><path d="M30 34 Q22 28 20 20 Q24 12 30 14 Q36 12 40 20 Q38 28 30 34Z" fill="#7A8DC4" opacity="0.85"/><circle cx="30" cy="24" r="5" fill="#FAF5EB"/><circle cx="30" cy="24" r="2.5" fill="#D4A94A"/></svg>`
  },
  {
    id: 'x06', name: 'Wisteria', nameHe: 'וויסטריה', category: 'botanical', free: true, tags: ['flower', 'purple', 'hanging', 'spring'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M8 10 Q20 8 32 12 Q44 8 52 10" stroke="#6B4426" stroke-width="2" fill="none"/><path d="M20 10 Q22 18 20 26 Q18 34 20 42" stroke="#6B4426" stroke-width="1.5" fill="none"/><path d="M32 12 Q34 20 32 30 Q30 38 32 46" stroke="#6B4426" stroke-width="1.5" fill="none"/>${Array.from({length:12},(_,i)=>{const x=14+i*3;const y=18+i*2.5+(i%2===0?0:4);return `<circle cx="${x}" cy="${y}" r="3" fill="${i%3===0?'#A899B5':i%3===1?'#C4B5D4':'#8B7A9B'}" opacity="0.85"/>`;}).join('')}</svg>`
  },
  {
    id: 'x07', name: 'Pine Branch', nameHe: 'ענף אורן', category: 'botanical', free: true, season: 'winter', tags: ['pine', 'winter', 'green', 'forest'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 46 Q20 36 30 26 Q40 16 50 10" stroke="#5A6330" stroke-width="2.5" stroke-linecap="round" fill="none"/>${Array.from({length:7},(_,i)=>{const t=i/6;const px=10+40*t;const py=46-36*t;const off=i%2===0?1:-1;return `<path d="M${px} ${py} Q${px+off*8} ${py-4} ${px+off*14} ${py-8}" stroke="#6B7340" stroke-width="2" fill="none"/><ellipse cx="${px+off*14}" cy="${py-8}" rx="3" ry="4" fill="#8FA880" transform="rotate(${off*20} ${px+off*14} ${py-8})"/>`;}).join('')}</svg>`
  },
  {
    id: 'x08', name: 'Berries', nameHe: 'פירות יער', category: 'botanical', free: true, season: 'autumn', tags: ['berries', 'autumn', 'red', 'wild'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 52 Q20 44 14 36 Q10 28 14 20 Q18 12 24 14 Q28 16 30 20" stroke="#6B7340" stroke-width="1.5" fill="none"/><path d="M30 52 Q40 44 46 36 Q50 28 46 20 Q42 12 36 14 Q32 16 30 20" stroke="#6B7340" stroke-width="1.5" fill="none"/><circle cx="16" cy="22" r="5" fill="#8B2635"/><circle cx="12" cy="30" r="5" fill="#9B2E24"/><circle cx="18" cy="38" r="5" fill="#8B2635"/><circle cx="44" cy="22" r="5" fill="#9B2E24"/><circle cx="48" cy="30" r="5" fill="#8B2635"/><circle cx="42" cy="38" r="5" fill="#9B2E24"/><circle cx="30" cy="44" r="5" fill="#8B2635"/><circle cx="16" cy="22" r="1.5" fill="#FAF5EB" opacity="0.5"/><circle cx="44" cy="22" r="1.5" fill="#FAF5EB" opacity="0.5"/></svg>`
  },
  {
    id: 'x09', name: 'Lemon', nameHe: 'לימון', category: 'food', free: true, tags: ['lemon', 'fresh', 'summer', 'food'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="32" rx="18" ry="16" fill="#F4C542"/><ellipse cx="30" cy="32" rx="18" ry="16" fill="none" stroke="#D4A94A" stroke-width="1.5"/><path d="M30 16 Q26 10 22 8" stroke="#6B7340" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M30 16 Q28 8 30 6" stroke="#6B7340" stroke-width="1.5" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="32" rx="5" ry="8" fill="#F0B830" opacity="0.4"/><path d="M30 24 L30 40 M18 32 L42 32 M21 27 L39 37 M21 37 L39 27" stroke="#F0B830" stroke-width="1" opacity="0.5"/></svg>`
  },
  {
    id: 'x10', name: 'Honey Jar', nameHe: 'צנצנת דבש', category: 'food', free: true, tags: ['honey', 'sweet', 'autumn', 'rosh hashana'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="16" y="24" width="28" height="26" rx="6" fill="#D4A94A"/><ellipse cx="30" cy="24" rx="14" ry="6" fill="#C49040"/><rect x="22" y="16" width="16" height="10" rx="5" fill="#D4A94A"/><rect x="22" y="16" width="16" height="4" rx="2" fill="#C49040"/><path d="M22 36 Q30 32 38 36 Q30 44 22 36Z" fill="#B8860B" opacity="0.4"/></svg>`
  },
  {
    id: 'x11', name: 'Apple', nameHe: 'תפוח', category: 'food', free: true, tags: ['apple', 'rosh hashana', 'fruit', 'red'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 18 Q18 16 14 28 Q10 40 20 50 Q26 56 30 52 Q34 56 40 50 Q50 40 46 28 Q42 16 30 18Z" fill="#C4381C"/><path d="M30 18 Q34 10 38 8" stroke="#6B4426" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M32 8 Q38 6 40 10" stroke="#6B7340" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M16 28 Q18 24 24 22" stroke="#B83015" stroke-width="1.5" fill="none" opacity="0.5"/></svg>`
  },
  {
    id: 'x12', name: 'Croissant', nameHe: 'קרואסון', category: 'food', free: true, tags: ['croissant', 'morning', 'breakfast', 'france'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 36 Q14 22 30 18 Q46 22 50 36 Q46 44 38 42 Q30 46 22 42 Q14 44 10 36Z" fill="#D4A94A"/><path d="M10 36 Q14 28 24 26 Q30 24 36 26 Q46 28 50 36" stroke="#B8860B" stroke-width="1.5" fill="none"/><path d="M18 40 Q24 36 30 38 Q36 36 42 40" stroke="#C49040" stroke-width="1" fill="none" opacity="0.6"/></svg>`
  },
  {
    id: 'x13', name: 'Feather', nameHe: 'נוצה', category: 'vintage', free: true, tags: ['feather', 'write', 'vintage', 'pen'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M14 48 Q22 40 30 30 Q40 18 48 10" stroke="#6B5B4E" stroke-width="1.5" fill="none"/><path d="M48 10 Q42 16 36 24 Q28 34 20 46 Q22 40 30 32 Q38 22 46 12 Z" fill="#E8DCC8"/><path d="M46 12 Q38 20 32 28 Q26 36 22 44" stroke="#D4C9A8" stroke-width="1" fill="none" opacity="0.6"/><path d="M14 48 L18 52" stroke="#6B5B4E" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'x14', name: 'Compass', nameHe: 'מצפן', category: 'travel', free: true, tags: ['compass', 'adventure', 'direction', 'travel'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="20" stroke="#D4A94A" stroke-width="2" fill="#FAF5EB"/><circle cx="30" cy="30" r="18" stroke="#E8DCC8" stroke-width="1" fill="none"/><path d="M30 14 L32 28 L30 30 L28 28 Z" fill="#8B2635"/><path d="M30 46 L32 32 L30 30 L28 32 Z" fill="#3D2E20"/><path d="M14 30 L28 32 L30 30 L28 28 Z" fill="#3D2E20"/><path d="M46 30 L32 28 L30 30 L32 32 Z" fill="#3D2E20"/><circle cx="30" cy="30" r="3" fill="#D4A94A"/><text x="30" y="12" text-anchor="middle" font-size="7" fill="#6B5B4E" font-family="serif">N</text></svg>`
  },
  {
    id: 'x15', name: 'Ticket', nameHe: 'כרטיס', category: 'travel', free: true, tags: ['ticket', 'travel', 'adventure', 'memory'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="6" y="18" width="48" height="26" rx="4" fill="#F5EDE0"/><circle cx="6" cy="31" r="5" fill="#FAF5EB"/><circle cx="54" cy="31" r="5" fill="#FAF5EB"/><path d="M18" stroke="#E8DCC8" stroke-width="1" stroke-dasharray="3 3"/><line x1="20" y1="20" x2="20" y2="42" stroke="#E8DCC8" stroke-width="1" stroke-dasharray="4 3"/><text x="36" y="29" text-anchor="middle" font-size="8" fill="#8B2635" font-family="serif" font-style="italic">ADMIT ONE</text><text x="36" y="39" text-anchor="middle" font-size="10" fill="#3D2E20" font-family="serif">✦ 2026 ✦</text></svg>`
  },
  {
    id: 'x16', name: 'Ship Wheel', nameHe: 'גלגל ספינה', category: 'vintage', free: true, tags: ['nautical', 'vintage', 'adventure', 'wheel'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="20" stroke="#6B4426" stroke-width="2" fill="none"/><circle cx="30" cy="30" r="6" stroke="#6B4426" stroke-width="2" fill="#D4A94A"/>${Array.from({length:8},(_,i)=>{const a=i*45*Math.PI/180;const x1=30+6*Math.cos(a);const y1=30+6*Math.sin(a);const x2=30+20*Math.cos(a);const y2=30+20*Math.sin(a);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#6B4426" stroke-width="1.8"/>`;}).join('')}</svg>`
  },
  {
    id: 'x17', name: 'Clock', nameHe: 'שעון', category: 'vintage', free: true, tags: ['clock', 'time', 'vintage', 'memory'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="22" fill="#F5EDE0" stroke="#D4A94A" stroke-width="2"/><circle cx="30" cy="30" r="19" fill="none" stroke="#E8DCC8" stroke-width="1"/><path d="M30 14 L30 18" stroke="#3D2E20" stroke-width="2" stroke-linecap="round"/><path d="M30 42 L30 46" stroke="#3D2E20" stroke-width="2" stroke-linecap="round"/><path d="M14 30 L18 30" stroke="#3D2E20" stroke-width="2" stroke-linecap="round"/><path d="M42 30 L46 30" stroke="#3D2E20" stroke-width="2" stroke-linecap="round"/><path d="M30 30 L30 22" stroke="#8B2635" stroke-width="2" stroke-linecap="round"/><path d="M30 30 L36 30" stroke="#3D2E20" stroke-width="1.5" stroke-linecap="round"/><circle cx="30" cy="30" r="2" fill="#D4A94A"/></svg>`
  },
  {
    id: 'x18', name: 'Sun', nameHe: 'שמש', category: 'mood', free: true, tags: ['sun', 'happy', 'summer', 'bright'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="12" fill="#E5A540"/>${Array.from({length:8},(_,i)=>{const a=i*45*Math.PI/180;const x1=30+14*Math.cos(a);const y1=30+14*Math.sin(a);const x2=30+22*Math.cos(a);const y2=30+22*Math.sin(a);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E5A540" stroke-width="2.5" stroke-linecap="round"/>`;}).join('')}<circle cx="30" cy="30" r="8" fill="#F4C542"/></svg>`
  },
  {
    id: 'x19', name: 'Cloud', nameHe: 'עננה', category: 'mood', free: true, tags: ['cloud', 'dream', 'soft', 'sky'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="35" rx="20" ry="12" fill="#E8F0F8"/><circle cx="22" cy="32" r="10" fill="#EDF3F9"/><circle cx="36" cy="30" r="12" fill="#EDF3F9"/><circle cx="28" cy="28" r="10" fill="#F0F5FA"/></svg>`
  },
  {
    id: 'x20', name: 'Fire', nameHe: 'אש', category: 'mood', free: true, tags: ['fire', 'passion', 'energy', 'warm'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M30 52 Q18 46 18 34 Q18 26 24 20 Q24 28 28 28 Q24 20 28 10 Q34 18 36 24 Q40 18 40 12 Q46 20 46 32 Q46 46 30 52Z" fill="#C4541C"/><path d="M30 52 Q22 44 22 36 Q22 30 26 26 Q26 32 30 32 Q30 26 32 20 Q36 28 36 34 Q38 28 38 24 Q42 30 42 38 Q42 48 30 52Z" fill="#E5A540"/><path d="M30 52 Q26 46 26 40 Q28 36 30 36 Q32 36 34 40 Q34 46 30 52Z" fill="#FAF5EB" opacity="0.6"/></svg>`
  },
  {
    id: 'x21', name: 'Shooting Star', nameHe: 'כוכב נופל', category: 'mood', free: true, tags: ['star', 'wish', 'night', 'magic'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M14 46 L40 18" stroke="#D4A94A" stroke-width="2" stroke-linecap="round" opacity="0.6"/><path d="M20 48 L42 24" stroke="#E5A540" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><path d="M40 18 L38 24 L44 20 L38 22 Z" fill="#D4A94A"/><circle cx="42" cy="16" r="4" fill="#F4C542"/><circle cx="42" cy="16" r="2.5" fill="#FAF5EB"/><circle cx="20" cy="14" r="1.5" fill="#D4A94A" opacity="0.6"/><circle cx="50" cy="28" r="1" fill="#E5A540" opacity="0.5"/><circle cx="14" cy="20" r="1.5" fill="#D4A94A" opacity="0.4"/></svg>`
  },
  {
    id: 'x22', name: 'Journal', nameHe: 'מחברת', category: 'vintage', free: true, tags: ['journal', 'writing', 'book', 'diary'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><rect x="12" y="8" width="34" height="44" rx="3" fill="#8B2635"/><rect x="8" y="10" width="6" height="40" rx="3" fill="#6B1C28"/><rect x="15" y="12" width="28" height="36" rx="2" fill="#FAF5EB"/><path d="M19 20 L41 20 M19 26 L41 26 M19 32 L41 32 M19 38 L35 38" stroke="#D4A94A" stroke-width="1" opacity="0.5"/><path d="M26 14 Q30 16 34 14" stroke="#D4A94A" stroke-width="1.5" fill="none" opacity="0.7"/></svg>`
  },
  {
    id: 'x23', name: 'Crown', nameHe: 'כתר', category: 'vintage', free: true, tags: ['crown', 'queen', 'proud', 'royal'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><path d="M10 40 L14 20 L24 34 L30 14 L36 34 L46 20 L50 40 Z" fill="#D4A94A"/><path d="M8 40 L52 40 L54 46 L6 46 Z" fill="#C49040"/><circle cx="30" cy="14" r="4" fill="#8B2635"/><circle cx="14" cy="20" r="3" fill="#8B2635"/><circle cx="46" cy="20" r="3" fill="#8B2635"/></svg>`
  },
  {
    id: 'x24', name: 'Dragonfly', nameHe: 'שפירית', category: 'seasonal', free: true, season: 'summer', tags: ['dragonfly', 'summer', 'nature', 'wing'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="30" rx="3" ry="16" fill="#5A8C9B"/><ellipse cx="30" cy="20" rx="3" ry="6" fill="#6BA8B8"/><ellipse cx="22" cy="22" rx="11" ry="6" fill="#A8D8E8" opacity="0.7" transform="rotate(-20 22 22)"/><ellipse cx="38" cy="22" rx="11" ry="6" fill="#A8D8E8" opacity="0.7" transform="rotate(20 38 22)"/><ellipse cx="20" cy="29" rx="9" ry="5" fill="#C4E4F0" opacity="0.6" transform="rotate(-10 20 29)"/><ellipse cx="40" cy="29" rx="9" ry="5" fill="#C4E4F0" opacity="0.6" transform="rotate(10 40 29)"/><circle cx="30" cy="17" r="3" fill="#2C4A54"/><circle cx="29" cy="16" r="1" fill="#FAF5EB" opacity="0.5"/></svg>`
  },
  {
    id: 'x25', name: 'Owl', nameHe: 'ינשוף', category: 'seasonal', free: true, season: 'autumn', tags: ['owl', 'night', 'wisdom', 'autumn'],
    svg: `<svg viewBox="0 0 60 60" fill="none"><ellipse cx="30" cy="36" rx="16" ry="18" fill="#9B6B3A"/><ellipse cx="30" cy="28" rx="14" ry="12" fill="#B8843A"/><circle cx="24" cy="26" r="7" fill="#FAF5EB"/><circle cx="36" cy="26" r="7" fill="#FAF5EB"/><circle cx="24" cy="26" r="5" fill="#2C1A0E"/><circle cx="36" cy="26" r="5" fill="#2C1A0E"/><circle cx="25" cy="25" r="2" fill="#FAF5EB"/><circle cx="37" cy="25" r="2" fill="#FAF5EB"/><path d="M27 34 Q30 36 33 34" stroke="#9B6B3A" stroke-width="1.5" fill="none"/><path d="M24 18 L20 12 L28 16 Z" fill="#9B6B3A"/><path d="M36 18 L40 12 L32 16 Z" fill="#9B6B3A"/><path d="M24 48 L22 54 L28 50 Z" fill="#8B5E3C"/><path d="M36 48 L38 54 L32 50 Z" fill="#8B5E3C"/></svg>`
  },
];

// Merge extra stickers
STICKERS.push(...EXTRA_STICKERS);
