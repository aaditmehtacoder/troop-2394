/**
 * ============================================================================
 * TROOP 394. SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every troop-specific fact on this website comes from this one file.
 * To update the site, edit here. You never need to touch a component.
 *
 * All facts below were researched from primary sources on 2026-08-27:
 *   [BEASCOUT]  beascout.scouting.org official unit record for Troop 0394
 *               (unitId 5d8810d2-5b6f-428d-91de-8e7961d6b3bb). CURRENT
 *   [WIKI]      the troop's own site troop-394.org/wiki (currently HTTP 500;
 *               recovered via the Internet Archive)
 *   [GUIDE]     Troop 394 Operating Guide, Revision 6.0, April 1 2008
 *   [SVVOICE]   The Silicon Valley Voice, svvoice.com
 *   [SVMBC]     svmbc.org, council and district pages
 *
 * Lines tagged  // CONFIRM  have a source conflict or may be stale, * check them before you publish.
 * ==========================================================================
 */

export const troop = {
  number: "394",
  /** The linked troops brand themselves together as "Troop 2/394". */
  displayNumber: "2/394",
  name: "Troop 2/394",
  legalName: "Troop 394",
  longName: "Scouts BSA Troop 2/394",
  city: "Santa Clara",
  state: "California",
  stateAbbr: "CA",
  tagline: "Prepared. For Life.",
  motto: "Be Prepared",
  slogan: "Do a Good Turn Daily",

  /** [WIKI] "chartered in March of 1993" · [BEASCOUT] "founded in 1993" */
  founded: 1993,
  charteredMonth: "March",
  /** [BEASCOUT] current estimated youth in unit */
  /** [BEASCOUT] Scouts BSA. Grades 5-12 */
  grades: "Grades 5–12",

  /**
   * [WIKI] + [BEASCOUT unit description] + the troop Facebook group all name
   * the Elks Lodge. NOTE: beascout's *registered organization* field currently
   * reads "Kiwanis Club of Santa Clara". That conflict is worth resolving
   * with the council registrar.
   */
  charterOrg: {
    // The Elks used to charter the troop but no longer do (troop email, Nov 2025). They still host it,
    // free, in return for service. Kept as the lodge contact only; do not describe them as the charter org.
    name: "Santa Clara Elks Lodge #2347",
    address: "1680 Martin Ave, Santa Clara, CA 95050",
    phone: "(408) 727-6044",
    url: "https://santa-clara-ca-2347.elks.club/",
  },

  council: {
    name: "Silicon Valley Monterey Bay Council",
    abbr: "SVMBC",
    number: "055",
    url: "https://svmbc.org/",
    serviceCenter: "1900 The Alameda, Suite 100, San Jose, CA 95126",
    phone: "(408) 638-8300",
    /** Santa Clara County Council + Monterey Bay Area Council merged 1 Jan 2013 */
    formerly: "Santa Clara County Council",
  },

  district: {
    name: "Pioneer District",
    url: "https://svmbc.org/districts/pioneer/",
    serves:
      "North San Jose, Santa Clara, Western San Jose, Campbell, Los Gatos, Monte Sereno, and Redwood Estates",
    /** [WIKI] "about 50 Boy Scout Troops and about an equal number of Cub Scout Packs" */
    scale: "roughly 50 Scouts BSA troops and about as many Cub Scout packs",
  },

  /** [BEASCOUT] current meeting details. [WIKI] confirms Tuesday 7:00–8:30. */
  /** The program year the youth leadership list belongs to. */
  programYear: "2026–27",

  meeting: {
    day: "Tuesday",
    time: "7:00 PM",
    cadence: "Every Tuesday during the school year",
    summerCadence: "Most Tuesdays through the summer, with a break for summer camp",
    venue: "Sunnyvale Elks Lodge #2128", // CONFIRM: beascout lists this; the troop historically met at the Santa Clara Elks Lodge
    address: "375 N. Pastoria Avenue, Sunnyvale, CA 94085",
    mapQuery: "375 N Pastoria Ave, Sunnyvale, CA 94085",
    committeeMeeting: "Monthly, usually a Wednesday evening from 7 to 8 PM over Zoom; every parent is welcome",
  },

  /**
   * The troop's public contact.
   *
   * A role address, not a person's. No telephone number: the numbers we had
   * were personal mobiles, and a troop that publishes one on a page aimed at
   * families is publishing a volunteer's private line. Email reaches the same
   * people and can be handed on when a role changes.
   */
  contact: {
    email: "troop394sc@gmail.com",
    scoutmasterEmail: "troop394sc@gmail.com",
    newMemberEmail: "troop394sc@gmail.com",
  },

  /** [BEASCOUT] linked girl troop, same place, same day. */
  linkedTroop: {
    number: "2394",
    note: "Troop 394 is linked to girl Troop 2394, which meets at the same place on the same day.",
  },

} as const;

/* -------------------------------------------------------------------------
   NAVIGATION
   ---------------------------------------------------------------------- */

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/**
 * The header used to carry about forty links: ten top-level items with four or
 * five children each. A parent deciding whether to visit a meeting does not
 * need forty choices, so this is roughly half of that, and nothing here leads
 * anywhere a visitor cannot go.
 *
 * The members' pages (the feed, the forms) are reached from the members' area
 * rather than the public nav, because a signed-out visitor clicking them just
 * lands on a sign-in wall.
 */
export const utilityNav: NavChild[] = [
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "/contact" },
];

