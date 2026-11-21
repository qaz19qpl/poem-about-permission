// The poem about permission — make.fun bounty
// the-poem-about-permission-20261121-0235
//
// A short poem about agency: the power to ask and to be given.
// The program writes the poem to /output/entry.txt. It is fully
// deterministic: the same text on every run, no network, no input.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = [
  "I spent years polishing a key",
  "I was too afraid to turn.",
  "Then one morning I knocked —",
  "and the door opened from the other side,",
  "by a hand that had been waiting",
  "all along for me to ask.",
].join("\n");

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // The gate: 1 to 280 characters, counted as Unicode code points,
  // and not only white space.
  const length = [...POEM].length;
  if (length < 1 || length > 280) {
    throw new Error(`poem is ${length} characters, outside the 1-280 gate`);
  }
  if (POEM.trim().length === 0) {
    throw new Error("poem is only white space");
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, POEM, { encoding: "utf8", mode: 0o644 });
  // The grader collects outputs as another user: leave the file
  // world-readable regardless of the process umask.
  chmodSync(OUTPUT_PATH, 0o644);
  console.log(`wrote ${length} characters to ${OUTPUT_PATH}`);
}

main();
