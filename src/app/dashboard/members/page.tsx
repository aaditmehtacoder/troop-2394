import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { isAdmin, listUsers, ROLE_RANK, type Role, type User } from "@/lib/auth/store";
import { updateRoleAction } from "@/lib/auth/actions";

export const metadata = { title: "Members" };

const ROLE_LABEL: Record<Role, string> = {
  pending: "Waiting for approval",
  member: "Member",
  leader: "Troop leader",
  admin: "Administrator",
};

const ROLE_TONE: Record<Role, string> = {
  pending: "bg-gold/25 text-[#7a6212] ring-gold/50",
  member: "bg-blue/12 text-blue-dark ring-blue/25",
  leader: "bg-forest/12 text-forest ring-forest/25",
  admin: "bg-navy/10 text-navy ring-navy/25",
};

function when(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function RoleControls({ u, selfId }: { u: User; selfId: string }) {
  const isSelf = u.id === selfId;
  const options: Role[] = ["pending", "member", "leader", "admin"];

  return (
    <form action={updateRoleAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={u.id} />
      <label className="sr-only" htmlFor={`role-${u.id}`}>
        Role for {u.name}
      </label>
      <select
        id={`role-${u.id}`}
        name="role"
        defaultValue={u.role}
        disabled={isSelf}
        className="rounded-lg border border-hair bg-white px-3 py-2 text-[13.5px] text-ink focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 disabled:opacity-50"
      >
        {options.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABEL[r]}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isSelf} className="pill pill-navy pill-sm disabled:opacity-40">
        Save
      </button>
      {isSelf && <span className="text-[12px] text-mute">(that&rsquo;s you)</span>}
    </form>
  );
}

export default async function MembersPage() {
  const me = await getCurrentUser();
  if (!me) return null;
  if (!isAdmin(me.role)) redirect("/dashboard");

  const users = await listUsers();
  const pending = users.filter((u) => u.role === "pending");
  const active = users
    .filter((u) => u.role !== "pending")
    .sort((a, b) => ROLE_RANK[b.role] - ROLE_RANK[a.role] || a.name.localeCompare(b.name));

  return (
    <div>
      <header className="mb-9">
        <p className="mb-1 font-slab text-[12px] font-bold uppercase tracking-[2px] text-blue">
          Administrator only
        </p>
        <h1 className="h-section !text-[clamp(26px,4vw,36px)]">Members</h1>
        <p className="mt-3 mb-0 max-w-2xl text-[15px] leading-7 text-slate">
          Approve people who have requested an account, and set what they can see. Approve only
          people you actually recognise as part of the troop — this is the gate on the members
          area.
        </p>
      </header>

      {/* Waiting for approval */}
      <section>
        <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          Waiting for approval ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <p className="mt-4 mb-0 rounded-lg bg-white p-6 text-[14.5px] text-mute ring-1 ring-hair">
            Nobody is waiting right now.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pending.map((u) => (
              <li
                key={u.id}
                className="rounded-lg border-l-4 border-gold bg-white p-6 ring-1 ring-hair"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-0.5 font-slab text-[16px] font-bold text-navy">{u.name}</p>
                    <p className="mb-0 break-words text-[13.5px] text-slate">{u.email}</p>
                    <p className="mt-1 mb-0 text-[13px] text-mute">
                      {u.relationship} · requested {when(u.createdAt)}
                    </p>
                  </div>
                  <RoleControls u={u} selfId={me.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Active accounts */}
      <section className="mt-11">
        <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          Active accounts ({active.length})
        </h2>

        <div className="mt-4 overflow-x-auto rounded-lg bg-white ring-1 ring-hair">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hair">
                {["Name", "Connection", "Role", "Last signed in", ""].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-3 font-slab text-[11.5px] font-bold uppercase tracking-[1.2px] text-mute"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.map((u) => (
                <tr key={u.id} className="border-b border-hair last:border-0">
                  <td className="px-5 py-4 align-top">
                    <span className="block font-slab text-[14.5px] font-bold text-navy">
                      {u.name}
                    </span>
                    <span className="block break-words text-[13px] text-mute">{u.email}</span>
                  </td>
                  <td className="px-5 py-4 align-top text-[13.5px] text-slate">
                    {u.relationship}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.8px] ring-1 ${ROLE_TONE[u.role]}`}
                    >
                      {ROLE_LABEL[u.role]}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-[13.5px] text-mute">
                    {when(u.lastLoginAt)}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <RoleControls u={u} selfId={me.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-8 mb-0 rounded-lg bg-shell p-5 text-[13px] leading-6 text-mute">
        <strong className="text-navy">A note on youth data.</strong> This site deliberately stores
        only a name, an email, and how someone is connected to the troop. Advancement records,
        health forms, and anything else about a Scout belong in Scoutbook and the troop&rsquo;s
        physical files — not here.
      </p>
    </div>
  );
}