export const utilityButtons: NavChild[] = [
  { label: "Support Us", href: "/support" },
  { label: "Scoutbook", href: "https://scoutbook.scouting.org/", external: true },
];

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Troop", href: "/about" },
      { label: "Youth Leadership", href: "/about#youth-leadership" },
      { label: "Adult Leaders", href: "/about#adult-leaders" },
    ],
  },
  {
    label: "Program",
    href: "/program",
    children: [
      { label: "What We Do", href: "/program" },
      { label: "Meetings", href: "/program#meetings" },
      { label: "The Patrol Method", href: "/program#patrol-method" },
    ],
  },
  {
    label: "Advancement",
    href: "/advancement",
    children: [
      { label: "Trail to Eagle", href: "/advancement" },
      { label: "Merit Badges", href: "/advancement#merit-badges" },
      { label: "Our Eagle Scouts", href: "/advancement#eagle" },
    ],
  },
  {
    label: "Outdoors",
    href: "/outdoors",
    children: [
      { label: "Camping Program", href: "/outdoors" },
      { label: "Summer Camp", href: "/outdoors#summer-camp" },
      { label: "Traditions", href: "/outdoors#traditions" },
    ],
  },
  { label: "Calendar", href: "/calendar" },
  { label: "Stories", href: "/blog" },
  {
    label: "Safety",
    href: "/safety",
    children: [
      { label: "Our Commitment", href: "/safety" },
      { label: "Youth Protection", href: "/safety#youth-protection" },
      { label: "Report a Concern", href: "/safety#report" },
    ],
  },
  {
    label: "Join",
    href: "/join",
    children: [
      { label: "How to Join", href: "/join" },
      { label: "For Parents", href: "/join#for-parents" },
      { label: "New Family Guide", href: "/resources#new-families" },
    ],
  },
];

/* -------------------------------------------------------------------------
   HOME. HERO SLIDES
   ---------------------------------------------------------------------- */

export const heroSlides = [
  {
    eyebrow: "Scouts BSA · Santa Clara · since 1993",
    title: "The Scouts run this troop.",
    body: "Youth leaders plan the meetings, the campouts, and the week at camp. Adults train, drive, and keep it safe.",
    cta: { label: "Join Troop 2/394", href: "/join" },
    secondary: { label: "Visit a Meeting", href: "/contact" },
    // The whole troop, on the lodge steps at Camp Hi-Sierra. A visitor should
    // see the actual people before they see the scenery.
    photo: "troop-lodge" as const,
    position: "center 40%",
  },
  {
    eyebrow: "A campout every month",
    title: "Real places. Real weekends.",
    body: "Sunset Beach in September, kayaking in October, Pinnacles in November. One trip a month, all year.",
    cta: { label: "See the Calendar", href: "/calendar" },
    secondary: { label: "Where We Go", href: "/outdoors" },
    photo: "rafting-run" as const,
    position: "center 45%",
  },
  {
    eyebrow: "A week at Camp Hi-Sierra every July",
    title: "The outdoors is the classroom.",
    body: "Merit badges, campfires, and the campwide games. Ask any Scout what they remember.",
    cta: { label: "Read the Stories", href: "/blog" },
    secondary: { label: "Our Program", href: "/program" },
    photo: "camp-lake" as const,
    position: "center 50%",
  },
];

/* -------------------------------------------------------------------------
   HOME, "TROOP 394 IS THE DIFFERENCE"
   ---------------------------------------------------------------------- */

export const differenceCards = [
  {
    title: "Lead something real",
    body: "The Senior Patrol Leader is elected by the Scouts and runs the weekly meeting. Adults advise. They do not run it.",
    scene: "leadership" as const,
  },
  {
    title: "Get genuinely outdoors",
    body: "A campout or special event every month, plus a full week of camp each summer. Patrols plan, pack and cook it themselves.",
    scene: "camping" as const,
  },
  {
    title: "Finish what you start",
    body: "Courts of honor are quarterly, so no Scout waits months to be recognised. Every Eagle gets a court of honor of their own.",
    scene: "eagle" as const,
  },
];

export const differenceStats = [
  // 1993 charter; seven Eagle Scouts
  // announced on the troop list since April 2025; one outing every month.
  { value: `${new Date().getFullYear() - troop.founded}`, label: "Years in Santa Clara" },
  { value: "7", label: "Eagle Scouts since 2025" },
  { value: "12", label: "Outings a year" },
  { value: "2", label: "Troops, one for girls and one for boys" },
];

/* -------------------------------------------------------------------------
   HOME. PROGRAM TILES
   ---------------------------------------------------------------------- */

export const programTiles = [
  {
    name: "Troop 394",
    who: "Boys, grades 5 to 12",
    href: "/program",
    tone: "red" as const,
    blurb: "Patrols, weekly meetings, an outing every month, and the trail to Eagle.",
  },
  {
    name: "Troop 2394",
    who: "Girls, grades 5 to 12",
    href: "/join#linked-troop",
    tone: "forest" as const,
    blurb: "Same night, same place, same campouts. A troop of its own.",
  },
  {
    name: "Adults",
    who: "Parents and mentors",
    href: "/about#adult-leaders",
    tone: "blue" as const,
    blurb: "Drive to a trailhead, counsel a merit badge, or sit on a board of review. Training is free.",
  },
];

/* -------------------------------------------------------------------------
   OATH / LAW / MISSION
   ---------------------------------------------------------------------- */

export const scoutOath =
  "On my honor I will do my best to do my duty to God and my country and to obey the Scout Law; to help other people at all times; to keep myself physically strong, mentally awake, and morally straight.";

export const scoutLaw = [
  "Trustworthy",
  "Loyal",
  "Helpful",
  "Friendly",
  "Courteous",
  "Kind",
  "Obedient",
  "Cheerful",
  "Thrifty",
  "Brave",
  "Clean",
  "Reverent",
];

/** Paraphrased from the troop's own Operating Guide and About Us page. */
export const troopMission = `Troop 394 exists to give the youth of ${troop.city} the best Scouting experience possible, a program that develops them physically, mentally, and morally, built around the Scout Oath and Law, and run by the Scouts themselves with adults present as advisers.`;

/* -------------------------------------------------------------------------
   VALUE PILLARS
   ---------------------------------------------------------------------- */

