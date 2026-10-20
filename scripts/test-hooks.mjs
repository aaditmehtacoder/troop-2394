/**
 * Lets `node --test` load the app's TypeScript the way Next does, with no test
 * framework to install: Node 24 strips the types itself, and this hook fills in
 * the two things only the bundler knows about.
 *
 *   @/...         the tsconfig path alias for src/
 *   server-only   Next's build-time guard, which has nothing to guard in a test
 *
 * Extensionless imports also get their ".ts" back, since Node will not guess.
 */
import { register } from "node:module";

const src = new URL("../src/", import.meta.url).href;

const hooks = `
import { statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

function isFile(path) {
  try { return statSync(path).isFile(); } catch { return false; }
}

function findSource(url) {
  const path = fileURLToPath(url);
  const hit = [path, path + ".ts", path + ".tsx", path + "/index.ts"].find(isFile);
  return hit ? pathToFileURL(hit).href : null;
}

export async function resolve(specifier, context, next) {
  if (specifier === "server-only") return { url: "data:text/javascript,", shortCircuit: true };
  let url = null;
  if (specifier.startsWith("@/")) url = findSource(new URL(specifier.slice(2), ${JSON.stringify(src)}));
  else if (/^\\.\\.?\\//.test(specifier) && context.parentURL?.startsWith("file:")) {
    url = findSource(new URL(specifier, context.parentURL));
  }
  return url ? { url, shortCircuit: true } : next(specifier, context);
}
`;

register("data:text/javascript," + encodeURIComponent(hooks));
