import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Some browsers resolve `localhost` and `127.0.0.1` differently, and Next 16
   * blocks dev assets requested from an origin it was not started on, which
   * breaks hydration on whichever of the two you did not use. Dev only.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],

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
