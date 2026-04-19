import { z } from "zod";

import { CEFR_LEVELS, LANGUAGE_CODES } from "./segmentationOptions";

export const segmentPasteSchema = z.object({
  text: z.string().trim().min(1, "Paste some text first."),
  languageCode: z.enum(LANGUAGE_CODES),
  level: z.enum(CEFR_LEVELS),
});

export type SegmentPasteInput = z.infer<typeof segmentPasteSchema>;
