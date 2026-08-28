/**
 * ============================================================================
 * TROOP 394 — SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every troop-specific fact on this website comes from this one file.
 * To update the site, edit here — you never need to touch a component.
 *
 * All facts below were researched from primary sources on 2026-08-27:
 *   [BEASCOUT]  beascout.scouting.org official unit record for Troop 0394
 *               (unitId 5d8810d2-5b6f-428d-91de-8e7961d6b3bb) — CURRENT
 *   [WIKI]      the troop's own site troop-394.org/wiki (currently HTTP 500;
 *               recovered via the Internet Archive)
 *   [GUIDE]     Troop 394 Operating Guide, Revision 6.0, April 1 2008
 *   [SVVOICE]   The Silicon Valley Voice, svvoice.com
 *   [SVMBC]     svmbc.org — council and district pages
 *
 * Lines tagged  // CONFIRM  have a source conflict or may be stale —
 * check them before you publish.
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
  youthCount: 42,
  /** [BEASCOUT] Scouts BSA — Grades 5-12 */
  grades: "Grades 5–12",

  /**
   * [WIKI] + [BEASCOUT unit description] + the troop Facebook group all name
   * the Elks Lodge. NOTE: beascout's *registered organization* field currently
   * reads "Kiwanis Club of Santa Clara" — that conflict is worth resolving
   * with the council registrar.
   */
  charterOrg: {
    name: "Santa Clara Elks Lodge #2347", // CONFIRM: beascout's org field says "Kiwanis Club of Santa Clara"
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
  meeting: {
    day: "Tuesday",
    time: "7:00 – 8:30 PM",
    cadence: "Every Tuesday during the school year",
    summerCadence: "Every other Tuesday during the summer", // [GUIDE]
    venue: "Sunnyvale Elks Lodge #2128", // CONFIRM: beascout lists this; the troop historically met at the Santa Clara Elks Lodge
    address: "375 N. Pastoria Avenue, Sunnyvale, CA 94085",
    mapQuery: "375 N Pastoria Ave, Sunnyvale, CA 94085",
    arriveNote: "Scouts should arrive no earlier than 6:45 PM and be picked up by 8:45 PM.", // [GUIDE]
    committeeMeeting: "First Tuesday of each month", // [GUIDE]
  },

  /** [BEASCOUT] the unit's published public contact. */
  contact: {
    leadName: "David Scharberg", // CONFIRM before publishing
    email: "dscharberg@gmail.com", // CONFIRM — consider a role address such as info@troop-394.org
    scoutmasterEmail: "dscharberg@gmail.com", // CONFIRM
    newMemberEmail: "dscharberg@gmail.com", // CONFIRM
    phone: "(408) 557-9278",
    /**
     * The troop's own site listed Scoutmaster Bruce Lee
     * (1littledragon@comcast.net, (408) 307-3383) — that page is from ~2016
     * and is likely superseded by the beascout contact above. CONFIRM.
     */
  },

  /** [BEASCOUT] linked girl troop — same place, same day. */
  linkedTroop: {
    number: "2394",
    note: "Troop 394 is linked to girl Troop 2394, which meets at the same place on the same day.",
  },

  social: {
    facebook: "https://www.facebook.com/groups/troop394/",
    instagram: "",
    youtube: "",
  },

  /** The legacy DokuWiki. Kept for reference; it currently returns HTTP 500. */
  legacySite: "http://troop-394.org/",
} as const;

