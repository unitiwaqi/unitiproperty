"use client";

// Overview / Home screen. Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html,
// the `onHome` sc-if block (hero → fact ribbon → site intro → parcel carousel → proof
// band → process → general enquiry).

import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { ParcelCarousel } from "@/components/ParcelCarousel";
import { EnquiryForm } from "@/components/EnquiryForm";
import { useLang } from "@/lib/LangContext";
import { T } from "@/lib/dict";
import { SITE_TOTALS, STEPS } from "@/lib/parcels";

export default function Home() {
  const { lang } = useLang();

  return (
    <main>
      {/* Hero — pulled up by the layout's fixed-header padding (-mt-[68px]) so the
          video renders under the transparent header instead of below it. Height
          includes the fact ribbon's own ~100px: the ribbon overlaps the bottom of the
          video (see below) rather than sitting in its own solid-background block. */}
      <section
        className="relative -mt-[68px] flex overflow-hidden bg-bg-deep"
        style={{ minHeight: "calc(min(78vh, 760px) + 100px)", alignItems: "flex-end", paddingBottom: 100 }}
      >
        <div className="absolute inset-0">
          <HeroVideo
            src="/assets/heroVideo.mp4"
            stillSrc="/assets/satMap_3D_detailed.png"
            stillAlt="Aerial render of the Tanjung Agas site"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            // Bottom stop lightened from .92 to .5 so the fact ribbon overlapping this
            // zone shows real video color/motion through its glass, not a near-solid
            // black bar. The ribbon's own tint + blur carries the rest of the contrast.
            background:
              "linear-gradient(to top, rgba(11,10,8,.5) 0%, rgba(11,10,8,.4) 45%, rgba(11,10,8,.30) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,10,8,.66) 0%, rgba(11,10,8,.10) 62%, rgba(11,10,8,0) 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-14 pt-[120px]" style={{ color: "var(--hero-ink)" }}>
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[.2em] text-accent">
            Tanjung Agas · Port Dickson, Malaysia
          </p>
          <div className="max-w-[780px]">
            {lang === "EN" ? (
              <h1 className="mt-[18px] font-serif font-light leading-[1.06] tracking-[-.02em]" style={{ fontSize: "clamp(38px,6.4vw,72px)" }}>
                A 38-acre coastal site,
                <br />
                released parcel by parcel.
              </h1>
            ) : (
              <h1 className="mt-[18px] font-serif font-light leading-[1.06] tracking-[-.02em]" style={{ fontSize: "clamp(38px,6.4vw,72px)" }}>
                Tapak pesisir 38 ekar,
                <br />
                dibuka lot demi lot.
              </h1>
            )}
            <p className="mt-[22px] max-w-[560px] font-sans text-[clamp(16px,1.5vw,19px)] leading-[1.6]" style={{ color: "var(--hero-ink-70)" }}>
              {lang === "EN"
                ? "Uniti Sdn Bhd is opening five contiguous parcels at Tanjung Agas to institutional buyers, developers and joint-venture partners. One owner, one title chain, no intermediaries."
                : "Uniti Sdn Bhd membuka lima lot bersebelahan di Tanjung Agas kepada pembeli institusi, pemaju dan rakan usahasama. Satu pemilik, satu rantaian hakmilik, tanpa perantara."}
            </p>
          </div>
          <div className="mt-[34px] flex flex-wrap items-center gap-[14px]">
            <Link
              href="/explore"
              className="inline-flex items-center gap-[10px] rounded-soft-sm px-7 py-[17px] font-sans text-[14px] font-semibold transition-colors duration-150"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              <span>{lang === "EN" ? "View the masterplan" : "Lihat pelan induk"}</span>
              <span>→</span>
            </Link>
            <Link
              href="/#enquire"
              className="inline-flex items-center gap-[10px] rounded-soft-sm border px-[26px] py-[17px] font-sans text-[14px] font-semibold transition-colors duration-150"
              style={{ borderColor: "rgba(245,241,231,.34)", color: "var(--hero-ink)" }}
            >
              {lang === "EN" ? "Request the information pack" : "Minta pakej maklumat"}
            </Link>
          </div>
        </div>
      </section>

      {/* Fact ribbon — a frosted glass bar overlapping the hero's reserved bottom
          100px, so the video's colour and motion actually read through it (see the
          lightened gradient stop above) instead of sitting on a near-opaque tint. */}
      <div
        className="relative z-10 -mt-[100px] backdrop-blur-[6px]"
        style={{
          background: "rgba(20,17,13,.1)",
          borderTop: "1px solid rgba(245,241,231,.14)",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            <FactCell label={T.lbParcels[lang]} value={String(SITE_TOTALS.parcels)} bordered first />
            <FactCell label={T.lbArea[lang]} value={SITE_TOTALS.area[lang]} bordered />
            <FactCell label={T.lbTenure[lang]} value={T.vFreehold[lang]} bordered />
            <FactCell label={T.lbFrontage[lang]} value={SITE_TOTALS.frontage} bordered />
            <FactCell label={T.lbFromKL[lang]} value={SITE_TOTALS.fromKL} />
          </div>
        </div>
      </div>

      {/* Site intro */}
      <section className="mx-auto max-w-[1280px] px-5" style={{ padding: "clamp(56px,8vw,104px) 20px" }}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[.18em] text-ink-40">
              {T.ebSite[lang]}
            </p>
            {lang === "EN" ? (
              <div>
                <h2 className="mt-4 font-serif font-light leading-[1.14] tracking-[-.015em]" style={{ fontSize: "clamp(28px,3.6vw,42px)" }}>
                  One site. Five parcels. Five distinct propositions.
                </h2>
                <p className="mt-5 font-sans text-[17px] leading-[1.65] text-ink-70">
                  Tanjung Agas runs from the beach to the river mouth along the N143. Each parcel has its own
                  gazetted use, its own access and its own buyer — an education campus, a marina resort, an
                  eco-tourism reserve, a marine engineering yard, and one compact riverfront lot held for joint
                  venture.
                </p>
                <p className="mt-4 font-sans text-[17px] leading-[1.65] text-ink-70">
                  Parcels are sold individually or in combination. Uniti remains the land owner through
                  completion, so title, zoning and conversion are handled by one counterparty.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="mt-4 font-serif font-light leading-[1.14] tracking-[-.015em]" style={{ fontSize: "clamp(28px,3.6vw,42px)" }}>
                  Satu tapak. Lima lot. Lima tawaran berbeza.
                </h2>
                <p className="mt-5 font-sans text-[17px] leading-[1.65] text-ink-70">
                  Tanjung Agas terbentang dari pantai ke muara sungai sepanjang N143. Setiap lot mempunyai
                  kegunaan, akses dan pembeli tersendiri — kampus pendidikan, resort marina, rizab
                  eko-pelancongan, limbungan kejuruteraan marin, dan satu lot tepi sungai untuk usahasama.
                </p>
                <p className="mt-4 font-sans text-[17px] leading-[1.65] text-ink-70">
                  Lot dijual secara individu atau gabungan. Uniti kekal sebagai pemilik tanah sehingga selesai,
                  jadi hakmilik, pengezonan dan penukaran diuruskan oleh satu pihak.
                </p>
              </div>
            )}
          </div>
          <Link
            href="/explore"
            className="group relative overflow-hidden rounded-soft-lg border border-hair bg-panel transition-colors duration-150 hover:border-hair-2"
          >
            <div className="relative aspect-[4/3] w-full bg-[#e8e4dc]">
              <Image
                src="/assets/boundMap.png"
                alt="Masterplan of the five parcels at Tanjung Agas"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-hair px-[18px] py-4">
              <p className="font-sans text-[13px] font-medium leading-relaxed text-ink-70">
                {T.planCaption[lang]}
              </p>
              <span className="flex-none font-sans text-[13px] font-semibold text-accent">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Parcel carousel */}
      <section className="border-t border-hair bg-bg">
        <div className="mx-auto max-w-[1280px] px-5" style={{ padding: "clamp(48px,6vw,80px) 20px" }}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[.18em] text-ink-40">
                {T.ebParcels[lang]}
              </p>
              <h2 className="mt-[14px] font-serif font-light leading-[1.15] tracking-[-.015em]" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
                {T.hParcels[lang]}
              </h2>
            </div>
            <p className="max-w-[300px] font-sans text-[14px] leading-relaxed text-ink-55">
              {T.parcelsNote[lang]}
            </p>
          </div>
          <ParcelCarousel />
        </div>
      </section>

      {/* Uniti proof band — inverts to ink-dark on this (paper) ground */}
      <section id="about" style={{ background: "#1A1611", color: "#F5F1E7" }}>
        <div className="mx-auto max-w-[1280px] px-5" style={{ padding: "clamp(56px,8vw,104px) 20px" }}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-start gap-[clamp(32px,5vw,64px)]">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[.18em]" style={{ color: "rgba(245,241,231,.62)" }}>
                {T.ebAbout[lang]}
              </p>
              {lang === "EN" ? (
                <div>
                  <h2 className="mt-4 font-serif font-light leading-[1.15] tracking-[-.015em]" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
                    Two decades of coastal land development, under one owner.
                  </h2>
                  <p className="mt-4 font-sans text-[17px] leading-[1.65]" style={{ color: "rgba(245,241,231,.78)" }}>
                    Uniti Sdn Bhd has developed and stewarded seaside land in Negeri Sembilan since 2003 —
                    beginning with Kolej Uniti, the training campus that still operates at the northern edge of
                    this site. Every parcel offered here comes from that holding.
                  </p>
                  <p className="mt-4 font-sans text-[17px] leading-[1.65]" style={{ color: "rgba(245,241,231,.78)" }}>
                    We deal directly. There is no listing agent, no aggregator and no undisclosed co-broker
                    between you and the land.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="mt-4 font-serif font-light leading-[1.15] tracking-[-.015em]" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
                    Dua dekad pembangunan tanah pesisir, di bawah satu pemilik.
                  </h2>
                  <p className="mt-4 font-sans text-[17px] leading-[1.65]" style={{ color: "rgba(245,241,231,.78)" }}>
                    Uniti Sdn Bhd membangunkan dan menguruskan tanah tepi laut di Negeri Sembilan sejak 2003 —
                    bermula dengan Kolej Uniti, kampus latihan yang masih beroperasi di utara tapak ini. Setiap
                    lot yang ditawarkan di sini datang daripada pegangan tersebut.
                  </p>
                  <p className="mt-4 font-sans text-[17px] leading-[1.65]" style={{ color: "rgba(245,241,231,.78)" }}>
                    Kami berurusan secara terus. Tiada ejen penyenaraian, tiada agregator dan tiada broker
                    tersembunyi antara anda dan tanah.
                  </p>
                </div>
              )}

              <div
                className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] border-t"
                style={{ borderColor: "rgba(245,241,231,.15)" }}
              >
                <ProofStat value="2003" label={T.stFounded[lang]} />
                <ProofStat value={SITE_TOTALS.area[lang]} label={T.stHolding[lang]} />
                <ProofStat value="1" label={T.stOwner[lang]} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#enquire"
                  className="rounded-soft-sm border px-[18px] py-[13px] font-sans text-[13px] font-semibold"
                  style={{ borderColor: "rgba(245,241,231,.32)", color: "#F5F1E7" }}
                >
                  {T.ctaBrief[lang]}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 items-start gap-3">
              <div className="relative aspect-[3/4] min-w-0 overflow-hidden bg-[#2a251e]">
                <div className="flex h-full items-center justify-center px-4 text-center font-sans text-[12px]" style={{ color: "rgba(245,241,231,.4)" }}>
                  Kolej Uniti campus — photo
                </div>
              </div>
              <div className="flex min-w-0 flex-col gap-3">
                <div className="relative aspect-square min-w-0 overflow-hidden bg-[#2a251e]">
                  <div className="flex h-full items-center justify-center px-4 text-center font-sans text-[12px]" style={{ color: "rgba(245,241,231,.4)" }}>
                    Beachfront frontage — photo
                  </div>
                </div>
                <div className="relative min-h-[110px] min-w-0 flex-1 overflow-hidden bg-[#2a251e]">
                  <div className="flex h-full items-center justify-center px-4 text-center font-sans text-[12px]" style={{ color: "rgba(245,241,231,.4)" }}>
                    Leadership / site visit — photo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1280px] px-5" style={{ padding: "clamp(48px,7vw,88px) 20px" }}>
        <h2 className="font-serif font-light leading-[1.15] tracking-[-.015em]" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
          {T.hProcess[lang]}
        </h2>
        <div data-grid="process" className="mt-8 grid grid-cols-4 gap-0 border-t border-hair-2">
          {STEPS[lang].map(([num, title, desc]) => (
            <div key={num} className="border-b border-hair py-[26px] pr-6">
              <p className="font-serif text-[15px] leading-none tracking-[.06em] text-accent">{num}</p>
              <h3 className="mt-[14px] font-serif text-[21px] leading-[1.2]">{title}</h3>
              <p className="mt-[10px] max-w-[34ch] font-sans text-[15px] leading-relaxed text-ink-70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* General enquiry */}
      <section id="enquire" className="border-t border-hair bg-bg-deep">
        <div className="mx-auto max-w-[1280px] px-5" style={{ padding: "clamp(48px,7vw,88px) 20px" }}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-start gap-[clamp(32px,5vw,64px)]">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[.18em] text-ink-40">
                {T.ebEnquire[lang]}
              </p>
              <h2 className="mt-[14px] font-serif font-light leading-[1.15] tracking-[-.015em]" style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
                {T.hEnquire[lang]}
              </h2>
              <p className="mt-[18px] max-w-[44ch] font-sans text-[17px] leading-[1.65] text-ink-70">
                {T.pEnquire[lang]}
              </p>
              <div className="mt-7 border-t border-hair">
                <PackRow num="01" text={T.packA[lang]} />
                <PackRow num="02" text={T.packB[lang]} />
                <PackRow num="03" text={T.packC[lang]} />
              </div>
            </div>

            <div className="rounded-soft-lg border border-hair-2 bg-bg p-[clamp(22px,3vw,32px)]">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Light (hero-ink) text — this ribbon overlaps the hero video's bottom edge, not a
// solid --bg background, so it needs the same contrast treatment as the hero copy.
function FactCell({
  label,
  value,
  bordered,
  first,
}: {
  label: string;
  value: string;
  bordered?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className="relative py-[26px]"
      style={{ paddingLeft: first ? 0 : 24, paddingRight: 20 }}
    >
      <p
        className="font-sans text-[11px] font-semibold uppercase tracking-[.16em]"
        style={{ color: "var(--hero-ink-70)" }}
      >
        {label}
      </p>
      <p className="mt-[10px] font-serif text-[27px] leading-none tracking-[-.01em]" style={{ color: "var(--hero-ink)" }}>
        {value}
      </p>
      {/* Short, centred divider rather than a full-height border-right — a thin
          hairline spanning the whole row read as too heavy. */}
      {bordered && (
        <span
          className="absolute right-0 top-1/2 h-6 w-px -translate-y-1/2"
          style={{ background: "rgba(245,241,231,.14)" }}
        />
      )}
    </div>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t-0 py-4 pr-5" style={{ borderTop: "1px solid rgba(245,241,231,.15)" }}>
      <p className="font-serif text-[26px] leading-none">{value}</p>
      <p className="mt-[9px] font-sans text-[12px] uppercase tracking-[.1em]" style={{ color: "rgba(245,241,231,.62)" }}>
        {label}
      </p>
    </div>
  );
}

function PackRow({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex gap-[14px] border-b border-hair py-[14px]">
      <span className="flex-none font-serif text-[14px] leading-relaxed text-accent">{num}</span>
      <span className="font-sans text-[15px] leading-relaxed text-ink-70">{text}</span>
    </div>
  );
}
