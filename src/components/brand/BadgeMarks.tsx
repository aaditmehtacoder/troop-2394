import type { SVGProps } from "react";

/**
 * A mark for every merit badge we list.
 *
 * The real badges are embroidered patches and their artwork is the BSA's, so
 * these are drawn here instead: the same 24px line style as the icons in
 * Marks.tsx, one per badge, each one legible at 14px inside a pill.
 *
 * `badgeMark(name)` matches the exact strings used on the advancement page,
 * including the "or" badges ("Swimming, Hiking, or Cycling"), and falls back to
 * a plain patch outline for anything it does not know, so adding a badge to a
 * list never leaves a hole.
 */

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, ...p }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...p}>
      {children}
    </svg>
  );
}

/* --------------------------------------------------------- Eagle-required --- */

export const MarkFirstAid = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" {...s} />
    <path d="M9 6V4.5h6V6M12 10v5M9.5 12.5h5" {...s} />
  </Svg>
);

export const MarkCommunity = (p: P) => (
  <Svg {...p}>
    <path d="M3 20V10l5-3 5 3v10" {...s} />
    <path d="M13 20V12l4.5-2.5L21 12v8M3 20h18" {...s} />
    <path d="M6.5 13.5h3M6.5 16.5h3M16.5 15h1.5" {...s} />
  </Svg>
);

export const MarkNation = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.2 13.6 6H10.4L12 3.2Z" {...s} />
    <path d="M9 9.5a3 3 0 0 1 6 0" {...s} />
    <path d="M6.5 9.5h11M7.5 9.5V17M12 9.5V17M16.5 9.5V17M4.5 17h15M3.5 20.5h17" {...s} />
  </Svg>
);

export const MarkWorld = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" {...s} />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" {...s} />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" {...s} />
  </Svg>
);

export const MarkSociety = (p: P) => (
  <Svg {...p}>
    <circle cx="8.5" cy="8" r="2.7" {...s} />
    <circle cx="16" cy="9.5" r="2.2" {...s} />
    <path d="M3.5 19c0-2.8 2.2-5 5-5s5 2.2 5 5" {...s} />
    <path d="M14.5 14.4A4.4 4.4 0 0 1 20.5 18.5" {...s} />
  </Svg>
);

export const MarkCommunication = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 6.5A2 2 0 0 1 5.5 4.5h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8l-4.5 3v-9Z" {...s} />
    <path d="M17.5 8h1a2 2 0 0 1 2 2v7.5L17 15h-3" {...s} />
  </Svg>
);

export const MarkCooking = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 11h15v3.5a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5V11Z" {...s} />
    <path d="M19.5 12.5h1.2a1.8 1.8 0 0 1 0 3.6h-1.4M3 11h18" {...s} />
    <path d="M9 7.5c0-1 1-1.4 1-2.5M13 7.5c0-1 1-1.4 1-2.5" {...s} />
  </Svg>
);

export const MarkFitness = (p: P) => (
  <Svg {...p}>
    <path d="M12 20s-7.2-4.4-7.2-9.3A4 4 0 0 1 12 8.2a4 4 0 0 1 7.2 2.5C19.2 15.6 12 20 12 20Z" {...s} />
    <path d="M5.5 13.2h3l1.4-2.4 1.8 4 1.4-2.6.9 1h3.4" {...s} />
  </Svg>
);

export const MarkEmergency = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" {...s} />
    <circle cx="12" cy="12" r="3.6" {...s} />
    <path d="m6.2 6.2 3.3 3.3M17.8 6.2l-3.3 3.3M6.2 17.8l3.3-3.3M17.8 17.8l-3.3-3.3" {...s} />
  </Svg>
);

export const MarkEnvironment = (p: P) => (
  <Svg {...p}>
    <path d="M20 4.5c0 8.3-4.2 12.4-9.4 12.4A5.1 5.1 0 0 1 5.5 12C5.5 6.8 11 4.5 20 4.5Z" {...s} />
    <path d="M4 20c1.6-4.4 4.6-7.8 8.8-10.2" {...s} />
  </Svg>
);

export const MarkManagement = (p: P) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6.5" rx="7" ry="2.8" {...s} />
    <path d="M5 6.5v5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-5" {...s} />
    <path d="M5 11.5v5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-5" {...s} />
  </Svg>
);

export const MarkSwimHikeBike = (p: P) => (
  <Svg {...p}>
    <path d="M2.8 15.5c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4M2.8 19.4c1.6 0 1.6 1.4 3.2 1.4" {...s} />
    <circle cx="15.5" cy="6" r="1.8" {...s} />
    <path d="M5 12.6 9.5 10l3 2.2 3.6-1.2" {...s} />
  </Svg>
);

export const MarkCamping = (p: P) => (
  <Svg {...p}>
    <path d="M12 4 3 19h18L12 4Z" {...s} />
    <path d="M12 4v15M12 19l4-7M12 19l-4-7" {...s} />
  </Svg>
);

export const MarkFamily = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 11 12 4l8.5 7" {...s} />
    <path d="M5.5 9.6V20h13V9.6" {...s} />
    <path d="M12 17.5s-2.9-1.8-2.9-3.7a1.6 1.6 0 0 1 2.9-1 1.6 1.6 0 0 1 2.9 1c0 1.9-2.9 3.7-2.9 3.7Z" {...s} />
  </Svg>
);

/* ------------------------------------------------- popular at Troop 394 --- */

export const MarkSurvival = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5c1.6 3 .3 4.2-.5 5.6-.8 1.4-.4 2.7.9 3.3 1.2-.7 1.6-2 3-2.2.7 1.3.9 2.6.9 3.6a4.3 4.3 0 1 1-8.6 0c0-3.6 2.6-6.8 4.3-10.3Z" {...s} />
    <path d="M3.5 20.5h17" {...s} />
  </Svg>
);

