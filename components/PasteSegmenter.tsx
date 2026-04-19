"use client";

import { useMemo, useState } from "react";

import {
  CEFR_LEVELS,
  SEGMENTATION_LANGUAGES,
  type SegmentationLanguageCode,
} from "@/domain/segmentationOptions";
import { segmentPasteSchema } from "@/domain/segmentPasteSchema";
import { splitIntoSentences } from "@/domain/splitIntoSentences";

export function PasteSegmenter() {
  const [text, setText] = useState("");
  const [languageCode, setLanguageCode] =
    useState<SegmentationLanguageCode>("en");
  const [level, setLevel] = useState<(typeof CEFR_LEVELS)[number]>("B1");
  const [segments, setSegments] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const languageLabel = useMemo(
    () =>
      SEGMENTATION_LANGUAGES.find((l) => l.code === languageCode)?.label ??
      languageCode,
    [languageCode],
  );

  function handleGenerate() {
    setError(null);

    const parsed = segmentPasteSchema.safeParse({
      text,
      languageCode,
      level,
    });

    if (!parsed.success) {
      const first = parsed.error.flatten().formErrors[0];
      setSegments([]);
      setError(first ?? "Check your input.");
      return;
    }

    const next = splitIntoSentences(parsed.data.text, parsed.data.languageCode);
    setSegments(next);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <section className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a paragraph or article here…"
            rows={8}
            className="min-h-40 resize-y rounded-lg border border-zinc-200 bg-background px-3 py-2 text-base font-normal text-foreground shadow-sm outline-none ring-zinc-400 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Language
            <select
              value={languageCode}
              onChange={(e) =>
                setLanguageCode(e.target.value as SegmentationLanguageCode)
              }
              className="rounded-lg border border-zinc-200 bg-background px-3 py-2 text-base font-normal text-foreground shadow-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
            >
              {SEGMENTATION_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Level
            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value as (typeof CEFR_LEVELS)[number])
              }
              className="rounded-lg border border-zinc-200 bg-background px-3 py-2 text-base font-normal text-foreground shadow-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
            >
              {CEFR_LEVELS.map((lv) => (
                <option key={lv} value={lv}>
                  {lv}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90 active:opacity-80"
        >
          Generate
        </button>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </section>

      {segments.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Segments
            <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">
              ({segments.length}) · {languageLabel} · {level}
            </span>
          </h2>
          <ul className="flex flex-col gap-2 p-0">
            {segments.map((segment, i) => (
              <li
                key={i}
                className="rounded-lg border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-base leading-relaxed text-foreground dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <span className="mr-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {i + 1}.
                </span>
                {segment}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