export const valuePillars = [
  {
    title: "Prepared. For Life.",
    body: "Fire building and first aid are the visible part. The real lesson is judgment under pressure: as much freedom as possible, and just enough adult authority to keep it safe.",
    icon: "compass" as const,
  },
  {
    title: "Safety first, always",
    body: "Every adult is background checked and completes Youth Protection Training. Two-deep leadership applies to every activity, without exception.",
    icon: "shield" as const,
  },
  {
    title: "Become your best self",
    body: "Merit badges from cooking to welding at Camp Hi-Sierra. The troop has taken first in the camp-wide games two years running.",
    icon: "star" as const,
  },
  {
    title: "Fun for the whole family",
    body: "Courts of honor are family affairs. Scouting works best when parents are in it too, and there is a job here for every one of them.",
    icon: "tent" as const,
  },
];

/* -------------------------------------------------------------------------
   TESTIMONIALS, real, sourced quotes
   ---------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "Doing my Eagle project was my way of helping my community stay safe. The entire Eagle project is led by the Scout.",
    name: "Ben",
    role: "Eagle Scout, Troop 394 · Silicon Valley Voice, 2021",
  },
  {
    quote:
      "I have been going to Camp Campbell ever since I was a little kid. When I found out they were having trouble with their picnic tables falling apart, I wanted to help.",
    name: "Nick",
    role: "Eagle Scout, Troop 394 · Silicon Valley Voice, 2024",
  },
  {
    quote:
      "Even without a lot of building materials, many people constructed cool shelters. Riley even made a hammock.",
    name: "Mihir",
    role: "Scout, on the Wilderness Survival campout",
  },
  {
    quote:
      "The last full day of camp was what we were all prepared for: camp-wide games. We got first, the second year in a row. Troop 394 for the win!",
    name: "Ryota",
    role: "Scout, on summer camp at Camp Hi-Sierra",
  },
];

/* -------------------------------------------------------------------------
   CALENDAR
   The troop's real annual rhythm, drawn from its own archives. Dates are
   placed on the 2026–2027 program year and need confirming against the
   calendar the Patrol Leaders' Council actually approves each August.
   ---------------------------------------------------------------------- */

export type TroopEvent = {
  date: string; // ISO
  endDate?: string;
  title: string;
  kind: "Campout" | "Meeting" | "Service" | "Ceremony" | "Training" | "High Adventure";
  location: string;
  note?: string;
};

/**
 * The two words a parent actually needs: is this a Tuesday night at the lodge,
 * or is it a weekend away? Everything else is detail.
 *
 * `kind` stays granular because the troop thinks in those terms; `eventTag`
 * collapses it to what a family scanning the calendar is looking for.
 */
export type EventTag = "Outing" | "Meeting" | "Service" | "Ceremony";

export function eventTag(kind: TroopEvent["kind"]): EventTag {
  switch (kind) {
    case "Campout":
    case "High Adventure":
      return "Outing";
    case "Service":
      return "Service";
    case "Ceremony":
      return "Ceremony";
    default:
      return "Meeting";
  }
}

export const calendar: TroopEvent[] = [
  // Source: the troop mailing list. August 2026 PLC meeting notes (sent 1 Sep
  // 2026), the committee minutes of 13 Aug 2026, the "SAVE THE DATE: Sunset
  // Beach Campout" email (1 Sep 2026) and the Court of Honor deadlines email
  // (15 Jul 2026). Add months as the PLC confirms them.
  {
    date: "2026-09-08",
    title: "Troop Meeting: Communication Merit Badge",
    kind: "Meeting",
    location: "Sunnyvale Elks Lodge",
    note: "Eagle-required merit badge, continued from last week, plus a troop game.",
  },
  {
    date: "2026-09-09",
    title: "Troop Committee Meeting",
    kind: "Meeting",
    location: "Zoom, 7:00 – 8:00 PM",
    note: "All parents and adult leaders are welcome. Agenda and link go out by email.",
  },
  {
    date: "2026-09-15",
    title: "Patrol Leaders' Council",
    kind: "Meeting",
    location: "Sunnyvale Elks Lodge",
    note: "PLC members only. No regular troop meeting this week.",
  },
  {
    date: "2026-09-22",
    title: "Troop Meeting: Sunset Beach Planning",
    kind: "Meeting",
    location: "Sunnyvale Elks Lodge",
    note: "Meal planning for the Sunset Beach campout, patrol flags, and a game. Come if you are going on the campout.",
  },
  {
    date: "2026-09-26",
    endDate: "2026-09-27",
    title: "Annual Sunset Beach Campout",
    kind: "Campout",
    location: "Sunset State Beach, Watsonville",
    note: "A fun activity on Saturday morning, then camping at the beach. Sign up at the meeting the week before.",
  },
  {
    date: "2026-09-29",
    title: "Fall Court of Honor",
    kind: "Ceremony",
    location: "Sunnyvale Elks Lodge",
    note: "During the troop meeting. Full Class A uniform. Families welcome.",
  },
  {
    date: "2026-10-17",
    endDate: "2026-10-18",
    title: "Kayaking and Camping at Laguna Seca",
    kind: "Campout",
    location: "Laguna Seca, Monterey County",
    note: "Saturday to Sunday. Details from the PLC closer to the date.",
  },
  {
    date: "2026-11-15",
    endDate: "2026-11-16",
    title: "Pinnacles National Park Campout",
    kind: "Campout",
    location: "Pinnacles National Park",
    note: "Dates to be confirmed by the PLC, probably the 15th and 16th.",
  },
];

/* -------------------------------------------------------------------------
   PATROLS / LEADERSHIP, structure per the Troop Operating Guide
   Patrol names change with each election; ask the SPL for the current roster.
   ---------------------------------------------------------------------- */

export const patrolStructure = [
  {
    name: "New Scout patrol",
    note: "Webelos crossing over at 10½ or older form their own patrol, with an assistant Scoutmaster assigned to them and a Troop Guide to bring them through the first year.",
  },
  {
    name: "Regular patrols",
    note: "Scouts with previous experience are placed in a patrol with others of similar age and skill. Each elects its own Patrol Leader.",
  },
  {
    name: "Patrol Leaders' Council",
    note: "The Patrol Leaders and the Senior Patrol Leader. They set the troop's annual calendar, which then goes to the committee for approval.",
  },
];

