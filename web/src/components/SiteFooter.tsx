import Link from "next/link";

const PLATFORM_LINKS = [
  { label: "Explore Map", href: "/explore" },
  { label: "Opportunities", href: "/explore" },
  { label: "About Uniti", href: "/#about" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline/8 px-5 py-10 md:px-12">
      <div className="flex flex-wrap justify-between gap-8">
        <div className="max-w-[280px]">
          <p className="font-heading text-[16px] font-extrabold tracking-[.06em]">
            UNITI<span className="text-accent">PROPERTY</span>
          </p>
          <p className="mt-3 text-[13px] text-ink/60">
            Curated land &amp; building investment opportunities from Uniti
            Sdn Bhd.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold tracking-[.06em] text-ink/40">
            CONTACT
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] text-ink/60">
            <li>
              <a
                href="mailto:invest@unitiproperty.com"
                className="hover:text-ink"
              >
                invest@unitiproperty.com
              </a>
            </li>
            <li>
              <a href="tel:+60300000000" className="hover:text-ink">
                +60 3-0000-0000
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold tracking-[.06em] text-ink/40">
            PLATFORM
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] text-ink/60">
            {PLATFORM_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-hairline/8 pt-6 text-[12px] text-ink/40">
        © {new Date().getFullYear()} UnitiProperty. A curated platform by
        Uniti Sdn Bhd.
      </div>
    </footer>
  );
}
