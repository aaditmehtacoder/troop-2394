"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    const supabase = createClient();
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={signOut} disabled={busy} className="pill pill-outline pill-sm">
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
