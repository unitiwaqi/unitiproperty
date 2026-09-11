import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";

const PURPOSE_CARDS = [
  {
    tag: "TRAINING",
    title: "Institutional / Training",
    desc: "Beachfront land suited to training centres, retreats and campuses.",
    filter: "Institutional",
  },
  {
    tag: "HOSPITALITY",
    title: "Resort & Tourism",
    desc: "Marina, resort and eco-tourism zones with waterfront access.",
    filter: "Hospitality",
  },
  {
    tag: "INDUSTRIAL",
    title: "Marine Industrial",
    desc: "Riverfront land for shipyard and marine engineering use.",
    filter: "Marine industrial",
  },
  {
    tag: "JV",
    title: "Joint Venture",
    desc: "Structured partnerships for developers and investors.",
    filter: "Joint venture",
  },
];

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Enquire",
    desc: "Tell us which opportunity and structure interests you.",
  },
  {
    number: "02",
    title: "Site & document review",
    desc: "We share title, zoning and 3D site documentation under NDA.",
  },
  {
    number: "03",
    title: "Agreement",
    desc: "We structure the outright sale or joint-venture with your counsel.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[480px] items-end overflow-hidden md:min-h-[640px]">
        <HeroVideo src="/assets/heroVideo.mp4" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,18,15,.55), rgba(20,18,15,.25) 40%, rgba(20,18,15,.6)), linear-gradient(to right, rgba(20,18,15,.55), rgba(20,18,15,.15) 60%, transparent)",
          }}
        />
        <div
          className="relative px-6 py-12 md:px-12"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,.5)" }}
        >
          <p className="text-[12px] font-semibold tracking-[.22em] text-accent">
            CURATED LAND &amp; BUILDING INVESTMENTS · MALAYSIA
          </p>
          <h1 className="mt-3 font-heading text-[36px] font-extrabold leading-[1.04] md:text-[72px]">
            SECURE YOUR
            <br />
            NEXT INVESTMENT
          </h1>
          <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-ink/72">
            Uniti presents a curated portfolio of seaside land and buildings
            across Malaysia — open for institutional, developer and
            joint-venture investment.
          </p>
          <p className="mt-1 max-w-[520px] text-[13px] leading-[1.6] text-ink/45">
            Portfolio tanah dan bangunan pilihan Uniti — terbuka untuk
            pelaburan institusi, pemaju dan usahasama.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="rounded-[2px] bg-accent px-7 py-4 text-[13px] font-bold tracking-[.05em] text-bg-base transition-colors duration-150 hover:bg-accent-hover"
            >
              EXPLORE THE MAP
            </Link>
            <Link
              href="/opportunity/uniti"
              className="rounded-[2px] border border-accent px-7 py-4 text-[13px] font-bold tracking-[.05em] text-accent transition-colors duration-150 hover:bg-accent hover:text-bg-base"
            >
              VIEW FEATURED OPPORTUNITY
            </Link>
          </div>
        </div>
      </section>

      {/* Invest by purpose */}
      <section className="px-5 py-12 md:px-12 md:py-20">
        <p className="text-[11px] font-semibold tracking-[.18em] text-accent">
          INVEST BY PURPOSE
        </p>
        <h2 className="mt-2 font-heading text-[26px] font-bold">
          Choose your angle of interest
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {PURPOSE_CARDS.map((card) => (
            <Link
              key={card.tag}
              href={`/explore?filter=${encodeURIComponent(card.filter)}`}
              className="group rounded-[2px] border border-hairline/8 bg-bg-panel p-[26px_22px] transition-all duration-150 hover:-translate-y-[3px] hover:border-accent/60"
            >
              <p className="text-[13px] font-bold text-accent">{card.tag}</p>
              <h3 className="mt-2 font-heading text-[19px] font-bold leading-[1.25]">
                {card.title}
              </h3>
              <p className="mt-2 text-[13px] text-ink/60">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Uniti band */}
      <section
        id="about"
        className="flex flex-col gap-8 border-y border-hairline/8 bg-bg-band px-5 py-12 md:flex-row md:items-center md:justify-between md:px-12 md:py-[72px]"
      >
        <div className="max-w-[480px]">
          <p className="text-[11px] font-semibold tracking-[.18em] text-accent">
            ABOUT UNITI
          </p>
          <h2 className="mt-3 font-heading text-[28px] font-bold leading-[1.2]">
            Two decades of institutional land development on Malaysia&apos;s
            coast.
          </h2>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-ink/65">
            Uniti Sdn Bhd develops and stewards seaside land for education,
            hospitality and marine industry. Every opportunity on this
            platform comes directly from our own portfolio — verified
            titles, clear zoning, no intermediaries.
          </p>
        </div>
        <div className="flex gap-8">
          {[
            { value: "5", label: "ZONES UNDER MANAGEMENT" },
            { value: "38 ac", label: "BEACHFRONT LAND" },
            { value: "20+ yrs", label: "IN COASTAL DEVELOPMENT" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-[32px] font-bold">
                {stat.value}
              </p>
              <p className="mt-1 max-w-[110px] text-[11px] text-ink/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-12 md:px-12 md:py-20">
        <h2 className="font-heading text-[26px] font-bold">
          From enquiry to agreement
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.number}>
              <p className="font-heading text-[34px] font-bold text-accent">
                {step.number}
              </p>
              <h3 className="mt-2 text-[16px] font-bold">{step.title}</h3>
              <p className="mt-2 text-[13.5px] text-ink/55">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured opportunity */}
      <section className="px-5 py-12 md:px-12 md:py-20">
        <p className="text-[11px] font-semibold tracking-[.18em] text-accent">
          FEATURED OPPORTUNITY
        </p>
        <h2 className="mt-2 font-heading text-[26px] font-bold">
          Tanjung Agas, Port Dickson
        </h2>
        <div className="mt-8 flex flex-col gap-8 md:flex-row">
          <div className="relative h-[240px] flex-[1_1_480px] overflow-hidden md:h-[400px]">
            <Image
              src="/assets/satMap_3D_detailed.png"
              alt="3D render of the Tanjung Agas site"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-[1_1_340px] flex-col justify-center gap-4">
            <p className="text-[15px] leading-[1.7] text-ink/75">
              A multi-zone coastal site bordering the beach at Tanjung Agas —
              comprising education, marine resort, nature tourism and marine
              engineering zones, each open for investment or joint-venture.
            </p>
            <div className="flex gap-6 text-[13px] text-ink/70">
              <span>5 INVESTABLE ZONES</span>
              <span>Freehold TENURE</span>
              <span>Beachfront LOCATION</span>
            </div>
            <Link
              href="/opportunity/uniti"
              className="inline-block w-fit rounded-[2px] border border-accent px-6 py-3 text-[12px] font-bold tracking-[.04em] text-accent transition-colors duration-150 hover:bg-accent hover:text-bg-base"
            >
              VIEW OPPORTUNITY →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
