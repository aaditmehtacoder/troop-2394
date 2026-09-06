/**
 * The answer the assistant gives when no model is available.
 *
 * Keyword matching against the questions families actually ask. It is not
 * clever, but it is never wrong, and it means the widget is useful on a fresh
 * clone with no API key at all.
 */

import { troop, dues, summerCamp, feederPack } from "@/data/troop";

type Rule = { match: RegExp; answer: string };

const rules: Rule[] = [
  {
    match: /\b(when|what time|meet|meeting|tuesday|night)\b/i,
    answer: `${troop.meeting.cadence}, ${troop.meeting.time}, at ${troop.meeting.venue}, ${troop.meeting.address}. ${troop.meeting.summerCadence}. Visitors are welcome at any meeting.`,
  },
  {
    match: /\b(cost|price|pay|dues|expensive|afford|money|fee)\b/i,
    answer: `It is about $${dues.joinCost} for a youth to join. ${dues.note}`,
  },
  {
    match: /\b(join|sign up|register|start|new scout|visit)\b/i,
    answer: `Come to any Tuesday meeting first. No forms, no uniform, no commitment. If it fits, come on a campout as a guest, then fill in the application. Call ${troop.contact.phone} or email ${troop.contact.email} and we will look out for you.`,
  },
  {
    match: /\b(girl|daughter|2394|female|she)\b/i,
    answer: `${troop.linkedTroop.note} Same night, same place, same programme, same campouts.`,
  },
  {
    match: /\b(summer camp|camp hi.?sierra|chs|week at camp)\b/i,
    answer: `${summerCamp.name}, ${summerCamp.location}. The troop goes for a week every July. ${summerCamp.setting}`,
  },
  {
    match: /\b(cub|pack|webelos|cross ?over|younger)\b/i,
    answer: `${feederPack.note} Webelos crossing over at age 10 and a half join our New Scout patrol.`,
  },
  {
    match: /\b(gear|pack(ing)?|bring|equipment|sleeping bag|tent)\b/i,
    answer: `For a first campout: a sleeping bag rated to 20 degrees, a foam pad, rain gear, boots, a water bottle, a flashlight, and a mess kit. Borrow before you buy, and ask your Patrol Leader about a troop tent.`,
  },
  {
    match: /\b(safe|safety|background|youth protection|supervis)\b/i,
    answer: `Every registered adult is background checked and completes Youth Protection Training, and two-deep leadership applies to every activity. A current health form is on file for everyone who takes part.`,
  },
  {
    match: /\b(eagle|rank|advance|merit badge)\b/i,
    answer: `Scouts advance from Scout to Tenderfoot, Second Class, First Class, Star, Life and Eagle. The troop has a long Eagle honor roll going back to 1996, and Eagle courts of honor are scheduled individually.`,
  },
  {
    match: /\b(camp|outdoor|trip|campout|hike|backpack)\b/i,
    answer: `A campout or special event every month, plus a week at summer camp. Recent years have included Yosemite, Sequoia, Pinnacles, snow camping, river rafting, kayaking, and backpacking at Castle Rock and Big Sur.`,
  },
  {
    match: /\b(parent|volunteer|help|adult|drive)\b/i,
    answer: `Parents are genuinely needed as drivers, merit badge counselors and committee members. Training is free and online, and the committee meets the first Tuesday of each month.`,
  },
  {
    match: /\b(contact|phone|email|call|reach|who)\b/i,
    answer: `${troop.contact.leadName} is the troop contact, on ${troop.contact.phone} or ${troop.contact.email}.`,
  },
];

export function offlineAnswer(question: string): string {
  for (const rule of rules) {
    if (rule.match.test(question)) return rule.answer;
  }
  return `I am not sure about that one. The best answer will come from a leader: ${troop.contact.leadName} on ${troop.contact.phone} or ${troop.contact.email}. You are also welcome to come to any Tuesday meeting, ${troop.meeting.time}, and ask in person.`;
}
