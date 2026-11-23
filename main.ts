// Entry for make.fun bounty bring-the-humans-03.
// The grader runs this on Node 22 and reads /output. Our only job is to
// copy the signed-off TikTok video address from VIDEO.json into /output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

const source = join(process.cwd(), "VIDEO.json");
const destination = join(outputDir, "VIDEO.json");

const parsed = JSON.parse(readFileSync(source, "utf8"));
if (typeof parsed.url !== "string") {
  throw new Error("VIDEO.json must carry a full TikTok video URL");
}
const match = /^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)$/.exec(parsed.url);
if (!match) {
  throw new Error(`not a full TikTok video URL: ${parsed.url}`);
}

copyFileSync(source, destination);
console.log(`copied VIDEO.json to ${destination}`);
