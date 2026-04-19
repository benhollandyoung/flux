import { PasteSegmenter } from "@/components/PasteSegmenter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
      <header className="mx-auto mb-10 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Flux
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Paste text, pick language and level, then generate sentence segments.
        </p>
      </header>
      <PasteSegmenter />
    </div>
  );
}