export const youthPositions = [
  {
    role: "Senior Patrol Leader",
    holder: "Akhil and Jacqueline (2026–27)",
    blurb:
      "The youth leader of the troop. Sets the agenda and presides at all Patrol Leaders' Council meetings, runs the weekly troop meeting, and appoints the other youth leaders.",
  },
  {
    role: "Assistant Senior Patrol Leader",
    holder: "Sreshta",
    blurb:
      "Assists in conducting meetings and stands in for the SPL. Responsible for training and directing the quartermaster, scribe, historian, librarian, and instructors.",
  },
  {
    role: "Patrol Leaders",
    holder: "Elected by each patrol every six months",
    blurb:
      "Responsible for their patrol at all times, patrol meetings, troop functions, and representing the patrol at the Patrol Leaders' Council.",
  },
  {
    role: "Troop Guide",
    holder: "Zachary and Akalya",
    blurb:
      "Appointed by the Scoutmaster to help younger Scouts progress through the ranks. Works alongside the New Scout patrol's assistant Scoutmaster.",
  },
  {
    role: "Instructors",
    holder: "Older Scouts",
    blurb:
      "Advanced Scouts who provide the corps of skills and knowledge the SPL builds the troop's training program around.",
  },
  {
    role: "Quartermaster",
    holder: "Shravya and Shripranav",
    blurb: "Keeps the troop's camping gear inventoried, repaired, and ready to load.",
  },
  {
    role: "Scribe",
    holder: "Anvay",
    blurb: "Records attendance and dues, and keeps the minutes of the Patrol Leaders' Council.",
  },
  {
    role: "Historian & Librarian",
    holder: "Vihaan (historian), Jonah and Aran (librarians)",
    blurb:
      "Keeps the troop's record and its library of handbooks, merit badge pamphlets, and trip reports.",
  },
];

export const adultRoles = [
  {
    role: "Chartered Organization Rep",
    blurb:
      "A member of the Elks who serves on the committee and links the troop to the lodge. Encourages training, helps recruit leaders, and assists with rechartering.",
  },
  {
    role: "Scoutmaster",
    blurb:
      "Oversees the operations of the troop and all assistant Scoutmasters, and reports the troop's status and program to the committee.",
  },
  {
    role: "Assistant Scoutmasters",
    blurb:
      "Each carries a specific function and advises an assigned patrol. One is designated to work directly with the New Scout patrol.",
  },
  {
    role: "Committee Chair",
    blurb: "Chairs the troop committee, the board that supports the troop and its program.",
  },
  { role: "Secretary & Treasurer", blurb: "Troop records, dues, and the camping budget." },
  {
    role: "Advancement Coordinator",
    blurb: "Schedules boards of review and files advancement with the council.",
  },
  {
    role: "Outdoor Activities & Transportation",
    blurb: "Campsites, permits, tour plans, and getting everyone to the trailhead.",
  },
  {
    role: "Court of Honor & Fundraising",
    blurb: "Runs the quarterly courts of honor and the troop's fundraising.",
  },
];

/* -------------------------------------------------------------------------
   ADVANCEMENT
   ---------------------------------------------------------------------- */

export const ranks = [
  { name: "Scout", blurb: "The joining rank. Learn the Oath, Law, and the basics of the troop.", typical: "1–2 months" },
  { name: "Tenderfoot", blurb: "First campout, first knots, and a personal fitness baseline. Troop 394 presents its official troop neckerchief at Tenderfoot.", typical: "2–4 months" },
  { name: "Second Class", blurb: "Navigation, cooking, swimming, and a five-mile hike.", typical: "4–8 months" },
  { name: "First Class", blurb: "The all-round outdoor Scout. Most Scouts reach it in year two.", typical: "9–18 months" },
  { name: "Star", blurb: "Six merit badges, service hours, and four months in a position of responsibility.", typical: "6+ months" },
  { name: "Life", blurb: "Eleven merit badges and six months leading a position of responsibility.", typical: "6+ months" },
  { name: "Eagle", blurb: "21 merit badges and a service project the Scout plans and leads.", typical: "12+ months" },
];

export const eagleSteps = [
  { step: "Reach Life rank", detail: "Hold Life for at least six months while serving in a position of responsibility." },
  { step: "Earn 21 merit badges", detail: "Including all Eagle-required badges. The advancement coordinator tracks your gaps." },
  { step: "Find a project", detail: "A beneficiary outside Scouting, a school, park, camp, or nonprofit." },
  { step: "Write the workbook", detail: "The proposal is approved before you start. Your Eagle mentor reviews every draft." },
  { step: "Lead the project", detail: "You plan it, recruit the crew, and run the workday. Adults advise only." },
  { step: "Application & references", detail: "Submit before your 18th birthday. Five references and a statement of ambitions." },
  { step: "Board of review", detail: "A district board. Then an Eagle court of honor, scheduled just for you." },
];

/** Real Troop 394 Eagle projects, as reported by The Silicon Valley Voice. */
export const eagleProjects = [
  {
    name: "Ben",
    year: "2020",
    headline: "2,063 masks for the community during the pandemic",
    detail:
      "Nicky led 34 volunteers, most of them Troop 394 Scouts, through roughly 700 hours of work producing and distributing masks. He ran the project across two states, teaching the build by instructional video, and oversaw two distribution events at the Santa Clara Farmers' Market, with about 600 masks going to local organizations serving the elderly and people experiencing homelessness.",
    honor: "Eagle court of honor held at the Santa Clara Elks Lodge, June 2021.",
    source: "https://www.svvoice.com/local-scouts-bsa-member-ben-caldwell-soars-to-the-rank-of-the-eagle/",
  },
  {
    name: "Nick",
    year: "2022",
    headline: "14 rebuilt picnic tables for YMCA Camp Campbell",
    detail:
      "Nick led 20 volunteers, Troop 394 Scouts, Santa Clara High School friends, and Scouts from other troops, rebuilding picnic tables at the underfunded camp in the Santa Cruz Mountains over a single weekend. Working from the ADA guidelines, he redesigned several tables to be wheelchair accessible by extending the tabletop past the bench framework.",
    honor:
      "Eagle court of honor March 2024; Santa Clara City Council Member Kathy Watanabe presented a certificate.",
    source: "https://www.svvoice.com/santa-clara-scout-nick-morris-achieves-rank-of-the-eagle/",
  },
];

