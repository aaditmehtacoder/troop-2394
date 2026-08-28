import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "./SignupForm";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessDashboard } from "@/lib/auth/store";
import { countUsers } from "@/lib/auth/store";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Request an Account",
  description: `Request access to the ${troop.name} members area.`,
  robots: { index: false, follow: false },
};

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user && canAccessDashboard(user.role)) redirect("/dashboard");

  const isFirstEver = (await countUsers()) === 0;

  return (
    <AuthShell
      title={isFirstEver ? "Set Up the Members Area" : "Request an Account"}
      lede={
        isFirstEver
          ? "No accounts exist yet, so this first one becomes the administrator and can approve everyone else."
          : `Members-area accounts are for ${troop.name} families, Scouts, and registered leaders. A troop leader approves each request.`
      }
      scene="ridge"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white underline underline-offset-4">
            Sign in
          </Link>
          <span className="mx-2 opacity-50">·</span>
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Back to the site
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
