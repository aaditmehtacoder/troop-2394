/**
 * ============================================================================
 * WHAT THE ADMIN DASHBOARD CAN EDIT
 * ============================================================================
 * One entry per Supabase table. The dashboard builds its list view, its form,
 * and its validation from this file, so adding a new editable thing means
 * adding an object here and a table in supabase/schema.sql. Nothing else.
 * ==========================================================================*/

export type FieldType = "text" | "textarea" | "richtext" | "date" | "number" | "boolean" | "select" | "url";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: string[];
  /** Shown in the list view as a column. */
  column?: boolean;
};

export type Collection = {
  key: string;
  table: string;
  label: string;
  singular: string;
  blurb: string;
  icon: string;
  /** Column used to sort the list, newest first. */
  orderBy: string;
  ascending?: boolean;
  fields: Field[];
};

export const collections: Collection[] = [
  {
    key: "posts",
    table: "posts",
    label: "Blog posts",
    singular: "post",
    blurb: "Trip reports and news. These appear on the blog and in the feed.",
    icon: "pen",
    orderBy: "event_date",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, column: true },
      { name: "slug", label: "Web address", type: "text", required: true, help: "Lowercase words joined by hyphens, for example yosemite-2027." },
      { name: "event_date", label: "Date of the trip", type: "date", column: true },
      { name: "author", label: "Written by", type: "text", help: "First name only for Scouts.", column: true },
      {
        name: "kind", label: "Type", type: "select", column: true,
        options: ["Trip report", "Summer camp", "Service", "Milestone", "News"],
      },
      { name: "excerpt", label: "One-line summary", type: "textarea", help: "Shown on the blog index. Keep it to a single sentence." },
      { name: "body", label: "The post", type: "richtext", required: true, help: "One paragraph per line. Blank lines are ignored." },
      { name: "cover_url", label: "Cover image address", type: "url" },
      { name: "source_url", label: "Source link", type: "url", help: "Where this came from, if anywhere." },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "events",
    table: "events",
    label: "Calendar",
    singular: "event",
    blurb: "Campouts, meetings, courts of honor. These drive the calendar page.",
    icon: "calendar",
    orderBy: "starts_on",
    fields: [
      { name: "title", label: "Event", type: "text", required: true, column: true },
      { name: "starts_on", label: "Starts", type: "date", required: true, column: true },
      { name: "ends_on", label: "Ends", type: "date", help: "Leave blank for a single day." },
      {
        name: "kind", label: "Type", type: "select", column: true,
        options: ["Campout", "Meeting", "Service", "Ceremony", "Training", "High Adventure"],
      },
      { name: "location", label: "Where", type: "text", column: true },
      { name: "note", label: "Details", type: "textarea" },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "announcements",
    table: "announcements",
    label: "Announcements",
    singular: "announcement",
    blurb: "Short notices for the feed. Pin one to keep it at the top.",
    icon: "megaphone",
    orderBy: "created_at",
    fields: [
      { name: "title", label: "Headline", type: "text", required: true, column: true },
      { name: "body", label: "Detail", type: "textarea" },
      { name: "link", label: "Link", type: "url" },
      { name: "pinned", label: "Pin to the top", type: "boolean", column: true },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "eagles",
    table: "eagles",
    label: "Eagle Scouts",
    singular: "Eagle Scout",
    blurb: "The honor roll. Add a Scout as soon as the board of review passes.",
    icon: "award",
    orderBy: "year",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, column: true },
      { name: "year", label: "Year", type: "number", column: true },
      { name: "troop", label: "Troop", type: "select", options: ["394", "2394"], column: true },
      { name: "project", label: "Project", type: "textarea" },
      { name: "source_url", label: "Source link", type: "url" },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "leaders",
    table: "leaders",
    label: "Leadership",
    singular: "leader",
    blurb: "Youth and adult leaders. Update this after every election.",
    icon: "users",
    orderBy: "sort",
    ascending: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true, column: true },
      { name: "role", label: "Position", type: "text", required: true, column: true },
      { name: "kind", label: "Youth or adult", type: "select", options: ["youth", "adult"], column: true },
      { name: "email", label: "Email", type: "text", help: "Prefer a troop address over a personal one." },
      { name: "sort", label: "Order", type: "number", help: "Lower numbers come first." },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "resources",
    table: "resources",
    label: "Forms and links",
    singular: "resource",
    blurb: "Troop forms, health records, and the links families ask for.",
    icon: "file",
    orderBy: "sort",
    ascending: true,
    fields: [
      { name: "label", label: "Name", type: "text", required: true, column: true },
      { name: "href", label: "Link", type: "url", required: true, column: true },
      {
        name: "category", label: "Group", type: "select", column: true,
        options: ["Troop form", "Health and safety", "Advancement", "Council", "Other"],
      },
      { name: "description", label: "What it is for", type: "textarea" },
      { name: "sort", label: "Order", type: "number" },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
  {
    key: "albums",
    table: "albums",
    label: "Photo albums",
    singular: "album",
    blurb: "Album titles and cover images. The photos themselves stay where they live.",
    icon: "image",
    orderBy: "year",
    fields: [
      { name: "title", label: "Album", type: "text", required: true, column: true },
      { name: "year", label: "Year", type: "number", column: true },
      { name: "cover_url", label: "Cover image address", type: "url" },
      { name: "photo_count", label: "Number of photos", type: "number", column: true },
      { name: "external_id", label: "Album id", type: "text", help: "The id this album has in the troop photo site." },
      { name: "published", label: "Visible on the site", type: "boolean", column: true },
    ],
  },
];

export function findCollection(key: string): Collection | undefined {
  return collections.find((c) => c.key === key);
}

/** A blank row, so the "new" form starts with sensible defaults. */
export function emptyRecord(collection: Collection): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  for (const f of collection.fields) {
    if (f.type === "boolean") row[f.name] = f.name === "published";
    else if (f.type === "number") row[f.name] = 0;
    else if (f.type === "select") row[f.name] = f.options?.[0] ?? "";
    else row[f.name] = "";
  }
  return row;
}
