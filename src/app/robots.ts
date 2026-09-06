import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Everything behind a login, kept out of search results.
      disallow: ["/admin", "/members", "/login", "/signup", "/auth"],
    },
    sitemap: "https://troop394santaclara.org/sitemap.xml",
  };
}
