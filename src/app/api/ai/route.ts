import { NextRequest, NextResponse } from 'next/server';

const STICKER_IDS = [
  'b01','b02','b03','b04','b05','b06','b07','b08','b09','b10','b11','b12',
  'b13','b14','b15','b16','b17',
  'w01','w02','w03','w04',
  's01','s02','s03','s04','s05','s06','s07',
  'sp01','sp02','sp03',
  'm01','m02','m03','m04','m05','m06',
  'f01','f02','f03',
  'fd01','fd02','fd03','fd04',
  'v01','v02','v03','v04','v05',
  't01','t02','t03','t04',
  'w05','w06',
];

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text?.trim()) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  const prompt = `You are a personal journal stylist AI called "שמור" (Shamur).
Analyze this Hebrew/English journal entry and return a JSON object.

Entry: "${text}"

Return ONLY valid JSON, no markdown, no explanation:
{
  "stickers": [array of 6 sticker IDs from this list that best match the mood/content: ${STICKER_IDS.join(',')}],
  "palette": [array of 4 hex colors that match the emotional tone],
  "quote": "a short inspirational Hebrew or English quote matching the mood (max 15 words)",
  "mood": "single emoji representing the emotional state",
  "intent": "2-3 words in Hebrew describing the feeling/theme"
}

Rules:
- Pick stickers that match the EMOTIONS and CONTENT (nature words → botanical, sad → moon/candle, happy → sunshine/rainbow, family → house/puzzle, food/shabbat → bread/wine/tea)
- Autumn palette for melancholy/cozy, Spring for happy/hopeful, warm for love/family
- Quote should be warm and personal, in Hebrew or English
- mood emoji should be specific (not just 😊)`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const raw = data.content?.[0]?.text || '';

    // Parse JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const result = JSON.parse(jsonMatch[0]);

    // Validate sticker IDs
    if (result.stickers) {
      result.stickers = result.stickers.filter((id: string) => STICKER_IDS.includes(id)).slice(0, 8);
    }

    return NextResponse.json(result);
  } catch (e) {
    // Fallback: rule-based suggestion if API fails
    const fallback = getFallbackSuggestion(text);
    return NextResponse.json(fallback);
  }
}

function getFallbackSuggestion(text: string) {
  const lower = text.toLowerCase();
  
  const stickers: string[] = [];
  if (lower.includes('פרח') || lower.includes('גן') || lower.includes('טבע') || lower.includes('בוקר')) stickers.push('b01', 'b05', 'b07');
  if (lower.includes('קפה') || lower.includes('חם') || lower.includes('בית')) stickers.push('fd04', 's05');
  if (lower.includes('ילד') || lower.includes('רומי') || lower.includes('מאיה') || lower.includes('משפח')) stickers.push('f01', 'f02', 'm01');
  if (lower.includes('שבת') || lower.includes('חלה') || lower.includes('יין')) stickers.push('fd02', 'fd03');
  if (lower.includes('עצוב') || lower.includes('קשה') || lower.includes('עייפ')) stickers.push('m05', 's06');
  if (lower.includes('שמח') || lower.includes('אהב') || lower.includes('טוב')) stickers.push('m01', 'm02', 'sp03');
  if (lower.includes('טיול') || lower.includes('איטליה') || lower.includes('נסיע')) stickers.push('t01', 't02', 't03');
  
  while (stickers.length < 6) {
    const random = STICKER_IDS[Math.floor(Math.random() * 20)];
    if (!stickers.includes(random)) stickers.push(random);
  }

  return {
    stickers: stickers.slice(0, 6),
    palette: ['#E88DA8', '#D4A94A', '#8FA880', '#C4541C'],
    quote: 'כל יום הוא דף חדש לכתוב.',
    mood: '🌸',
    intent: 'רגע של שקט',
  };
}
