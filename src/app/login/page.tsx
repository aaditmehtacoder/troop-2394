import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "./LoginForm";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessDashboard } from "@/lib/auth/store";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to the ${troop.name} members area.`,
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; pending?: string; signedout?: string }>;
}) {
  const params = await searchParams;

  const user = await getCurrentUser();
  if (user && canAccessDashboard(user.role)) redirect("/dashboard");

  const notice = params.pending
    ? "Account requested. A troop leader needs to approve it before you can sign in — you'll hear from us shortly."
    : params.signedout
      ? "You're signed out. See you at the next meeting."
      : undefined;

  const next = params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : undefined;

  return (
    <AuthShell
      title="Members Area"
      lede={`Sign in to see troop forms, the full calendar, and the roster for ${troop.name}.`}
      scene="night"
      footer={
        <>
          New to the troop?{" "}
          <Link href="/signup" className="font-medium text-white underline underline-offset-4">
            Request an account
          </Link>
          <span className="mx-2 opacity-50">·</span>
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Back to the site
          </Link>
        </>
      }
    >
      <LoginForm next={next} notice={notice} />
    </AuthShell>
  );
}
