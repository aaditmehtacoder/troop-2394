/**
 * ============================================================================
 * PHOTOS
 * ============================================================================
 * The troop's own photographs come from the "Promotion Folder" album in the
 * KindredPix group (Troops 394 and 2394). That folder is the troop's own
 * selection of pictures it is happy to promote itself with, which is why these
 * are the ones on the public pages. Credit them to Troop 394.
 *
 * Do NOT pull pictures from the other 152 albums onto a public page. Those are
 * candid photographs of Scouts in a private, login-protected group, and using
 * them needs the troop's photo permission first.
 *
 * The Wikimedia Commons landscapes below are kept for the places we have no
 * troop picture of. They keep their original photographer and licence.
 *
 * To add one: drop a JPEG in /public/photos at up to 1600px wide plus a `-960`
 * card copy, add an entry here, and point a page at its key.
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
  /* ------------------ the troop's own, from the Promotion Folder --- */
  "troop-lodge": {
    src: "/photos/troop-lodge.jpg",
    small: "/photos/troop-lodge-960.jpg",
    alt: "The troop on the steps at Camp Hi-Sierra",
    width: 1600,
    height: 947,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "sailing": {
    src: "/photos/sailing.jpg",
    small: "/photos/sailing-960.jpg",
    alt: "Sailing on the lake at summer camp",
    width: 1600,
    height: 900,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "scouts-camp": {
    src: "/photos/scouts-camp.jpg",
    small: "/photos/scouts-camp-960.jpg",
    alt: "Scouts walking back through camp",
    width: 768,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "lake-jump": {
    src: "/photos/lake-jump.jpg",
    small: "/photos/lake-jump-960.jpg",
    alt: "Jumping into the swimming hole at camp",
    width: 1600,
    height: 900,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "rafting-run": {
    src: "/photos/rafting-run.jpg",
    small: "/photos/rafting-run-960.jpg",
    alt: "Running the whitewater on the spring rafting trip",
    width: 1536,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "eagle-scouts": {
    src: "/photos/eagle-scouts.jpg",
    small: "/photos/eagle-scouts-960.jpg",
    alt: "Eagle Scouts in full uniform at a court of honour",
    width: 1600,
    height: 900,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "archery": {
    src: "/photos/archery.jpg",
    small: "/photos/archery-960.jpg",
    alt: "Archery on the range at summer camp",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "hi-sierra-gate": {
    src: "/photos/hi-sierra-gate.jpg",
    small: "/photos/hi-sierra-gate-960.jpg",
    alt: "The Camp Hi-Sierra sign under the pines",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "pinnacles-sign": {
    src: "/photos/pinnacles-sign.jpg",
    small: "/photos/pinnacles-sign-960.jpg",
    alt: "The troop at the entrance to Pinnacles National Park",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "pancake-griddle": {
    src: "/photos/pancake-griddle.jpg",
    small: "/photos/pancake-griddle-960.jpg",
    alt: "Cooking at the troop's annual pancake breakfast",
    width: 1178,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "camp-pines": {
    src: "/photos/camp-pines.jpg",
    small: "/photos/camp-pines-960.jpg",
    alt: "The troop's campsite among the tall pines",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "camp-lake": {
    src: "/photos/camp-lake.jpg",
    small: "/photos/camp-lake-960.jpg",
    alt: "The lake at Camp Hi-Sierra on a summer afternoon",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "blacksmithing": {
    src: "/photos/blacksmithing.jpg",
    small: "/photos/blacksmithing-960.jpg",
    alt: "Working the anvil at the camp blacksmith shop",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "snow-tents": {
    src: "/photos/snow-tents.jpg",
    small: "/photos/snow-tents-960.jpg",
    alt: "Tents pitched in fresh snow on the winter campout",
    width: 768,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "frost-branches": {
    src: "/photos/frost-branches.jpg",
    small: "/photos/frost-branches-960.jpg",
    alt: "Frost on the branches on a winter morning",
    width: 768,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "scouts-flag": {
    src: "/photos/scouts-flag.jpg",
    small: "/photos/scouts-flag-960.jpg",
    alt: "Scouts with the troop flag before a district event",
    width: 1600,
    height: 900,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "lake-shore": {
    src: "/photos/lake-shore.jpg",
    small: "/photos/lake-shore-960.jpg",
    alt: "At the water's edge on a day outing",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "t394-carved": {
    src: "/photos/t394-carved.jpg",
    small: "/photos/t394-carved-960.jpg",
    alt: "T394 carved into the wood at camp",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "coast-walk": {
    src: "/photos/coast-walk.jpg",
    small: "/photos/coast-walk-960.jpg",
    alt: "Walking the cliff path on the Monterey coast",
    width: 768,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "rafting-river": {
    src: "/photos/rafting-river.jpg",
    small: "/photos/rafting-river-960.jpg",
    alt: "Rafts on the river on the spring trip",
    width: 1600,
    height: 747,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "parade": {
    src: "/photos/parade.jpg",
    small: "/photos/parade-960.jpg",
    alt: "The troop marching in the Parade of Champions",
    width: 1600,
    height: 747,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },
  "camp-night": {
    src: "/photos/camp-night.jpg",
    small: "/photos/camp-night-960.jpg",
    alt: "The camp lodge lit up after dark",
    width: 1365,
    height: 1024,
    credit: { author: "Troop 394", license: "Used with permission", licenseUrl: "https://www.kindredpix.com/beta/group.php?id=22", page: "https://www.kindredpix.com/beta/group.php?id=22" },
  },

  /* ------------------------------ Wikimedia Commons, still used --- */
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

/** Everyone who made these pictures, for the footer. One line per photographer. */
export const photoCredits = Object.values(photos)
  .map((p) => p.credit)
  .filter((c, i, all) => all.findIndex((o) => o.page === c.page && o.author === c.author) === i);

/* ----------------------------------------------------------- where used --- */

/** Backdrop for each interior page hero. */
export const pageHeroPhoto = {
  about: "troop-lodge",
  program: "camp-pines",
  advancement: "eagle-scouts",
  outdoors: "camp-lake",
  calendar: "lake-shore",
  join: "scouts-flag",
  resources: "hi-sierra-gate",
  safety: "pinnacles-sign",
  support: "pancake-griddle",
  contact: "parade",
  blog: "rafting-river",
  feed: "lake-jump",
  members: "camp-night",
  login: "t394-carved",
  signup: "sailing",
  notFound: "archery",
} as const satisfies Record<string, PhotoKey>;

/**
 * The home page mosaic: the places the troop actually goes. Seven pictures in
 * a fixed pattern (wide, tall, square...), so the order here is the layout;
 * see PhotoMosaic. The rafting photo is the hero, so it is not repeated here.
 */
export const mosaic: { photo: PhotoKey; place: string; href: string; position?: string }[] = [
  { photo: "troop-lodge", place: "The whole troop at Camp Hi-Sierra", href: "/about", position: "center 62%" },
  { photo: "scouts-camp", place: "A week at summer camp", href: "/outdoors#summer-camp" },
  { photo: "archery", place: "The archery range", href: "/program" },
  { photo: "snow-tents", place: "The snow trip", href: "/outdoors" },
  { photo: "blacksmithing", place: "The camp forge", href: "/advancement" },
  { photo: "coast-walk", place: "The Monterey coast", href: "/outdoors" },
  { photo: "sailing", place: "Sailing on the lake", href: "/outdoors#summer-camp" },
];
