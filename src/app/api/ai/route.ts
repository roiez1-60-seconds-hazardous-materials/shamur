import { NextRequest, NextResponse } from 'next/server';

const STICKER_RULES: Record<string, string[]> = {
  'פרח|ורד|פריחה|גן|גינה': ['b01','b05','b11','x01','x03'],
  'עץ|ענף|שרך|עלה|ירוק': ['b06','b07','b10','x07'],
  'שמש|בוקר|אור|זריחה': ['x18','b08','sp03'],
  'לילה|ירח|כוכב|שקט': ['m05','w05','w06','x21'],
  'ילד|ילדה|רומי|נועם|עמית|מאיה|ילדים': ['f01','f03','m01'],
  'בית|משפחה|ביחד|יחד': ['f01','f03'],
  'שמח|שמחה|טוב|נהדר|מצוין': ['m02','x18','sp03'],
  'אהב|אהבה|לב|חיבוק': ['m01','m03','m06'],
  'תודה|ברכה|גאה': ['m03','x22','x23'],
  'עצוב|קשה|בכי|כאב': ['m05','s06','x13'],
  'קפה|תה|שתיתי': ['s05','fd04','x12'],
  'שבת|חלה|קידוש|יין': ['fd02','fd03','s06'],
  'טיול|נסיעה|איטליה|חופשה': ['t01','t02','t03','t04'],
  'סתיו|חורף|קר': ['s01','s02','s04','x25'],
  'אביב|פריחה|ריח': ['sp01','sp02','sp03','b03'],
  'קיץ|חוף|ים|חם': ['x18','x24','fd01'],
};

const PALETTES: Record<string, string[]> = {
  happy: ['#E88DA8','#D4A94A','#8FA880','#F4C2C2'],
  calm:  ['#9BA87D','#D4A94A','#E8DCC8','#C4CDD4'],
  cozy:  ['#C4541C','#D4A94A','#8B2635','#F5EDE0'],
  sad:   ['#2C3E50','#A8B5C2','#9BA87D','#D4C9A8'],
  love:  ['#8B2635','#E88DA8','#D4A94A','#F4C2C2'],
  nature:['#6B7340','#9BA87D','#D4A94A','#8FA880'],
};

const QUOTES = [
  'כל יום הוא דף חדש לכתוב.',
  'את חזקה יותר ממה שאת חושבת.',
  'רגעים קטנים הם הדברים הגדולים.',
  'הלב יודע את הדרך — תסמכי עליו.',
  'כל שקיעה מבטיחה זריחה.',
  'לפרוח אפשר בכל גיל ובכל עונה.',
  'האהבה הכי חשובה היא לעצמך.',
  'גם צעד קטן הוא קדימה.',
  'היי עדינה עם עצמך — את עושה כמיטב יכולתך.',
  'כוחה של אישה הוא בשקטה.',
];

function ruleBased(text: string) {
  const scores: Record<string, number> = {};
  for (const [pat, ids] of Object.entries(STICKER_RULES)) {
    if (new RegExp(pat, 'u').test(text)) {
      ids.forEach(id => { scores[id] = (scores[id] || 0) + 1; });
    }
  }
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]).map(([id])=>id);
  const defaults = ['b01','m01','b05','s05','b08','m02','x18','b03'];
  const stickers = [...new Set([...sorted, ...defaults])].slice(0,6);

  let paletteKey = 'calm', mood = '🌸', intent = 'רגע של שקט';
  if (/שמח|טוב|מאושר/.test(text)) { paletteKey='happy'; mood='😄'; intent='שמחה ואור'; }
  else if (/אהב|אהבה|לב/.test(text)) { paletteKey='love'; mood='❤️'; intent='אהבה וחום'; }
  else if (/עצוב|קשה|בכי/.test(text)) { paletteKey='sad'; mood='🌧'; intent='רגע קשה'; }
  else if (/קפה|שבת|חם|נוח/.test(text)) { paletteKey='cozy'; mood='☕'; intent='נוחות וחמימות'; }
  else if (/גן|פרח|טבע/.test(text)) { paletteKey='nature'; mood='🌿'; intent='קשר לטבע'; }

  return {
    stickers,
    palette: PALETTES[paletteKey],
    quote: QUOTES[Math.floor(Math.random() * QUOTES.length)],
    mood,
    intent,
  };
}

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json(ruleBased(''));

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── WITH CLAUDE (professional) ────────────────────────
  if (apiKey) {
    try {
      const allIds = [...new Set(Object.values(STICKER_RULES).flat())].join(', ');
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          messages: [{
            role: 'user',
            content: `You are Shamur, a personal Hebrew journal AI stylist.
Analyze this Hebrew journal entry and return ONLY valid JSON:

"${text.slice(0, 300)}"

Return:
{
  "stickers": [6 IDs from: ${allIds}],
  "palette": [4 hex colors matching emotional tone],
  "quote": "short inspirational Hebrew quote max 12 words",
  "mood": "single emoji",
  "intent": "2-3 Hebrew words describing the feeling"
}

Match stickers to the EMOTIONAL CONTENT (flowers=nature/calm, heart=love, moon=tired/night, sun=happy, coffee=cozy, etc).
Return ONLY the JSON object, nothing else.`,
          }],
        }),
      });

      const data = await res.json();
      const raw = data.content?.[0]?.text || '';
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const result = JSON.parse(match[0]);
        const allValidIds = [...new Set(Object.values(STICKER_RULES).flat())];
        result.stickers = (result.stickers || [])
          .filter((id: string) => allValidIds.includes(id) || id.match(/^[bwsmftxv]\d+$/))
          .slice(0, 6);
        if (result.stickers.length < 3) throw new Error('too few stickers');
        return NextResponse.json(result);
      }
    } catch (e) {
      // fallback below
    }
  }

  // ── RULE-BASED FALLBACK ───────────────────────────────
  return NextResponse.json(ruleBased(text));
}
