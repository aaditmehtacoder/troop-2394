/**
 * The choices in the contact form's "What's this about?" menu. The server
 * accepts only these, so the topic that lands in an email subject is always one
 * the troop wrote.
 */
export const contactTopics = [
  "Joining the troop",
  "Visiting a meeting",
  "Volunteering as an adult",
  "Merit badge counseling",
  "Supporting the troop",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];
