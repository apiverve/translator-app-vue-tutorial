import { guard, callApi, respond, fail, str } from '../lib/apiverve.js';

// The languages the page offers. Add codes here and in src/App.vue to offer more.
const LANGUAGES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'pl', 'vi', 'th', 'sv'];

/** POST /api/translate { text, source, target }: the text translated from source to target. */
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const body = await request.json().catch(() => ({}));
  const text = str(body.text, 2000);
  const { source, target } = body;
  if (!text) return fail('Enter text to translate');
  if (!LANGUAGES.includes(source) || !LANGUAGES.includes(target)) return fail('Pick a language from the list');
  if (source === target) return fail('Source and target languages must be different');

  return respond(() => callApi('translator', { json: { text, source, target } }));
}