/* -------------------------------------------------------------------------
   SUMMER CAMP, Camp Hi-Sierra
   Facts and 2027 pricing from camphi-sierra.org, read 2026-08-29.
   ---------------------------------------------------------------------- */

export const summerCamp = {
  name: "Camp Hi-Sierra",
  url: "https://camphi-sierra.org/chs/",
  reserveUrl: "https://camphi-sierra.org/chs/how-to-reserve/",
  contact: "CHS@svmbc.org",
  location: "Long Barn, California, off Highway 108",
  setting:
    "More than 100 acres in the Stanislaus National Forest near Pinecrest Lake, at 5,000 feet, with the North Fork Tuolumne River running through the middle of camp.",
  since: 1949,
  scale: "about 1,500 Scouts each summer",
  notes: [
    "The closest Scouting America camp to Yosemite National Park.",
    "Set in a historic logging camp and run as a fully themed frontier town.",
    "Shooting sports, sailing, welding, metalworking, climbing, and an observatory.",
    "Open year-round now, four-season cabins and a new dining hall.",
  ],
  /** 2027 sessions, read from camphi-sierra.org/chs/how-to-reserve/ on 2026-09-05. */
  weeks2027: [
    { week: 1, dates: "June 20 – 26" },
    { week: 3, dates: "July 4 – 10" },
    { week: 4, dates: "July 11 – 17" },
    { week: 5, dates: "July 18 – 24" },
    { week: 6, dates: "July 25 – 31" },
  ],
  fees2027: {
    youthInCouncil: 850,
    youthOutOfCouncil: 875,
    youthBeforeNov15: 875,
    youthAfterNov15: 900,
    adult: 545,
    adultNote:
      "1–9 Scouts: one adult free (two adults minimum). 10–100 Scouts: two leaders free; additional adults $545.",
  },
} as const;

/** Our feeder Cub Scout pack. */
export const feederPack = {
  name: "Cub Scout packs nearby",
  note: "Webelos from packs around Santa Clara bridge into the troop every spring. In 2026 the troop helped run bridging ceremonies for Pack 32 and Pack 328, and the December Elks Lodge overnight is open to Arrow of Light dens who want to see the troop first.",
};

/* -------------------------------------------------------------------------
   OUTDOORS
   ---------------------------------------------------------------------- */

/** Places Troop 394 has actually camped, from the troop's own trip reports. */
export const localTrips = [
  // Every entry has an outing on the troop mailing list (2025–2026) or in the
  // troop's own trip reports behind it.
  {
    name: "Camp Hi-Sierra",
    location: "Long Barn, CA",
    blurb: "The council camp in the Stanislaus National Forest. A week every July, Bear Paw in the snow every winter, and Adopt-a-Campsite each May.",
  },
  {
    name: "Sunset State Beach",
    location: "Watsonville, CA",
    blurb: "The September campout, every year. Hike in first, then camp by the beach.",
  },
  {
    name: "South Fork American River",
    location: "Camp Lotus, Coloma",
    blurb: "River rafting every April, with a night at Camp Lotus first.",
  },
  {
    name: "Grant Ranch",
    location: "Joseph D. Grant County Park",
    blurb: "Ten-mile hikes, a backpacking weekend, and the Iron Chef campout.",
  },
  {
    name: "Camp Chesebrough",
    location: "Santa Cruz Mountains",
    blurb: "Pioneer District Camporee each spring, patrol against patrol.",
  },
  {
    name: "Uvas Canyon",
    location: "Uvas Canyon County Park",
    blurb: "Waterfall trails and an August overnight.",
  },
  {
    name: "Del Valle",
    location: "Del Valle Regional Park, Livermore",
    blurb: "A November campout with Dutch-oven pizza and a lake hike.",
  },
  {
    name: "Pinnacles and Laguna Seca",
    location: "Monterey County",
    blurb: "Kayaking at Laguna Seca in October 2026 and Pinnacles in November.",
  },
  {
    name: "Yosemite and Sequoia",
    location: "Sierra Nevada",
    blurb: "Where the troop camped through the 2010s. Both are on the list to go back to.",
  },
];

export const gearList = [
  {
    category: "The Ten Essentials",
    items: [
      "Pocketknife (Totin' Chip required)",
      "First aid kit",
      "Extra clothing",
      "Rain gear",
      "Water bottle",
      "Flashlight or headlamp",
      "Trail food",
      "Matches and fire starter",
      "Sun protection",
      "Map and compass",
    ],
  },
  {
    category: "Class A field uniform",
    items: [
      "Scout shirt, long or short sleeve",
      "Scout trousers or shorts",
      "Neckerchief and slide, presented at the bridging ceremony",
      "Scout belt and Scout socks",
      "Any closed-toe shoe or boot, no sandals at Scouting events",
      "Scout hat optional; the mesh Scout cap is the only one authorized",
    ],
  },
  {
    category: "Class B & the Uniform Bank",
    items: [
      "Scout T-shirt with Scout trousers or shorts",
      "Worn for summer meetings and travel to and from events",
      "Full Class A required for courts of honor",
      "The troop runs a Uniform Bank. Ask before you buy anything",
      "Borrow a pack and bag for the first campouts",
    ],
  },
];

/* -------------------------------------------------------------------------
   RESOURCES
   ---------------------------------------------------------------------- */