/* -------------------------------------------------------------------------
   NAVIGATION
   ---------------------------------------------------------------------- */

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const utilityNav: NavChild[] = [
  { label: "Join the Troop", href: "/join" },
  { label: "Calendar", href: "/calendar" },
  { label: "Resources", href: "/resources" },
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
      { label: "Patrols", href: "/about#patrols" },
      { label: "Troop History", href: "/about#history" },
    ],
  },
  {
    label: "Program",
    href: "/program",
    children: [
      { label: "What We Do", href: "/program" },
      { label: "Meetings", href: "/program#meetings" },
      { label: "Patrol Method", href: "/program#patrol-method" },
      { label: "Leadership Development", href: "/program#leadership" },
      { label: "Service & Community", href: "/program#service" },
    ],
  },
  {
    label: "Advancement",
    href: "/advancement",
    children: [
      { label: "Trail to Eagle", href: "/advancement" },
      { label: "Ranks", href: "/advancement#ranks" },
      { label: "Merit Badges", href: "/advancement#merit-badges" },
      { label: "Boards of Review", href: "/advancement#boards-of-review" },
      { label: "Our Eagle Scouts", href: "/advancement#eagle" },
    ],
  },
  {
    label: "Outdoors",
    href: "/outdoors",
    children: [
      { label: "Camping Program", href: "/outdoors" },
      { label: "Summer Camp", href: "/outdoors#summer-camp" },
      { label: "High Adventure", href: "/outdoors#high-adventure" },
      { label: "Gear & Packing", href: "/outdoors#gear" },
      { label: "Leave No Trace", href: "/outdoors#leave-no-trace" },
    ],
  },
  { label: "Calendar", href: "/calendar" },
  {
    label: "Safety",
    href: "/safety",
    children: [
      { label: "Our Safety Commitment", href: "/safety" },
      { label: "Youth Protection", href: "/safety#youth-protection" },
      { label: "Two-Deep Leadership", href: "/safety#two-deep" },
      { label: "Health Forms", href: "/safety#health-forms" },
      { label: "Report a Concern", href: "/safety#report" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Forms & Downloads", href: "/resources" },
      { label: "New Family Guide", href: "/resources#new-families" },
      { label: "Uniform & Dues", href: "/resources#dues" },
      { label: "Useful Links", href: "/resources#links" },
    ],
  },
  { label: "Join", href: "/join" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------
   HOME — HERO SLIDES
   ---------------------------------------------------------------------- */

export const heroSlides = [
  {
    eyebrow: `${troop.city}, California · Chartered ${troop.founded}`,
    title: "Your Scouting adventure starts here.",
    body: `${troop.longName} has been building leaders in ${troop.city} since ${troop.founded}. Come see what a ${troop.meeting.day} night looks like.`,
    cta: { label: "Join Troop 2/394", href: "/join" },
    secondary: { label: "Visit a Meeting", href: "/contact" },
    scene: "forest" as const,
  },
  {
    eyebrow: "Scout-led since 1993",
    title: "The Scouts run this troop. Adults keep it safe.",
    body: "Troop, patrol, and Patrol Leaders' Council meetings, camping trips, and day trips are run by youth leaders — not by the adults. That is troop policy, in writing.",
    cta: { label: "See the Program", href: "/program" },
    secondary: { label: "Meet Our Leaders", href: "/about#youth-leadership" },
    scene: "ridge" as const,
  },
  {
    eyebrow: "A campout every month, a week at camp every July",
    title: "The outdoors is our classroom.",
    body: "Yosemite in the rain, Sequoia and Moro Rock, wilderness survival on the coast, snow camping in the Sierra, and a week at Camp Hi-Sierra every summer.",
    cta: { label: "Where We Camp", href: "/outdoors" },
    secondary: { label: "View Calendar", href: "/calendar" },
    scene: "lake" as const,
  },
];

/* -------------------------------------------------------------------------
   HOME — "TROOP 394 IS THE DIFFERENCE"
   ---------------------------------------------------------------------- */

export const differenceCards = [
  {
    title: "Lead something real",
    body: "The Senior Patrol Leader is elected by the Scouts and runs the weekly meeting. He sets the Patrol Leaders' Council agenda and appoints the other youth leaders. Adults advise; they do not run it.",
    scene: "leadership" as const,
  },
  {
    title: "Get genuinely outdoors",
    body: "Troop policy is a camping trip or special event every single month, plus at least one full week of long-term camp each summer. Not a field trip — patrols plan, pack, and cook it.",
    scene: "camping" as const,
  },
  {
    title: "Finish what you start",
    body: "Courts of honor are held quarterly so no Scout waits months for recognition, and Eagle courts of honor are scheduled separately for each Scout who earns it.",
    scene: "eagle" as const,
  },
];

export const differenceStats = [
  { value: `${troop.youthCount}`, label: "Scouts in the troop today" },
  { value: `${new Date().getFullYear() - troop.founded}`, label: "Years serving Santa Clara" },
  { value: "12", label: "Campouts a year" },
  { value: "4", label: "Courts of honor a year" },
];

/* -------------------------------------------------------------------------
   HOME — PROGRAM TILES
   ---------------------------------------------------------------------- */

export const programTiles = [
  {
    name: "New Scouts",
    age: "Grade 5 · Age 10½+",
    href: "/join",
    tone: "gold" as const,
    blurb:
      "Webelos crossovers form a New Scout patrol with an assistant Scoutmaster assigned to them directly.",
  },
  {
    name: "Troop 394",
    age: "Grades 5–12 · boys",
    href: "/program",
    tone: "red" as const,
    blurb: "The core program — patrols, weekly meetings, monthly campouts, and rank advancement.",
  },
  {
    name: "Troop 2394",
    age: "Grades 5–12 · girls",
    href: "/join#linked-troop",
    tone: "forest" as const,
    blurb: "Meets the same night, in the same place. Same program, same campouts, separate troop.",
  },
  {
    name: "Backpacking Group",
    age: "Older Scouts",
    href: "/outdoors#high-adventure",
    tone: "navy" as const,
    blurb: "The troop's crew for longer treks and high adventure trips beyond the monthly campout.",
  },
  {
    name: "Adult Volunteers",
    age: "Parents & Mentors",
    href: "/about#adult-leaders",
    tone: "periwinkle" as const,
    blurb: "Committee roles, merit badge counselors, and drivers. Training is free and online.",
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
export const troopMission = `Troop 394 exists to give the youth of ${troop.city} the best Scouting experience possible — a program that develops them physically, mentally, and morally, built around the Scout Oath and Law, and run by the Scouts themselves with adults present as advisers.`;

/* -------------------------------------------------------------------------
   VALUE PILLARS
   ---------------------------------------------------------------------- */

export const valuePillars = [
  {
    title: "Prepared. For Life.",
    body: "Fire building and first aid are the visible part. The real curriculum is judgment under pressure — and the troop's own guide says it plainly: give the Scouts as much freedom as possible, and just enough adult authority to keep them safely focused.",
    icon: "compass" as const,
  },
  {
    title: "Safety first, always",
    body: "Adult leaders are approved and background-checked by our chartered organization before they serve. Every registered adult completes Youth Protection Training, and two-deep leadership applies to every activity.",
    icon: "shield" as const,
  },
  {
    title: "Become your best self",
    body: "Scouts work merit badges from cooking and camping to welding and blacksmithing at Camp Hi-Sierra — and Troop 394 has taken first place in the camp-wide games two years running.",
    icon: "star" as const,
  },
  {
    title: "Fun for the whole family",
    body: "Courts of honor are family affairs and parents are encouraged to attend. Scouting is a family activity, and the troop actively encourages parents to be involved in their Scout's development.",
    icon: "tent" as const,
  },
];

/* -------------------------------------------------------------------------
   TESTIMONIALS — real, sourced quotes
   ---------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "Doing my Eagle project was my way of helping my community stay safe. The entire Eagle project is led by the Scout.",
    name: "Ben Caldwell",
    role: "Eagle Scout, Troop 394 · Silicon Valley Voice, 2021",
  },
  {
    quote:
      "I have been going to Camp Campbell ever since I was a little kid. When I found out they were having trouble with their picnic tables falling apart, I wanted to help.",
    name: "Nick Morris",
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

export const calendar: TroopEvent[] = [
  {
    date: "2026-09-01",
    title: "Troop Committee Meeting",
    kind: "Meeting",
    location: troop.meeting.venue,
    note: "Committee meets the first Tuesday of every month. Parents welcome.",
  },
  {
    date: "2026-09-08",
    title: "Fall Kickoff Troop Meeting",
    kind: "Meeting",
    location: troop.meeting.venue,
    note: "Back to weekly Tuesdays. New family welcome and the year's calendar handout.",
  },
  {
    date: "2026-09-26",
    endDate: "2026-09-27",
    title: "Annual Wilderness Survival Campout",
    kind: "Campout",
    location: "Monterey County coast",
    note: "A troop tradition: build your own shelter from a tarp and sticks, then a fire-building contest.",
  },
  {
    date: "2026-10-16",
    endDate: "2026-10-18",
    title: "Yosemite Campout",
    kind: "Campout",
    location: "Yosemite National Park",
    note: "Nevada Fall for the hiking group, Yosemite Valley for everyone else. Bring rain gear — ask any Scout why.",
  },
  {
    date: "2026-11-03",
    title: "Fall Court of Honor",
    kind: "Ceremony",
    location: troop.meeting.venue,
    note: "Courts of honor are quarterly and are family affairs. Full field uniform.",
  },
  {
    date: "2026-11-14",
    title: "Service Project — Chartered Organization",
    kind: "Service",
    location: "Santa Clara Elks Lodge",
    note: "The troop gives back to the Elks Lodge that charters us.",
  },
  {
    date: "2026-12-18",
    endDate: "2026-12-19",
    title: "Elks Lodge Campout & Game Night",
    kind: "Campout",
    location: "Santa Clara Elks Lodge",
    note: "The troop's yearly game-night campout: Firem'n Chit, far too much pizza, flag retirement, and a fire that runs to midnight.",
  },
  {
    date: "2027-01-22",
    endDate: "2027-01-24",
    title: "Truckee Ski Expedition",
    kind: "Campout",
    location: "Truckee, Sierra Nevada",
  },
  {
    date: "2027-02-05",
    title: "Scout Sunday",
    kind: "Ceremony",
    location: "Santa Clara",
  },
  {
    date: "2027-02-19",
    endDate: "2027-02-21",
    title: "Bear Paw Snow Campout",
    kind: "Campout",
    location: "Near Bear Valley",
    note: "Cold-weather camping skills, run off the council's Bearpaw winter camping training.",
  },
  {
    date: "2027-03-02",
    title: "Winter Court of Honor",
    kind: "Ceremony",
    location: troop.meeting.venue,
  },
  {
    date: "2027-04-16",
    endDate: "2027-04-18",
    title: "Pioneer District Camporee",
    kind: "Campout",
    location: "Pioneer District",
    note: "Two nights competing against the other troops in the district. Patrols compete as units.",
  },
  {
    date: "2027-05-15",
    title: "Eagle Project Workday",
    kind: "Service",
    location: "Santa Clara",
    note: "Supporting a Life Scout's Eagle project. All hands welcome.",
  },
  {
    date: "2027-06-17",
    endDate: "2027-06-19",
    title: "Sequoia & Kings Canyon Campout",
    kind: "Campout",
    location: "Sequoia National Park",
    note: "Crystal Cave with a ranger, the climb up Moro Rock, and the General Sherman tree.",
  },
  {
    date: "2027-07-11",
    endDate: "2027-07-17",
    title: "Summer Camp — Camp Hi-Sierra",
    kind: "High Adventure",
    location: "Long Barn, Stanislaus National Forest",
    note: "A full week at our council camp. Merit badges, archery, rifle, aquatics, and the camp-wide games.",
  },
  {
    date: "2027-08-13",
    endDate: "2027-08-15",
    title: "Family Camp",
    kind: "Campout",
    location: "TBD",
    note: "Siblings and parents welcome. Meetings run every other Tuesday through the summer.",
  },
];

/* -------------------------------------------------------------------------
   PATROLS / LEADERSHIP  — structure per the Troop Operating Guide
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
  {
    name: "Backpacking group",
    note: "A standing group within the troop for Scouts who want longer treks than the monthly campout.",
  },
];

export const youthPositions = [
  {
    role: "Senior Patrol Leader",
    holder: "Elected by the Scouts",
    blurb:
      "The youth leader of the troop. Sets the agenda and presides at all Patrol Leaders' Council meetings, runs the weekly troop meeting, and appoints the other youth leaders.",
  },
  {
    role: "Assistant Senior Patrol Leader",
    holder: "Appointed by the SPL",
    blurb:
      "Assists in conducting meetings and stands in for the SPL. Responsible for training and directing the quartermaster, scribe, historian, librarian, and instructors.",
  },
  {
    role: "Patrol Leaders",
    holder: "One per patrol",
    blurb:
      "Responsible for their patrol at all times — patrol meetings, troop functions, and representing the patrol at the Patrol Leaders' Council.",
  },
  {
    role: "Troop Guide",
    holder: "An older, experienced Scout",
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
    holder: "Appointed",
    blurb: "Keeps the troop's camping gear inventoried, repaired, and ready to load.",
  },
  {
    role: "Scribe",
    holder: "Appointed",
    blurb: "Records attendance and dues, and keeps the minutes of the Patrol Leaders' Council.",
  },
  {
    role: "Historian & Librarian",
    holder: "Appointed",
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
    blurb: "Chairs the troop committee — the board that supports the troop and its program.",
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
  { step: "Find a project", detail: "A beneficiary outside Scouting — a school, park, camp, or nonprofit." },
  { step: "Write the workbook", detail: "The proposal is approved before you start. Your Eagle mentor reviews every draft." },
  { step: "Lead the project", detail: "You plan it, recruit the crew, and run the workday. Adults advise only." },
  { step: "Application & references", detail: "Submit before your 18th birthday. Five references and a statement of ambitions." },
  { step: "Board of review", detail: "A district board — then an Eagle court of honor, scheduled just for you." },
];

/** Real Troop 394 Eagle projects, as reported by The Silicon Valley Voice. */
export const eagleProjects = [
  {
    name: "Ben Caldwell",
    year: "2020",
    headline: "2,063 masks for the community during the pandemic",
    detail:
      "Caldwell led 34 volunteers — most of them Troop 394 Scouts — through roughly 700 hours of work producing and distributing masks. He ran the project across two states, teaching the build by instructional video, and oversaw two distribution events at the Santa Clara Farmers' Market, with about 600 masks going to local organizations serving the elderly and people experiencing homelessness.",
    honor: "Eagle court of honor held at the Santa Clara Elks Lodge, June 2021.",
    source: "https://www.svvoice.com/local-scouts-bsa-member-ben-caldwell-soars-to-the-rank-of-the-eagle/",
  },
  {
    name: "Nick Morris",
    year: "2022",
    headline: "14 rebuilt picnic tables for YMCA Camp Campbell",
    detail:
      "Morris led 20 volunteers — Troop 394 Scouts, Santa Clara High School friends, and Scouts from other troops — rebuilding picnic tables at the underfunded camp in the Santa Cruz Mountains over a single weekend. Working from the ADA guidelines, he redesigned several tables to be wheelchair accessible by extending the tabletop past the bench framework.",
    honor:
      "Eagle court of honor March 2024; Santa Clara City Council Member Kathy Watanabe presented a certificate.",
    source: "https://www.svvoice.com/santa-clara-scout-nick-morris-achieves-rank-of-the-eagle/",
  },
];

/* -------------------------------------------------------------------------
   OUTDOORS
   ---------------------------------------------------------------------- */

export const highAdventureBases = [
  {
    name: "Philmont Scout Ranch",
    location: "Cimarron, New Mexico",
    blurb: "140,000 acres of backcountry. A 12-day trek with everything on your back.",
    url: "https://www.philmontscoutranch.org/",
  },
  {
    name: "Florida Sea Base",
    location: "Islamorada, Florida",
    blurb: "Live aboard a sailboat, scuba the reef, or kayak the Keys for a week.",
    url: "https://www.bsaseabase.org/",
  },
  {
    name: "Northern Tier",
    location: "Ely, Minnesota",
    blurb: "Canoe the Boundary Waters. Portage everything you own between lakes.",
    url: "https://www.ntier.org/",
  },
  {
    name: "The Summit Bechtel Reserve",
    location: "Glen Jean, West Virginia",
    blurb: "Whitewater, BMX, climbing, and the largest zip line course in the country.",
    url: "https://www.summitbsa.org/",
  },
];

/** Places Troop 394 has actually camped, from the troop's own trip reports. */
export const localTrips = [
  {
    name: "Camp Hi-Sierra",
    location: "Long Barn, CA",
    blurb:
      "Our council camp in the Stanislaus National Forest, and our summer camp every July. Merit badges, archery, rifle, climbing, blacksmithing, and the camp-wide games.",
  },
  {
    name: "Yosemite National Park",
    location: "Sierra Nevada",
    blurb:
      "An October tradition. One group hikes to Nevada Fall, the other explores the Valley. The year the whole campsite flooded is still troop legend.",
  },
  {
    name: "Sequoia & Kings Canyon",
    location: "Three Rivers, CA",
    blurb: "Crystal Cave with a ranger, the climb up Moro Rock, and the General Sherman tree.",
  },
  {
    name: "Truckee & Bear Valley",
    location: "Sierra Nevada",
    blurb: "The winter program — a ski expedition in January and the Bear Paw snow campout.",
  },
  {
    name: "The Monterey coast",
    location: "Big Sur / Carmel",
    blurb:
      "Home of the annual wilderness survival campout, where Scouts build a shelter from a tarp and sticks and hold a fire-building contest.",
  },
  {
    name: "Lexington Reservoir & the coast range",
    location: "Santa Clara County",
    blurb:
      "The troop's cycling trips — a 25-mile day ride, and an overnight ride over the mountains to the ocean.",
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
      "Neckerchief and slide — presented at the bridging ceremony",
      "Scout belt and Scout socks",
      "Any closed-toe shoe or boot — no sandals at Scouting events",
      "Scout hat optional; the mesh Scout cap is the only one authorized",
    ],
  },
  {
    category: "Class B & the Uniform Bank",
    items: [
      "Scout T-shirt with Scout trousers or shorts",
      "Worn for summer meetings and travel to and from events",
      "Full Class A required for courts of honor",
      "The troop runs a Uniform Bank — ask before you buy anything",
      "Borrow a pack and bag for the first campouts",
    ],
  },
];

/* -------------------------------------------------------------------------
   RESOURCES
   ---------------------------------------------------------------------- */

export const resourceLinks = [
  { label: "Annual Health & Medical Record (Parts A, B, C)", href: "https://www.scouting.org/health-and-safety/ahmr/", note: "Required for every Scout and adult. Parts A & B annually; Part C for any event over 72 hours, including summer camp." },
  { label: "Guide to Safe Scouting", href: "https://www.scouting.org/health-and-safety/gss/", note: "The rulebook for every activity we run." },
  { label: "Youth Protection Training", href: "https://www.scouting.org/training/youth-protection/", note: "Required for all registered adults, every two years. Free and online." },
  { label: "Scoutbook", href: "https://scoutbook.scouting.org/", note: "Advancement, attendance, and payments." },
  { label: "Merit Badge Requirements", href: "https://www.scouting.org/skills/merit-badges/", note: "The full list of current badges and requirements." },
  { label: "Eagle Scout Workbook", href: "https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/eagle-scout-workbook/", note: "Start here before you plan a project." },
  { label: "Scout Shop", href: "https://www.scoutshop.org/", note: "Handbooks, uniforms, and insignia." },
  { label: "Silicon Valley Monterey Bay Council", href: "https://svmbc.org/", note: "Our council — camps, training, and calendars. Formerly the Santa Clara County Council." },
  { label: "Pioneer District", href: "https://svmbc.org/districts/pioneer/", note: "Roundtables, Camporee, and district advancement." },
  { label: "Camp Hi-Sierra", href: "https://svmbc.org/", note: "Our council summer camp at Long Barn, where the troop goes each July." },
  { label: "Be A Scout", href: "https://beascout.scouting.org/", note: "The national unit finder — this is where Troop 394's official record lives." },
  { label: "Troop 394 on Facebook", href: "https://www.facebook.com/groups/troop394/", note: "The troop's parent and Scout group." },
];

export const dues = {
  /** [BEASCOUT] published cost for a youth to join. */
  joinCost: 109,
  /** [GUIDE, Rev 6.0 2008] historical troop dues, paid at rechartering. */
  historicalTroopDues: 60,
  note: "Scouts also share the cost of each camping trip, and summer camp at Camp Hi-Sierra is billed separately. The Operating Guide is explicit about this: financial problems are understood — tell the Scoutmaster and a payment plan will be worked out so your Scout stays active. The troop also runs a Uniform Bank so no family has to buy a uniform to get started.",
  breakdown: [
    { item: "National and council registration", amount: 85 },
    { item: "Troop 394 dues", amount: 24 },
  ],
};

export const faqs = [
  {
    q: "Can we visit before joining?",
    a: `Yes, and we prefer it. Come to any ${troop.meeting.day} meeting at ${troop.meeting.time}. No forms, no commitment — just show up and watch a meeting run.`,
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
    a: `A ${troop.meeting.day} evening each week during the school year — every other ${troop.meeting.day} in the summer — plus a campout or special event each month and a week at summer camp.`,
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
    a: "A Scout Handbook. That is genuinely it — the troop's Uniform Bank can help with the uniform, and you can borrow a pack and sleeping bag for the first couple of campouts before spending money.",
  },
  {
    q: "Is my Scout safe?",
    a: "Our chartered organization background-checks and approves every adult leader before they serve. All registered adults complete Youth Protection Training, we run two-deep leadership on every activity, and a current health form is on file for every participant.",
  },
];

export const joinSteps = [
  { title: "Come to a meeting", body: `Any ${troop.meeting.day}, ${troop.meeting.time}, at ${troop.meeting.venue}. Wear whatever you own — no uniform needed for a visit.` },
  { title: "Go on a campout", body: "Come along on the next one as a guest. This is the real test of whether Scouting fits your family." },
  { title: "Fill out the application", body: "The Scouts BSA youth application plus Health Record Parts A & B. We will walk you through it." },
  { title: "Get a Scout Handbook", body: "The one thing to buy on day one. Ask about the Uniform Bank before you buy anything else." },
  { title: "Join a patrol", body: "New Scouts form their own patrol with an assistant Scoutmaster assigned to them and a Troop Guide for the first year." },
];
