export const LANGUAGE_CODES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ja",
  "ko",
  "zh",
  "ru",
] as const;

export type SegmentationLanguageCode = (typeof LANGUAGE_CODES)[number];

const LANGUAGE_LABELS: Record<SegmentationLanguageCode, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ru: "Russian",
};

export const SEGMENTATION_LANGUAGES = LANGUAGE_CODES.map((code) => ({
  code,
  label: LANGUAGE_LABELS[code],
}));

export const CEFR_LEVELS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
] as const;

export type CefrLevel = (typeof CEFR_LEVELS)[number];