export const resourceLinks = [
  { label: "Annual Health & Medical Record (Parts A, B, C)", href: "https://www.scouting.org/health-and-safety/ahmr/", note: "Required for every Scout and adult. Parts A & B annually; Part C for any event over 72 hours, including summer camp." },
  { label: "Guide to Safe Scouting", href: "https://www.scouting.org/health-and-safety/gss/", note: "The rulebook for every activity we run, including how to report a concern." },
  { label: "Youth Protection Training (my.Scouting)", href: "https://my.scouting.org/", note: "Required for all registered adults, every two years. Free, online, and taken here." },
  { label: "Scoutbook", href: "https://scoutbook.scouting.org/", note: "Advancement, attendance, and payments." },
  { label: "Merit Badge Requirements", href: "https://www.scouting.org/skills/merit-badges/", note: "The full list of current badges and requirements." },
  { label: "Eagle Scout Workbook", href: "https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/eagle-scout-workbook/", note: "Start here before you plan a project." },
  { label: "Scout Shop", href: "https://www.scoutshop.org/", note: "Handbooks, uniforms, and insignia." },
  { label: "Silicon Valley Monterey Bay Council", href: "https://svmbc.org/", note: "Our council, camps, training, and calendars. Formerly the Santa Clara County Council." },
  { label: "Pioneer District", href: "https://svmbc.org/districts/pioneer/", note: "Roundtables, Camporee, and district advancement." },
  { label: "Camp Hi-Sierra", href: "https://svmbc.org/", note: "Our council summer camp at Long Barn, where the troop goes each July." },
  { label: "Be A Scout", href: "https://beascout.scouting.org/", note: "The national unit finder. This is where Troop 394's official record lives." },
];

/** The troop's own forms, as listed on the legacy site. */
export const troopForms = [
  { label: "Permission Slip", note: "Signed and returned at the meeting before every campout." },
  { label: "Scout Information Form", note: "One per Scout, updated each year at recharter." },
  { label: "Driver Information Form", note: "Required before you drive Scouts anywhere." },
  { label: "Expense Reimbursement", note: "For adults who front costs for a campout or event." },
  { label: "Activity Consent Form", note: "Parent or guardian approval for specific activities." },
  { label: "Tour Plan Worksheet", note: "Filed by leaders before travel, per BSA policy." },
];

/**
 * The troop runs a Uniform Bank, a request form for donated uniform parts,
 * open to Cub Scouts, Scouts BSA, Venturers, and Varsity Scouts.
 */
export const uniformBank = {
  note: "Ask before you buy anything. The troop keeps donated shirts, neckerchiefs, slides, and pants, and the request form covers Cub Scout, Scouts BSA, Venturing, and Varsity units.",
};

export const dues = {
  /** Published on beascout.org for a youth joining Troop 394. */
  joinCost: 109,
  note: "That covers national and council registration. Campouts are paid per trip and summer camp is billed by the camp. If cost is a problem, tell the Scoutmaster.",
};

export const faqs = [
  {
    q: "Can we visit before joining?",
    a: `Yes, and we prefer it. Come to any ${troop.meeting.day} meeting at ${troop.meeting.time}. No forms, no commitment, just show up and watch a meeting run.`,
  },
  {
    q: "Who can join Troop 394?",
    a: "Youth in grades 5 through 12. Webelos crossing over at age 10½ or older join the New Scout patrol; older youth or those with previous Scouting experience are placed in a patrol with others of similar age and skill.",
  },
  {
    q: "What about girls?",
    a: `${troop.linkedTroop.note} Talk to us and we will introduce you to the right troop for your Scout.`,
  },
  {
    q: "How much time does this take?",
    a: `A ${troop.meeting.day} evening each week during the school year, most ${troop.meeting.day}s in summer, plus an outing each month and a week at summer camp.`,
  },
  {
    q: "What does it cost?",
    a: `Scouting America lists $${dues.joinCost} for a youth to join Troop 394. ${dues.note}`,
  },
  {
    q: "Do parents have to volunteer?",
    a: "Scouting is a family activity and the troop actively encourages parents to be involved. The committee meets the first Tuesday of each month and always needs drivers, merit badge counselors, and committee help. Training is free and online.",
  },
  {
    q: "What gear do we need on day one?",
    a: "A Scout Handbook. That is genuinely it, the troop's Uniform Bank can help with the uniform, and you can borrow a pack and sleeping bag for the first couple of campouts before spending money.",
  },
  {
    q: "Is my Scout safe?",
    a: "Our chartered organization background-checks and approves every adult leader before they serve. All registered adults complete Youth Protection Training, we run two-deep leadership on every activity, and a current health form is on file for every participant.",
  },
];

export const joinSteps = [
  { title: "Come to a meeting", body: `Any ${troop.meeting.day}, ${troop.meeting.time}, at ${troop.meeting.venue}. Wear whatever you own, no uniform needed for a visit.` },
  { title: "Go on a campout", body: "Come along on the next one as a guest. This is the real test of whether Scouting fits your family." },
  { title: "Fill out the application", body: "The Scouts BSA youth application plus Health Record Parts A & B. We will walk you through it." },
  { title: "Get a Scout Handbook", body: "The one thing to buy on day one. Ask about the Uniform Bank before you buy anything else." },
  { title: "Join a patrol", body: "New Scouts form their own patrol with an assistant Scoutmaster assigned to them and a Troop Guide for the first year." },
];

/* -------------------------------------------------------------------------
   EAGLE HONOR ROLL
   Two sources, both public:
   [EAGLEROOM] the troop's own "Eagle Room" page on troop-394.org, which listed
               every Eagle earned in Troop 394 from 1996 to 2005.
   [SVMBC]     the council's published recognition programmes, which name the
               Eagle Scout class for each year by unit.
   ---------------------------------------------------------------------- */

export type EagleEntry = { name: string; year: number; troop: "394" | "2394" };

