import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/program",
  "/advancement",
  "/outdoors",
  "/calendar",
  "/safety",
  "/resources",
  "/join",
  "/contact",
  "/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://troop394santaclara.org";
  const now = new Date();
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: r === "/calendar" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/join" ? 0.9 : 0.7,
  }));
}
