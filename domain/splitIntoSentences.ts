/**
 * Splits plain text into sentence-like segments using `Intl.Segmenter` when available,
 * with a simple punctuation-based fallback.
 */
export function splitIntoSentences(
  text: string,
  locale: string,
): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return [];
  }

  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const segmenter = new Intl.Segmenter(locale, {
        granularity: "sentence",
      });
      return [...segmenter.segment(normalized)]
        .map((s) => s.segment.trim())
        .filter((s) => s.length > 0);
    } catch {
      // Invalid or unsupported locale for the runtime — use fallback.
    }
  }

  return fallbackSentenceSplit(normalized);
}

function fallbackSentenceSplit(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
