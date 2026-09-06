/**
 * What the "Ask the Troop" assistant is allowed to know.
 *
 * Built from src/data/troop.ts so there is exactly one source of truth. The
 * assistant is told to answer only from this and to hand people to a real
 * leader when it does not know. That keeps it useful without inventing
 * meeting times or promising things the troop has not agreed to.
 */

import {
  troop,
  summerCamp,
  feederPack,
  dues,
  faqs,
  traditions,
  joinSteps,
  packingList,
  fundraising,
  eagleHonorRoll,
  youthPositions,
} from "@/data/troop";
import { getEvents } from "@/lib/content";

export async function buildKnowledge(): Promise<string> {
  const events = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today).slice(0, 10);
  const eagleCount = eagleHonorRoll.length;
  const latestEagleYear = Math.max(...eagleHonorRoll.map((e) => e.year));

  return [
    `TROOP: ${troop.longName}, ${troop.city}, ${troop.state}. Founded ${troop.charteredMonth} ${troop.founded}.`,
    `Linked troops: Troop 394 and Troop 2394 (girls), same night, same place, separate troops. Grades 5 to 12.`,
    `Meets at ${troop.meeting.venue}, ${troop.meeting.address}. The Elks host the troop free of charge and the troop gives service in return; they are not the chartered organization.`,
    `Council: ${troop.council.name} (${troop.council.abbr}), ${troop.district.name}.`,
    ``,
    `MEETINGS: ${troop.meeting.cadence}, ${troop.meeting.time}, at ${troop.meeting.venue}, ${troop.meeting.address}.`,
    `${troop.meeting.summerCadence}.`,
    `Committee meeting: ${troop.meeting.committeeMeeting}. Courts of honor are held about three times a year.`,
    ``,
    `WHAT IS COMING UP (today is ${today}):`,
    ...(upcoming.length > 0
      ? upcoming.map((e) => `- ${e.date}${e.endDate ? ` to ${e.endDate}` : ""}: ${e.title} (${e.kind})${e.location ? `, ${e.location}` : ""}.${e.note ? ` ${e.note}` : ""}`)
      : ["- Nothing on the calendar yet. Point people at the calendar page."]),
    ``,
    `YOUTH LEADERS ${troop.programYear}:`,
    ...youthPositions.map((y) => `- ${y.role}: ${y.holder}`),
    `Visitors are welcome at any meeting with no forms, no uniform and no commitment.`,
    ``,
    `CONTACT: ${troop.contact.leadName}, ${troop.contact.phone}, ${troop.contact.email}.`,
    ``,
    `COST: about $${dues.joinCost} for a youth to join. ${dues.note}`,
    ``,
    `SUMMER CAMP: ${summerCamp.name} at ${summerCamp.location}. ${summerCamp.setting}`,
    `The troop goes for a week every July. In 2026 it took second place in the campwide games.`,
    ``,
    `CUB SCOUTS: ${feederPack.note}`,
    ``,
    `ADVANCEMENT: ${eagleCount} Eagle Scouts are listed on the troop honor roll, most recently in ${latestEagleYear}.`,
    ``,
    `TRADITIONS:`,
    ...traditions.map((t) => `- ${t.name} (${t.cadence}): ${t.blurb}`),
    ``,
    `HOW TO JOIN:`,
    ...joinSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
    ``,
    `FIRST CAMPOUT PACKING, the essentials: ${packingList.camping.slice(0, 6).join(", ")}.`,
    `Leave at home: ${packingList.leaveAtHome.join(", ")}.`,
    `${packingList.tentNote}`,
    ``,
    `FUNDRAISING: ${fundraising.headline}. ${fundraising.detail}`,
    ``,
    `COMMON QUESTIONS:`,
    ...faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`),
  ].join("\n");
}

export const SYSTEM_PROMPT = `You answer questions about Scouts BSA Troop 2/394 in Santa Clara, California, for families thinking about joining and for families already in the troop.

Rules:
- Answer only from the troop facts given below. Never invent a date, a price, a name, or a policy.
- If the answer is not in the facts, say so plainly and point them to the Scoutmaster's phone or email, or suggest visiting a Tuesday meeting.
- Be brief. Two or three short sentences is usually right. Use a list only when the question is genuinely a list.
- Write plainly and warmly, the way an experienced Scout parent would. No marketing language.
- Never use em dashes.
- You are talking to the public, so do not speculate about individual Scouts.

TROOP FACTS:
`;
