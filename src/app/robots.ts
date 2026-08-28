import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The members area is behind a login; keep it out of search results.
      disallow: ["/dashboard", "/dashboard/", "/login", "/signup"],
    },
    sitemap: "https://troop394santaclara.org/sitemap.xml",
  };
}