/** [EAGLEROOM] The troop's first decade of Eagle Scouts, as the troop listed them. */
export const eagleHonorRollHistoric: EagleEntry[] = [
  { name: "David Date", year: 2005, troop: "394" },
  { name: "Brendan Lee", year: 2004, troop: "394" },
  { name: "Jerry Johnson", year: 2004, troop: "394" },
  { name: "Ron Bracken", year: 2004, troop: "394" },
  { name: "David Thibodeau", year: 2001, troop: "394" },
  { name: "James T. Twiddy", year: 2000, troop: "394" },
  { name: "Jae Young Chang", year: 2000, troop: "394" },
  { name: "Neal Gossard", year: 1999, troop: "394" },
  { name: "Gabriel Moreland", year: 1998, troop: "394" },
  { name: "John Thibodeau", year: 1997, troop: "394" },
  { name: "Jeff Chandler", year: 1997, troop: "394" },
  { name: "Anthony Balbiani", year: 1997, troop: "394" },
  { name: "Augustine Alvarez", year: 1996, troop: "394" },
];

/**
 * [SVMBC] Eagle Scout classes named in the council's recognition programmes.
 * Class of 2023 from the 2024 Recognition Dinner programme; class of 2025 from
 * the 2026 recognition event held at the Santa Clara Marriott on 2 May 2026.
 */
export const eagleHonorRollRecent: EagleEntry[] = [
  // 2025 entries confirmed by the troop's own "Newest Eagle Scout" and Court of
  // Honor emails. Robert and Charaka had their Court of Honor on 1 June 2025.
  { name: "Adriana", year: 2025, troop: "2394" },
  { name: "Robert", year: 2025, troop: "394" },
  { name: "Charaka", year: 2025, troop: "394" },
  { name: "Eamonn", year: 2025, troop: "394" },
  { name: "Joshua", year: 2025, troop: "394" },
  { name: "Skylar", year: 2025, troop: "394" },
  { name: "Sreeya", year: 2025, troop: "2394" },
  { name: "Ioan", year: 2023, troop: "394" },
  { name: "Zachary", year: 2023, troop: "394" },
  { name: "Nicholas", year: 2023, troop: "394" },
  { name: "Aminah", year: 2023, troop: "2394" },
  { name: "Sofia", year: 2023, troop: "2394" },
];

/** Everything we can source, newest first. */
export const eagleHonorRoll: EagleEntry[] = [
  ...eagleHonorRollRecent,
  ...eagleHonorRollHistoric,
].sort((a, b) => b.year - a.year);

/**
 * A third Eagle project reported by the local press, alongside the two in
 * `eagleProjects` above.
 */
export const eagleProjectNicky = {
  name: "Nicky",
  year: "2019",
  headline: "A safer workshop for the Roberta Jones Junior Theatre",
  detail:
    "Nicky rebuilt the set-building workspace at the Roberta Jones Junior Theatre, a City of Santa Clara Parks and Recreation programme. He designed vertical wood shelving and built a mobile chopsaw table, fixing safety and access problems the volunteer set designers had lived with for years. The project ran to about 147 hours, planned from September 2018 and finished in February 2019.",
  quote: "One of the things I've learned from the Eagle process is self-discipline and leading through humility.",
  honor:
    "Eagle court of honor at the Santa Clara Elks Lodge, November 2019. Mayor Lisa Gillmor and Council Member Kathy Watanabe presented a city proclamation.",
  source: "https://www.svvoice.com/santa-clara-resident-nicky-caldwell-receives-an-eagle-scout-award/",
};

/* -------------------------------------------------------------------------
   TRADITIONS
   Recovered from fifteen years of the troop's own photo albums, 2011 to 2026,
   plus the troop's trip reports. These are the things the troop does every
   year, not a wish list.
   ---------------------------------------------------------------------- */

export const traditions = [
  // Each one appears in the troop's own emails or trip reports, 2025–2026.
  { name: "Sunset Beach campout", cadence: "Every September", blurb: "A hike in, then a night on the coast. The troop's annual beach trip." },
  { name: "Pancake Breakfast", cadence: "Every September", blurb: "The troop's one fundraiser: a booth at the Santa Clara Art and Wine Festival, Saturday and Sunday mornings." },
  { name: "Parade of Champions", cadence: "Every October", blurb: "Troop 394 leads the opening flag ceremony for the City of Santa Clara, four years running." },
  { name: "Elks dinners", cadence: "Through the year", blurb: "Scouts serve dinner at the lodge that hosts the troop. The troop pays for its meeting space in service, not money." },
  { name: "Elks Lodge overnight", cadence: "Every December", blurb: "A campout at the lodge with the Webelos who are about to join." },
  { name: "Bear Paw", cadence: "Every winter", blurb: "The snow trip to Camp Hi-Sierra. Snowball fights, a snowman, and card games in the mess hall." },
  { name: "Iron Chef", cadence: "Every February", blurb: "Patrols cook against each other at Grant Ranch. No adults at the stove." },
  { name: "Camporee", cadence: "Every spring", blurb: "Patrol against patrol with the rest of the Pioneer District. 2026 was very wet." },
  { name: "River rafting", cadence: "Every April", blurb: "The South Fork of the American River, wetsuits and all." },
  { name: "Adopt-a-Campsite", cadence: "Every May", blurb: "A work weekend getting Camp Hi-Sierra ready for summer. Rank requirements in the evening, the observatory after dark." },
  { name: "Taps Across America", cadence: "Every Memorial Day", blurb: "Taps at 3 PM at the Veterans Memorial in Central Park, four years running." },
  { name: "Summer camp", cadence: "Every July", blurb: "A week at Camp Hi-Sierra. Merit badges by day, campfires by night, the campwide games to finish." },
];

/**
 * Fifteen years of outings, taken from the troop's own album titles.
 * This is the honest answer to "what do you actually do?".
 */
