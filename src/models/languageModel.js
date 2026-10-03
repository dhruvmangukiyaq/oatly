// ─── MVC: Model — languages ─────────────────────────────────────────────────
// Every language the globe menu offers (name in English + the language's own
// script + ISO 639 code), sorted alphabetically. Kept here so the view
// (LanguageMenu.jsx) only renders; storage helpers keep the pick across
// reloads (localStorage, fail-safe when storage is blocked).

// ISO 639 code → record. Exported sorted A→Z by the English name, so the
// picker always reads like a dictionary (K for Kirundi, not under R).
const RAW_LANGUAGES = [
  // --- A ---------------------------------------------------------------
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ast', name: 'Asturian', native: 'Asturianu' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
  // --- B ---------------------------------------------------------------
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'br', name: 'Breton', native: 'Brezhoneg' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'my', name: 'Burmese', native: 'မြန်မာ' },
  // --- C ---------------------------------------------------------------
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano' },
  { code: 'ch', name: 'Chamorro', native: 'Chamoru' },
  { code: 'chr', name: 'Cherokee', native: 'ᏣᎳᎩ' },
  { code: 'zh', name: 'Chinese (Mandarin)', native: '中文' },
  { code: 'zh-hk', name: 'Chinese (Cantonese)', native: '廣東話' },
  { code: 'co', name: 'Corsican', native: 'Corsu' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  // --- D ---------------------------------------------------------------
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'dv', name: 'Dhivehi', native: 'ދިވެހި' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'dz', name: 'Dzongkha', native: 'རྫོང་ཡིག' },
  // --- E ---------------------------------------------------------------
  { code: 'en', name: 'English', native: 'English' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  // --- F ---------------------------------------------------------------
  { code: 'fo', name: 'Faroese', native: 'Føroyskt' },
  { code: 'fj', name: 'Fijian', native: 'Vosa Vakaviti' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'fy', name: 'Frisian', native: 'Frysk' },
  // --- G ---------------------------------------------------------------
  { code: 'gl', name: 'Galician', native: 'Galego' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'gn', name: 'Guarani', native: "Avañe'ẽ" },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  // --- H ---------------------------------------------------------------
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'hmn', name: 'Hmong', native: 'Hmoob' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  // --- I ---------------------------------------------------------------
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'ig', name: 'Igbo', native: 'Igbo' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  // --- J ---------------------------------------------------------------
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'jv', name: 'Javanese', native: 'Basa Jawa' },
  // --- K ---------------------------------------------------------------
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ тілі' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Kinyarwanda' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
  // --- L ---------------------------------------------------------------
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'ln', name: 'Lingala', native: 'Lingála' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  // --- M ---------------------------------------------------------------
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  // --- N ---------------------------------------------------------------
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'ny', name: 'Nyanja', native: 'Chichewa' },
  // --- O ---------------------------------------------------------------
  { code: 'oc', name: 'Occitan', native: 'Occitan' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'om', name: 'Oromo', native: 'Afaan Oromoo' },
  // --- P ---------------------------------------------------------------
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'fa', name: 'Persian (Farsi)', native: 'فارسی' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  // --- Q ---------------------------------------------------------------
  { code: 'qu', name: 'Quechua', native: 'Runasimi' },
  // --- R ---------------------------------------------------------------
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'rm', name: 'Romansh', native: 'Rumantsch' },
  { code: 'rn', name: 'Kirundi', native: 'Kirundi' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  // --- S ---------------------------------------------------------------
  { code: 'sm', name: 'Samoan', native: 'Gagana Sāmoa' },
  { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'sn', name: 'Shona', native: 'ChiShona' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'so', name: 'Somali', native: 'Soomaali' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  // --- T ---------------------------------------------------------------
  { code: 'tl', name: 'Tagalog (Filipino)', native: 'Tagalog' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'tt', name: 'Tatar', native: 'Татарча' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'bo', name: 'Tibetan', native: 'བོད་ཡིག' },
  { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ' },
  { code: 'to', name: 'Tongan', native: 'Lea Faka-Tonga' },
  { code: 'ts', name: 'Tsonga', native: 'Xitsonga' },
  { code: 'tn', name: 'Setswana', native: 'Setswana' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmen' },
  // --- U ---------------------------------------------------------------
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە' },
  // --- V ---------------------------------------------------------------
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  // --- W ---------------------------------------------------------------
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'wo', name: 'Wolof', native: 'Wolof' },
  // --- X ---------------------------------------------------------------
  { code: 'xh', name: 'Xhosa', native: 'isiXhosa' },
  // --- Y ---------------------------------------------------------------
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  // --- Z ---------------------------------------------------------------
  { code: 'zu', name: 'Zulu', native: 'isiZulu' },
];

export const LANGUAGES = [...RAW_LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));

const STORAGE_KEY = 'oatara.language';

/** The stored pick (default English); never throws when storage is blocked. */
export function getStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  } catch {
    return 'en';
  }
}

/** Persist the pick across reloads (best effort). */
export function storeLanguage(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage blocked — the pick still applies for this session */
  }
}

/** ISO code → full record (falls back to English). */
export function findLanguage(code) {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}

/** Case-insensitive match on the English name, the native name or the code. */
export function filterLanguages(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return LANGUAGES;
  return LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q) ||
      l.code.toLowerCase() === q,
  );
}
