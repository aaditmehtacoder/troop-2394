import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * No `output: "standalone"`. It is for self-hosting behind Docker, and on
   * Vercel it broke the build: Vercel applies its own config and then
   * onBuildComplete could not open .next/next-server.js.nft.json.
   *
   *   Error: ENOENT: no such file or directory, open
   *   '/vercel/path0/.next/next-server.js.nft.json'
   *
   * Vercel does its own output file tracing. Put it back only if this ever
   * needs to run in a container.
   */
};

export default nextConfig;
