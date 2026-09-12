"use client";

// Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html <footer>.
// Four columns on --bg-deep: wordmark + blurb, contact, navigate, notice.

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { T } from "@/lib/dict";
import { EMAIL, PHONE_NUMBER } from "@/lib/parcels";

export function SiteFooter() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-hair bg-bg-deep">
      <div className="mx-auto max-w-[1280px] px-5 pb-9 pt-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-9">
          <div className="max-w-[280px]">
            <div className="flex items-baseline gap-[7px]">
              <span className="font-sans text-[15px] font-bold tracking-[.14em]">UNITI</span>
              <span className="font-sans text-[15px] font-normal tracking-[.14em] text-ink-55">
                PROPERTY
              </span>
            </div>
            <p className="mt-[14px] font-sans text-[14px] leading-relaxed text-ink-55">
              {T.footerBlurb[lang]}
            </p>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-40">
              {T.fcContact[lang]}
            </p>
            <div className="mt-[14px] flex flex-col gap-[9px]">
              <a href={`mailto:${EMAIL}`} className="font-sans text-[14px] text-ink-70">
                {EMAIL}
              </a>
              <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`} className="font-sans text-[14px] text-ink-70">
                {PHONE_NUMBER}
              </a>
            </div>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-40">
              {T.fcNav[lang]}
            </p>
            <div className="mt-[14px] flex flex-col items-start gap-[9px]">
              <Link href="/explore" className="font-sans text-[14px] text-ink-70 hover:text-accent">
                {T.mParcels[lang]}
              </Link>
              <Link href="/#about" className="font-sans text-[14px] text-ink-70 hover:text-accent">
                {T.mAbout[lang]}
              </Link>
            </div>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-40">
              {T.fcLegal[lang]}
            </p>
            <p className="mt-[14px] font-sans text-[13px] leading-relaxed text-ink-55">
              {T.legalNote[lang]}
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-hair pt-5 font-sans text-[12px] text-ink-40">
          © 2026 Uniti Sdn Bhd. {T.rights[lang]}
        </p>
      </div>
    </footer>
  );
}
