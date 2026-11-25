// Invent a Word We Need — entry program.
//
// The entry is one invented English word plus a one-line definition,
// at most 140 characters, written to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt) and printed to stdout.
//
// The word: BACKWAVE
//   The wave you give a stranger who was waving at the person behind you.
//   Everyone has done it; English had no word for it until now.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "backwave \u2014 waving at a stranger who was waving at the person behind you.";

function main(): void {
  // Self-checking gate: the sealed scorer requires UTF-8 text of
  // 1 to 140 characters, not only white space, on a single line.
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry is ${chars.length} characters, must be 1-140`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Verify the round trip: what was written is exactly what we meant.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip mismatch: entry.txt differs from ENTRY");
  }
  const bytes = Buffer.byteLength(ENTRY, "utf8");
  console.log(ENTRY);
  console.log(`[gate] ${chars.length} chars, ${bytes} bytes, single line: OK`);
}

main();