export const MarkOrienteering = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" {...s} />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" {...s} />
  </Svg>
);

export const MarkClimbing = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 20 9 8.5l3.6 6" {...s} />
    <path d="m11 17.2 3.4-6.2L21.5 20H2.5" {...s} />
    <circle cx="16.8" cy="5" r="2.1" {...s} />
  </Svg>
);

export const MarkKayaking = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 12.5c3.6 3.6 15.4 3.6 19 0-3.6-3.6-15.4-3.6-19 0Z" {...s} />
    <path d="M6 6.5 18 18.5M4.8 5.3l2.4 2.4M19.2 17.3l-2.4 2.4" {...s} />
  </Svg>
);

export const MarkAstronomy = (p: P) => (
  <Svg {...p}>
    <path d="m3.5 14.5 12.2-8 2.8 4.2-12.2 8L3.5 14.5Z" {...s} />
    <path d="M9 17.5 7 21M13.5 14.4 16 18" {...s} />
    <path d="M19 4v2.6M17.7 5.3h2.6" {...s} />
  </Svg>
);

export const MarkProgramming = (p: P) => (
  <Svg {...p}>
    <path d="m8.5 8.5-4.5 4 4.5 4M15.5 8.5l4.5 4-4.5 4" {...s} />
    <path d="m13.5 5-3 14" {...s} />
  </Svg>
);

export const MarkRobotics = (p: P) => (
  <Svg {...p}>
    <rect x="4.5" y="7.5" width="15" height="11" rx="3" {...s} />
    <path d="M12 4v3.5M2.5 12.5h2M19.5 12.5h2" {...s} />
    <circle cx="9" cy="12.5" r="1.3" {...s} />
    <circle cx="15" cy="12.5" r="1.3" {...s} />
    <path d="M9.5 16h5" {...s} />
  </Svg>
);

export const MarkWelding = (p: P) => (
  <Svg {...p}>
    <path d="M14.5 3.5 20 9l-8.5 8.5L6 12l8.5-8.5Z" {...s} />
    <path d="M8.8 14.8 4 19.6" {...s} />
    <path d="M18.5 15.5v3M20.5 17.5h-3" {...s} />
  </Svg>
);

export const MarkFishWildlife = (p: P) => (
  <Svg {...p}>
    <path d="M3 12.5c3-4.5 8.5-5.5 12-3.5 2 1.1 3 2.4 3.5 3.5-.5 1.1-1.5 2.4-3.5 3.5-3.5 2-9 1-12-3.5Z" {...s} />
    <path d="m18.5 9 2.5-2v11l-2.5-2" {...s} />
    <circle cx="7.5" cy="11" r=".9" {...s} />
  </Svg>
);

export const MarkSearchRescue = (p: P) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6" {...s} />
    <path d="m15 15 5.5 5.5" {...s} />
    <path d="M10.5 7.8v5.4M7.8 10.5h5.4" {...s} />
  </Svg>
);

export const MarkBackpacking = (p: P) => (
  <Svg {...p}>
    <path d="M6.5 8.5h11a2 2 0 0 1 2 2v7a2.5 2.5 0 0 1-2.5 2.5h-10A2.5 2.5 0 0 1 4.5 17.5v-7a2 2 0 0 1 2-2Z" {...s} />
    <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" {...s} />
    <path d="M9 13.5h6v3.5H9z" {...s} />
  </Svg>
);

export const MarkSpace = (p: P) => (
  <Svg {...p}>
    <path d="M12 3c3 2.4 4.5 5.6 4.5 9l-2 4.5h-5l-2-4.5C7.5 8.6 9 5.4 12 3Z" {...s} />
    <circle cx="12" cy="10" r="1.8" {...s} />
    <path d="M9.5 16.5 7 19l1.5-4M14.5 16.5 17 19l-1.5-4" {...s} />
  </Svg>
);

/** Anything we have not drawn yet: a plain patch outline. */
export const MarkPatch = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" {...s} />
    <circle cx="12" cy="12" r="5" {...s} />
  </Svg>
);

/* ------------------------------------------------------------- the lookup --- */

const marks: Record<string, (p: P) => React.ReactElement> = {
  "First Aid": MarkFirstAid,
  "Citizenship in the Community": MarkCommunity,
  "Citizenship in the Nation": MarkNation,
  "Citizenship in the World": MarkWorld,
  "Citizenship in Society": MarkSociety,
  Communication: MarkCommunication,
  Cooking: MarkCooking,
  "Personal Fitness": MarkFitness,
  "Emergency Preparedness or Lifesaving": MarkEmergency,
  "Environmental Science or Sustainability": MarkEnvironment,
  "Personal Management": MarkManagement,
  "Swimming, Hiking, or Cycling": MarkSwimHikeBike,
  Camping: MarkCamping,
  "Family Life": MarkFamily,
  "Wilderness Survival": MarkSurvival,
  Orienteering: MarkOrienteering,
  Climbing: MarkClimbing,
  Kayaking: MarkKayaking,
  Astronomy: MarkAstronomy,
  Programming: MarkProgramming,
  Robotics: MarkRobotics,
  Welding: MarkWelding,
  "Fish & Wildlife Management": MarkFishWildlife,
  "Search & Rescue": MarkSearchRescue,
  Backpacking: MarkBackpacking,
  "Space Exploration": MarkSpace,
};

export function badgeMark(name: string) {
  return marks[name] ?? MarkPatch;
}
