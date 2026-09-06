"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  collections,
  emptyRecord,
  type Collection,
  type Field,
} from "@/lib/admin/collections";

type Row = Record<string, unknown> & { id?: string };
type Status = { kind: "idle" } | { kind: "busy" } | { kind: "ok"; text: string } | { kind: "error"; text: string };

export function AdminApp({ name }: { name: string }) {
  const [active, setActive] = useState<Collection>(collections[0]);
  const supabase = useMemo(() => createClient(), []);

  if (!supabase) {
    return (
      <Panel>
        <h2 className="h-four mb-2">Supabase is not connected</h2>
        <p className="text-[15px] text-mute">
          Add <code className="rounded bg-shell px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-shell px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>{" "}
          to <code className="rounded bg-shell px-1.5 py-0.5">.env.local</code>, then restart the dev server.
        </p>
      </Panel>
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[228px_1fr]">
      <nav aria-label="Content types" className="lg:sticky lg:top-6 lg:self-start">
        <p className="mb-3 font-slab text-[11px] font-bold uppercase tracking-[1.2px] text-mute">
          Content
        </p>
        <ul className="flex flex-wrap gap-1.5 lg:flex-col">
          {collections.map((c) => {
            const on = c.key === active.key;
            return (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => setActive(c)}
                  aria-current={on ? "page" : undefined}
                  className={[
                    "w-full rounded-lg px-3.5 py-2.5 text-left font-slab text-[13px] font-bold uppercase tracking-[0.7px] transition",
                    on ? "bg-navy text-white" : "text-slate hover:bg-shell",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-[13px] leading-5 text-mute">
          Signed in as {name}. Changes go live the moment you save.
        </p>
      </nav>

      {/* Keyed so switching content type starts fresh, with no reset effects. */}
      <CollectionPanel key={active.key} collection={active} />
    </div>
  );
}

function CollectionPanel({ collection }: { collection: Collection }) {
  const supabase = useMemo(() => createClient(), []);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [query, setQuery] = useState("");

  const fetchRows = useCallback(async () => {
    if (!supabase) return { rows: [] as Row[], error: null as string | null };
    const { data, error } = await supabase
      .from(collection.table)
      .select("*")
      .order(collection.orderBy, { ascending: collection.ascending ?? false, nullsFirst: false });
    return {
      rows: (data ?? []) as Row[],
      error: error ? readableError(error.message, collection) : null,
    };
  }, [supabase, collection]);

  /** Load the list, and ignore a response that arrives after we moved on. */
  useEffect(() => {
    let cancelled = false;

    fetchRows().then((result) => {
      if (cancelled) return;
      if (result.error) setStatus({ kind: "error", text: result.error });
      else setRows(result.rows);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchRows]);

  /** Refresh after a write. */
  const load = useCallback(async () => {
    const result = await fetchRows();
    if (result.error) setStatus({ kind: "error", text: result.error });
    else setRows(result.rows);
  }, [fetchRows]);

  async function save(row: Row) {
    if (!supabase) return;
    setStatus({ kind: "busy" });

    const payload = toPayload(row, collection);

    const { error } = payload.id
      ? await supabase.from(collection.table).update(stripId(payload)).eq("id", payload.id)
      : await supabase.from(collection.table).insert(stripId(payload));

    if (error) {
      setStatus({ kind: "error", text: readableError(error.message, collection) });
      return;
    }

    setStatus({ kind: "ok", text: payload.id ? "Saved." : `New ${collection.singular} added.` });
    setEditing(null);
    await load();
  }

  async function remove(row: Row) {
    if (!supabase || !row.id) return;
    setStatus({ kind: "busy" });
    const { error } = await supabase.from(collection.table).delete().eq("id", row.id);
    if (error) setStatus({ kind: "error", text: readableError(error.message, collection) });
    else {
      setStatus({ kind: "ok", text: "Deleted." });
      setEditing(null);
      await load();
    }
  }

  const visible = rows.filter((r) =>
    query ? JSON.stringify(r).toLowerCase().includes(query.toLowerCase()) : true,
  );

  return (
    <div className="min-w-0">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="h-sub mb-1">{collection.label}</h2>
          <p className="m-0 text-[15px] text-mute">{collection.blurb}</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(emptyRecord(collection))}
          className="pill pill-navy pill-sm"
        >
          Add {collection.singular}
        </button>
      </header>

      {status.kind === "error" ? (
        <Notice tone="error">{status.text}</Notice>
      ) : status.kind === "ok" ? (
        <Notice tone="ok">{status.text}</Notice>
      ) : null}

      {editing ? (
        <Editor
          key={String(editing.id ?? "new")}
          collection={collection}
          record={editing}
          busy={status.kind === "busy"}
          onCancel={() => setEditing(null)}
          onSave={save}
          onDelete={remove}
        />
      ) : (
        <>
          {rows.length > 6 ? (
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${collection.label.toLowerCase()}`}
              className="mb-4 w-full max-w-sm rounded-lg border border-hair px-3.5 py-2.5 text-[15px] focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25"
            />
          ) : null}

          <List collection={collection} rows={visible} loading={loading} onEdit={setEditing} />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ list -- */

function List({
  collection,
  rows,
  loading,
  onEdit,
}: {
  collection: Collection;
  rows: Row[];
  loading: boolean;
  onEdit: (r: Row) => void;
}) {
  const columns = collection.fields.filter((f) => f.column).slice(0, 5);

  if (loading && rows.length === 0) {
    return <Panel><p className="m-0 text-[15px] text-mute">Loading…</p></Panel>;
  }

  if (rows.length === 0) {
    return (
      <Panel>
        <p className="m-0 text-[15px] text-mute">
          Nothing here yet. Use <strong>Add {collection.singular}</strong> to create the first one.
        </p>
      </Panel>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-hair bg-white">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-hair bg-shell/60">
            {columns.map((f) => (
              <th
                key={f.name}
                scope="col"
                className="px-4 py-3 font-slab text-[11px] font-bold uppercase tracking-[1px] text-mute"
              >
                {f.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={String(row.id ?? i)} className="border-b border-hair last:border-0 hover:bg-shell/40">
              {columns.map((f) => (
                <td key={f.name} className="px-4 py-3 align-top text-[15px] text-ink">
                  {renderCell(row[f.name], f)}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(row)}
                  className="font-slab text-[12px] font-bold uppercase tracking-[0.8px] text-blue hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(value: unknown, field: Field) {
  if (field.type === "boolean") {
    return value ? (
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest">
        <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Live
      </span>
    ) : (
      <span className="text-[13px] text-mute">Draft</span>
    );
  }
  const text = value == null || value === "" ? ", " : String(value);
  return <span className="line-clamp-2">{text.length > 70 ? `${text.slice(0, 70)}…` : text}</span>;
}

/* ---------------------------------------------------------------- editor -- */

function Editor({
  collection,
  record,
  busy,
  onCancel,
  onSave,
  onDelete,
}: {
  collection: Collection;
  record: Row;
  busy: boolean;
  onCancel: () => void;
  onSave: (r: Row) => void;
  onDelete: (r: Row) => void;
}) {
  // Parent gives this component a key, so props are only ever the initial value.
  const [draft, setDraft] = useState<Row>(record);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function set(name: string, value: unknown) {
    setDraft((d) => ({ ...d, [name]: value }));
  }

  const missing = collection.fields
    .filter((f) => f.required && !String(draft[f.name] ?? "").trim())
    .map((f) => f.label);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (missing.length === 0) onSave(draft);
      }}
      className="rounded-xl border border-hair bg-white p-6 sm:p-7"
    >
      <h3 className="h-four mb-5">
        {draft.id ? `Edit ${collection.singular}` : `New ${collection.singular}`}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {collection.fields.map((f) => {
          const wide = f.type === "textarea" || f.type === "richtext";
          return (
            <div key={f.name} className={wide ? "sm:col-span-2" : ""}>
              <label
                htmlFor={`f-${f.name}`}
                className="mb-1.5 block font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-navy"
              >
                {f.label}
                {f.required ? <span className="text-red"> *</span> : null}
              </label>
              <FieldInput id={`f-${f.name}`} field={f} value={draft[f.name]} onChange={(v) => set(f.name, v)} />
              {f.help ? <p className="mt-1.5 mb-0 text-[13px] leading-5 text-mute">{f.help}</p> : null}
            </div>
          );
        })}
      </div>

      {missing.length > 0 ? (
        <p className="mt-5 mb-0 text-[14px] text-red">Still needed: {missing.join(", ")}.</p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-hair pt-6">
        <button type="submit" disabled={busy || missing.length > 0} className="pill pill-navy pill-sm disabled:opacity-50">
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="pill pill-outline pill-sm">
          Cancel
        </button>

        {draft.id ? (
          <span className="ml-auto">
            {confirmDelete ? (
              <span className="flex items-center gap-2 text-[14px]">
                <span className="text-mute">Delete for good?</span>
                <button
                  type="button"
                  onClick={() => onDelete(draft)}
                  className="font-slab text-[12px] font-bold uppercase tracking-[0.8px] text-red hover:underline"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="font-slab text-[12px] font-bold uppercase tracking-[0.8px] text-mute hover:underline"
                >
                  Keep
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="font-slab text-[12px] font-bold uppercase tracking-[0.8px] text-mute hover:text-red"
              >
                Delete
              </button>
            )}
          </span>
        ) : null}
      </div>
    </form>
  );
}

function FieldInput({
  id,
  field,
  value,
  onChange,
}: {
  id: string;
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const base =
    "w-full rounded-lg border border-hair bg-white px-3.5 py-2.5 text-[15px] text-ink transition focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25";

  if (field.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-2.5 pt-1">
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-[#003f87]"
        />
        <span className="text-[15px] text-ink">{value ? "Yes" : "No"}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={base}>
        {field.options?.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <textarea
        id={id}
        rows={field.type === "richtext" ? 10 : 3}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className={base}
      />
    );
  }

  return (
    <input
      id={id}
      type={field.type === "date" ? "date" : field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
      value={value == null ? "" : String(value)}
      onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      className={base}
    />
  );
}

/* ----------------------------------------------------------------- bits --- */

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-hair bg-white p-6 sm:p-7">{children}</div>;
}

function Notice({ tone, children }: { tone: "ok" | "error"; children: React.ReactNode }) {
  return (
    <p
      role="status"
      className={[
        "mb-4 rounded-lg px-4 py-3 text-[14px]",
        tone === "ok" ? "bg-forest/10 text-forest" : "bg-red/10 text-red",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

function stripId(row: Row) {
  const { id: _id, ...rest } = row;
  void _id;
  return rest;
}

/**
 * Turn the form's values into something Postgres accepts.
 *
 * A blank optional date or number arrives as "", which Postgres rejects for a
 * date or integer column, so blanks become null. Text is trimmed. Columns the
 * database maintains are dropped.
 */
function toPayload(row: Row, collection: Collection): Row {
  const byName = new Map(collection.fields.map((f) => [f.name, f]));
  const out: Row = {};

  for (const [key, value] of Object.entries(row)) {
    if (key === "created_at" || key === "updated_at") continue;

    const field = byName.get(key);
    if (!field) {
      out[key] = value;
      continue;
    }

    if (field.type === "boolean") {
      out[key] = Boolean(value);
      continue;
    }

    if (field.type === "number") {
      if (value === "" || value === null || value === undefined) out[key] = null;
      else {
        const n = Number(value);
        out[key] = Number.isFinite(n) ? n : null;
      }
      continue;
    }

    const text = value == null ? "" : String(value).trim();
    // Blank means "not set". Required fields are caught by the form first.
    out[key] = text === "" ? null : text;
  }

  return out;
}

/** Turn Postgres errors into something a Scoutmaster can act on. */
function readableError(message: string, collection: Collection): string {
  if (/row-level security|permission denied/i.test(message)) {
    return "Your account does not have edit access yet. A troop admin needs to set your role to leader or admin.";
  }
  if (/duplicate key/i.test(message)) {
    return "Something with that web address already exists. Change the slug and try again.";
  }
  if (/relation .* does not exist/i.test(message)) {
    return `The ${collection.table} table is missing. Run supabase/schema.sql in the Supabase SQL editor.`;
  }
  return message;
}
