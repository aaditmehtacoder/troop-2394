import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { CTABand } from "@/components/site/CTABand";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/brand/Marks";
import { troop } from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Scouts BSA Troop 2/394 in ${troop.city}, California, meeting times, directions, and who to email.`,
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    troop.meeting.mapQuery,
  )}&t=m&z=13&output=embed&iwloc=near`;

  return (
    <>
      <PageHero
        eyebrow="We answer every message"
        title="Contact Us"
        lede={`Questions about joining, volunteering, or visiting a meeting? Write to us, a real person in ${troop.city} reads it.`}
        photo={pageHeroPhoto.contact}
        crumb="Contact"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* details */}
          <div>
            <SectionHead align="left" title="Reach the troop" />

            <Reveal delay={70}>
              <ul className="mt-8 space-y-6">
                {[
                  {
                    Icon: IconMail,
                    t: "General questions",
                    v: troop.contact.email,
                    href: `mailto:${troop.contact.email}`,
                  },
                  {
                    Icon: IconMail,
                    t: "New families",
                    v: troop.contact.newMemberEmail,
                    href: `mailto:${troop.contact.newMemberEmail}`,
                  },
                  {
                    Icon: IconMail,
                    t: "Scoutmaster",
                    v: troop.contact.scoutmasterEmail,
                    href: `mailto:${troop.contact.scoutmasterEmail}`,
                  },
                  {
                    Icon: IconPhone,
                    t: "Phone",
                    v: troop.contact.phone,
                    href: `tel:${troop.contact.phone.replace(/[^0-9+]/g, "")}`,
                  },
                ].map(({ Icon, t, v, href }) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-slab text-[12px] font-bold uppercase tracking-[1.4px] text-blue">
                        {t}
                      </span>
                      <a
                        href={href}
                        className="block break-words text-[15px] text-navy underline-offset-4 hover:underline"
                      >
                        {v}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={130}>
              <div className="mt-9 rounded-lg border-l-4 border-blue bg-blue/[0.05] p-6">
                <h3 className="flex items-center gap-2.5 font-slab text-[15px] font-bold text-navy">
                  <IconClock className="h-5 w-5 text-blue" />
                  Meeting times
                </h3>
                <p className="mt-2 mb-0 text-[14.5px] leading-6 text-slate">
                  {troop.meeting.cadence}, {troop.meeting.time}. Visitors are welcome any week, no notice needed, though a heads-up helps us find you a seat.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* DIRECTIONS */}
      <Section id="directions" className="bg-shell">
        <SectionHead
          title="Where to find us"
          lede={`${troop.meeting.venue} · ${troop.meeting.address}`}
        />
        <Reveal delay={90}>
          <div className="mt-10 overflow-hidden rounded-xl border border-hair bg-white shadow-sm">
            <iframe
              title={`Map to ${troop.meeting.venue}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Parking",
                d: "Free lot on site. Arrive a few minutes early on Court of Honor nights. It fills.",
              },
              {
                t: "First visit",
                d: "Come in and ask for the Senior Patrol Leader or any adult in a tan uniform shirt. Someone will walk you through what is happening.",
              },
              {
                t: "Accessibility",
                d: "The meeting space is step-free. Tell us in advance about any access needs and we will sort it out before you arrive.",
              },
            ].map(({ t, d }) => (
              <div key={t} className="rounded-lg bg-white p-6 ring-1 ring-hair">
                <h3 className="flex items-center gap-2 font-slab text-[15px] font-bold text-navy">
                  <IconPin className="h-4.5 w-4.5 text-blue" />
                  {t}
                </h3>
                <p className="mt-2 mb-0 text-[14px] leading-6 text-slate">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Or just turn up"
        body={`${troop.meeting.cadence}, ${troop.meeting.time}. That is genuinely the fastest way to find out whether Troop 2/394 fits your family.`}
        primary={{ label: "How to join", href: "/join" }}
        secondary={{ label: "See the calendar", href: "/calendar" }}
        photo="grant-lake"
      />
    </>
  );
}