export const outingHistory: { year: number; outings: string[] }[] = [
  { year: 2026, outings: ["Bear Paw snow trip", "Iron Chef campout", "Snow play at Leland", "Camporee", "River rafting", "Scout-O-Rama", "Grant County backpacking", "Adopt-a-campsite", "Coyote Hills hike", "Horseback riding", "Mini golf", "Elks Lodge campouts", "Camp Hi-Sierra", "Picchetti Ranch hike", "Grant Ranch"] },
  { year: 2025, outings: ["Bowling", "Egyptian Museum and Elks campout", "Snow and ski trip", "River rafting", "Seacliff Beach", "Camp Hi-Sierra", "Uvas Canyon", "Pancake Breakfast", "Sunset Beach", "Mini golf and Elks campout", "Del Valle", "December Elks overnight", "Street cleanup"] },
  { year: 2024, outings: ["Pancake Breakfast", "Sunset Beach", "Ski trip", "Pinnacles", "Grant Ranch", "Ed Levin Park", "Camp Hi-Sierra", "Castle Rock backpacking", "Bear Paw"] },
  { year: 2023, outings: ["Sunset Beach", "June kayaking", "Camporee", "River rafting", "Lake Chesbro", "Grant Ranch", "Fishing outing", "Camp Hi-Sierra", "Backpacking", "Adopt-a-campsite"] },
  { year: 2022, outings: ["Sunset Beach", "Snow trip", "Iron Chef", "Camp Hi-Sierra", "Camporee", "Art and Wine Festival", "Mount Umunhum", "Street cleanup", "River rafting", "Presidio day hike", "Pinnacles", "Parade of Champions"] },
  { year: 2021, outings: ["Camp Hi-Sierra", "Troop camporee", "Sunol backpacking", "Pack 32 bridging", "Mount Umunhum", "Elks street cleanup", "Elks campout", "Adopt-a-campsite"] },
  { year: 2020, outings: ["Sunset Beach", "Pinnacles", "Horse riding campout", "Backpacking", "Wilderness survival", "Virtual campout", "Fishing", "CHS work weekend"] },
  { year: 2019, outings: ["District Camporee", "Skyline to the Sea", "Mount Saint Helena", "Del Valle", "Uvas Canyon", "Salinas hike and bike", "Pancake Breakfast", "Mount Umunhum", "Memorial Park", "Iron Chef", "Grant Ranch", "Camp Hi-Sierra", "Big Basin backpacking", "Alum Rock", "49ers color guard", "20-mile hike"] },
  { year: 2018, outings: ["Sunset Beach", "Mammoth Lakes", "Kayaking in Morro Bay", "Camp Hi-Sierra", "China Camp", "Camporee", "Art and Wine Festival", "Mount Umunhum", "Bear Paw", "Jamboree on the Air"] },
  { year: 2017, outings: ["Wilderness survival", "Mount Wittenberg", "Mount Madonna", "Mission Peak", "Camp Hi-Sierra", "Camporee", "Adopt-a-campsite"] },
  { year: 2016, outings: ["Backpacking", "Wilderness survival", "Ski trip", "Pinnacles", "Mount Diablo", "Elks campout", "Earthquake hike", "Camp Hi-Sierra"] },
  { year: 2015, outings: ["Wilderness survival", "Webelos campout", "Uvas Canyon", "Sequoia", "Mount Tamalpais", "Iron Chef", "Elks campout", "Camp Hi-Sierra", "Camporee", "Andrew Molera", "Adopt-a-campsite"] },
];

/** Local shops that give Scouts a discount, from the troop's own links page. */
export const gearShops = [
  // Places Bay Area Scouting families use. Ask in store whether a Scout discount
  // applies; the troop does not have an arrangement with any of them.
  { name: "Scout Shop", note: "Uniforms, handbooks, and insignia", where: "San Jose" },
  { name: "Mel Cotton's Sporting Goods", note: "Long-running local outfitter", where: "San Jose" },
  { name: "Sports Basement", note: "Packs, bags, and boots", where: "Sunnyvale and Campbell" },
  { name: "REI", note: "Co-op member dividend on what you buy", where: "Mountain View and San Jose" },
];

/**
 * The troop's own packing list, from troop-394.org. Reproduced because it is
 * specific to how this troop camps, not a generic list.
 */
export const packingList = {
  pocket: [
    "Nylon cord, about 25 feet",
    "Matches in a waterproof case",
    "Pocket knife",
    "Compass",
    "Whistle",
    "Map of the area",
    "Signed permission slip",
    "Any personal prescription medicine",
  ],
  camping: [
    "Pack with a hip belt that actually fits",
    "Waterproof pack cover or a large bin bag",
    "Sleeping bag rated to 20°F, in a stuff sack",
    "Foam sleeping pad",
    "Tent with a ground cloth",
    "Flashlight with spare batteries",
    "One to two litres of water",
    "Personal first aid kit",
    "Bowl, cup, spoon and fork",
  ],
  clothing: [
    "Rain jacket and rain trousers",
    "Waterproof hiking boots",
    "Lightweight camp shoes",
    "Wool or hiking socks",
    "Long trousers and a shirt",
    "Long thermal underwear unless it is warm",
    "Fleece or wool sweater",
    "Warm hat and gloves",
  ],
  leaveAtHome: [
    "Radios, games consoles, and anything with a screen",
    "Sheath knives",
    "Hatchets, axes, and saws",
    "Umbrellas",
    "Fireworks",
  ],
  tentNote:
    "Bring your own tent, share with another Scout, or ask your Patrol Leader for a troop tent.",
};

/** How the troop raises money. */
export const fundraising = {
  headline: "Pancake Breakfast at the Santa Clara Art and Wine Festival",
  detail:
    "The troop's only fundraiser is its own pancake breakfast, run from a booth in the Pavilion at the Santa Clara Art and Wine Festival in Central Park. Scouts and parents cook and serve on the Saturday and Sunday mornings of the festival, and the adults set the booth up on the Friday.",
  otherNote:
    "Money raised keeps camp affordable. If cost is ever the reason a Scout cannot go, tell the Scoutmaster and it gets sorted out quietly.",
};

/** The troop's member portal, where photos and posts actually live. */
export const memberPortal = {
  name: "KindredPix",
  url: "https://www.kindredpix.com/beta/group.php?id=22",
  note: "Troops 394 and 2394 share one private group. Fifteen years of albums, from 2011 to today.",
};
