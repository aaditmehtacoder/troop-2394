import { IconCheck } from "@/components/brand/Marks";

export function FormMessage({ kind, children }: { kind: "error" | "notice"; children: React.ReactNode }) {
  const isError = kind === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={`mb-5 mt-0 flex items-start gap-2.5 rounded-lg px-4 py-3 text-[14px] leading-6 ${
        isError ? "bg-red/10 text-red" : "bg-forest/10 text-forest"
      }`}
    >
      {!isError && <IconCheck className="mt-0.5 h-5 w-5 shrink-0" />}
      <span>{children}</span>
    </p>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={pending} className="pill pill-navy w-full disabled:opacity-60">
      {pending ? "Working…" : children}
    </button>
  );
}
