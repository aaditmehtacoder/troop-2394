/**
 * ============================================================================
 * PHOTOS
 * ============================================================================
 * Real photographs of the real places the troop goes, all under free licences
 * from Wikimedia Commons, resized to 1920px (full-bleed) and 960px (cards).
 * The credits below are shown in the footer; keep them when you swap a photo.
 *
 * To use the troop's own photos: drop a JPEG in /public/photos, add an entry
 * here with `credit.author` set to "Troop 2/394", and point a page at its key.
 * ==========================================================================*/

export type Photo = {
  src: string;
  small: string;
  alt: string;
  width: number;
  height: number;
  credit: { author: string; license: string; licenseUrl: string; page: string };
};

export const photos = {
  "sunset-beach": {
    src: "/photos/sunset-beach.jpg",
    small: "/photos/sunset-beach-960.jpg",
    alt: "Sunset State Beach through the cypress trees, sun on the water",
    width: 1920,
    height: 1439,
    credit: { author: "David Broad", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", page: "https://commons.wikimedia.org/wiki/File:California_Route_1_Highway_-_Sunset_Beach_and_Park_near_Watsonville_-_panoramio.jpg" },
  },
  "sunset-beach-2": {
    src: "/photos/sunset-beach-2.jpg",
    small: "/photos/sunset-beach-2-960.jpg",
    alt: "The dunes and surf at Sunset State Beach",
    width: 1920,
    height: 1424,
    credit: { author: "David Broad", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", page: "https://commons.wikimedia.org/wiki/File:California_Route_1_Highway_-_Sunset_Beach_and_Park_near_Watsonville_-_panoramio_(1).jpg" },
  },
  "pinnacles": {
    src: "/photos/pinnacles.jpg",
    small: "/photos/pinnacles-960.jpg",
    alt: "Rock spires along the High Peaks Trail, Pinnacles National Park",
    width: 1920,
    height: 1280,
    credit: { author: "Clyde Charles Brown", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:High_Peaks_Trail_in_Pinnacles_National_Park,_California,_US.jpg" },
  },
  "pinnacles-view": {
    src: "/photos/pinnacles-view.jpg",
    small: "/photos/pinnacles-view-960.jpg",
    alt: "Looking out over the Hain Wilderness from Pinnacles National Park",
    width: 1920,
    height: 1280,
    credit: { author: "Clyde Charles Brown", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:High_Peaks_and_Hain_Wilderness_in_Pinnacles_National_Park,_California,_US.jpg" },
  },
  "pinnacles-hiker": {
    src: "/photos/pinnacles-hiker.jpg",
    small: "/photos/pinnacles-hiker-960.jpg",
    alt: "A hiker on the trail below the pinnacles",
    width: 1920,
    height: 3413,
    credit: { author: "lamblukas", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Pinnacles_National_Park_-_54515088711.jpg" },
  },
  "yosemite": {
    src: "/photos/yosemite.jpg",
    small: "/photos/yosemite-960.jpg",
    alt: "Tunnel View of Yosemite Valley, El Capitan and Bridalveil Fall",
    width: 1920,
    height: 1253,
    credit: { author: "Diliff", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Tunnel_View,_Yosemite_Valley,_Yosemite_NP_-_Diliff.jpg" },
  },
  "half-dome": {
    src: "/photos/half-dome.jpg",
    small: "/photos/half-dome-960.jpg",
    alt: "Half Dome above the pines, Yosemite",
    width: 1920,
    height: 1272,
    credit: { author: "Tuxyso", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Yosemite_Half_Dome_from_Valley_2013.jpg" },
  },
  "glacier-point": {
    src: "/photos/glacier-point.jpg",
    small: "/photos/glacier-point-960.jpg",
    alt: "Half Dome from Glacier Point",
    width: 1920,
    height: 1240,
    credit: { author: "Thomas Wolf, www.foto-tw.de", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Half_Dome_from_near_Glacier_Point.jpg" },
  },
  "hi-sierra": {
    src: "/photos/hi-sierra.jpg",
    small: "/photos/hi-sierra-960.jpg",
    alt: "Granite and pines in the Stanislaus National Forest, home of Camp Hi-Sierra",
    width: 1920,
    height: 1280,
    credit: { author: "Laika ac from UK", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", page: "https://commons.wikimedia.org/wiki/File:Stanislaus_National_Forest_(14840664008).jpg" },
  },
  "hi-sierra-2": {
    src: "/photos/hi-sierra-2.jpg",
    small: "/photos/hi-sierra-2-960.jpg",
    alt: "A mountainside in the Stanislaus National Forest",
    width: 1920,
    height: 1280,
    credit: { author: "Laika ac from UK", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", page: "https://commons.wikimedia.org/wiki/File:Stanislaus_National_Forest_(14840681838).jpg" },
  },
  "hi-sierra-road": {
    src: "/photos/hi-sierra-road.jpg",
    small: "/photos/hi-sierra-road-960.jpg",
    alt: "The road into the Stanislaus National Forest",
    width: 1920,
    height: 1280,
    credit: { author: "Laika ac from UK", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", page: "https://commons.wikimedia.org/wiki/File:Stanislaus_National_Forest_(15024215891).jpg" },
  },
  "grant-lake": {
    src: "/photos/grant-lake.jpg",
    small: "/photos/grant-lake-960.jpg",
    alt: "Grant Lake in Joseph D. Grant County Park",
    width: 1920,
    height: 1280,
    credit: { author: "Thomson200", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Grant_Lake_-_Joseph_D._Grant_County_Park_Aug_2019.jpg" },
  },
  "grant-trail": {
    src: "/photos/grant-trail.jpg",
    small: "/photos/grant-trail-960.jpg",
    alt: "Hiking the golden hills of Joseph D. Grant County Park",
    width: 1920,
    height: 1280,
    credit: { author: "J Doll", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0", page: "https://commons.wikimedia.org/wiki/File:Joseph_D._Grant_County_Park_(140433003).jpg" },
  },
  "grant-hills": {
    src: "/photos/grant-hills.jpg",
    small: "/photos/grant-hills-960.jpg",
    alt: "Oak-studded hills at Grant Ranch",
    width: 1920,
    height: 1280,
    credit: { author: "Thomson200", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Joseph_D._Grant_County_Park_Aug_2019_1.jpg" },
  },
  "rafting": {
    src: "/photos/rafting.jpg",
    small: "/photos/rafting-960.jpg",
    alt: "Rafting the South Fork of the American River",
    width: 1920,
    height: 1440,
    credit: { author: "Saraivee", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:River_Runners_Inc._on_the_South_Fork_of_the_American_River.jpg" },
  },
  "rafting-aerial": {
    src: "/photos/rafting-aerial.jpg",
    small: "/photos/rafting-aerial-960.jpg",
    alt: "Rafts on the South Fork of the American River",
    width: 1920,
    height: 2694,
    credit: { author: "blmcalifornia", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Rafters_on_South_Fork_American_River_(52900398184).jpg" },
  },
  "sequoia": {
    src: "/photos/sequoia.jpg",
    small: "/photos/sequoia-960.jpg",
    alt: "Looking up a giant sequoia",
    width: 1920,
    height: 1280,
    credit: { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Yosemite_National_Park_(CA,_USA),_Mariposa_Grove_of_Giant_Sequoias,_Grizzly_Giant_--_2022_--_2752.jpg" },
  },
  "sequoia-2": {
    src: "/photos/sequoia-2.jpg",
    small: "/photos/sequoia-2-960.jpg",
    alt: "Giant sequoias in the Mariposa Grove",
    width: 1920,
    height: 1440,
    credit: { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Yosemite_National_Park_(CA,_USA),_Mariposa_Grove_of_Giant_Sequoias,_Grizzly_Giant_--_2022_--_2754.jpg" },
  },
  "sequoia-3": {
    src: "/photos/sequoia-3.jpg",
    small: "/photos/sequoia-3-960.jpg",
    alt: "A giant sequoia against the sky",
    width: 1920,
    height: 2880,
    credit: { author: "Dietmar Rabich", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Yosemite_National_Park_(CA,_USA),_Mariposa_Grove_of_Giant_Sequoias,_Grizzly_Giant_--_2022_--_2755.jpg" },
  },
  "snow-forest": {
    src: "/photos/snow-forest.jpg",
    small: "/photos/snow-forest-960.jpg",
    alt: "Late snow in a Sierra Nevada forest",
    width: 1920,
    height: 1432,
    credit: { author: "U.S. Forest Service - Eldorado National Forest", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Eldorado_National_Forest_-_Social_25.jpg" },
  },
  "campfire": {
    src: "/photos/campfire.jpg",
    small: "/photos/campfire-960.jpg",
    alt: "A Scout campfire at night",
    width: 1920,
    height: 1277,
    credit: { author: "Wiblackburn at English Wikipedia", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Cole_Canoe_Base_Boy_Scout_Campfire.JPG" },
  },
  "campfire-close": {
    src: "/photos/campfire-close.jpg",
    small: "/photos/campfire-close-960.jpg",
    alt: "Campfire flames",
    width: 1920,
    height: 1280,
    credit: { author: "Marc-Lautenbacher", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Campfire_flames_at_night.jpg" },
  },
  "uvas": {
    src: "/photos/uvas.jpg",
    small: "/photos/uvas-960.jpg",
    alt: "A waterfall in Uvas Canyon County Park",
    width: 1920,
    height: 1280,
    credit: { author: "dwhartwig", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Uvas_Canyon_County_Park_-_12.jpg" },
  },
  "uvas-2": {
    src: "/photos/uvas-2.jpg",
    small: "/photos/uvas-2-960.jpg",
    alt: "A mossy creek in Uvas Canyon",
    width: 1920,
    height: 1280,
    credit: { author: "dwhartwig", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Uvas_Canyon_County_Park_-_14.jpg" },
  },
  "sunnyvale": {
    src: "/photos/sunnyvale.jpg",
    small: "/photos/sunnyvale-960.jpg",
    alt: "Historic Murphy Avenue in downtown Sunnyvale",
    width: 1920,
    height: 1919,
    credit: { author: "The Sands of Time 0", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Historic_Murphy_Avenue,_Sunnyvale_(May_2025).jpg" },
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photo(key: PhotoKey): Photo {
  return photos[key];
}

/** Everyone who made these pictures, for the footer. */
export const photoCredits = Object.values(photos).map((p) => p.credit);

/* ----------------------------------------------------------- where used --- */

/** Backdrop for each interior page hero. */
export const pageHeroPhoto = {
  about: "grant-trail",
  program: "sequoia",
  advancement: "half-dome",
  outdoors: "yosemite",
  calendar: "grant-lake",
  join: "sunset-beach-2",
  resources: "hi-sierra-2",
  safety: "uvas",
  support: "campfire",
  contact: "sunnyvale",
  blog: "rafting",
  feed: "pinnacles-view",
  members: "hi-sierra-road",
  login: "campfire-close",
  signup: "snow-forest",
  notFound: "glacier-point",
} as const satisfies Record<string, PhotoKey>;

/** The home page mosaic: the places the troop actually goes, in its own words. */
export const mosaic: { photo: PhotoKey; place: string; when: string; href: string; span?: "wide" | "tall" }[] = [
  { photo: "sunset-beach", place: "Sunset State Beach", when: "The annual beach campout, every September", href: "/blog/sunset-beach-outing-2025", span: "wide" },
  { photo: "pinnacles-hiker", place: "Pinnacles", when: "This November", href: "/calendar", span: "tall" },
  { photo: "hi-sierra", place: "Camp Hi-Sierra", when: "A week at summer camp, every July", href: "/blog/summer-camp-2026-camp-hi-sierra" },
  { photo: "rafting", place: "South Fork American River", when: "Rafting, every April", href: "/blog/white-water-rafting-2026" },
  { photo: "snow-forest", place: "Bear Paw", when: "Snow trip, every winter", href: "/blog/bear-paw-outing-2026" },
  { photo: "grant-trail", place: "Grant Ranch", when: "Ten-mile hikes and Iron Chef", href: "/outdoors" },
  { photo: "uvas", place: "Uvas Canyon", when: "August overnight", href: "/outdoors" },
  { photo: "campfire", place: "Any campsite", when: "Where every campout ends", href: "/outdoors", span: "wide" },
];
