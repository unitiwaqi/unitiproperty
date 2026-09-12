import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { LangProvider } from "@/lib/LangContext";

// Newsreader 300 (Light) is deliberate — 400 looks heavy at the headline sizes this
// design uses it for (README §Typography). Italic isn't used anywhere in the handoff.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UnitiProperty — Secure Your Next Investment",
  description:
    "Curated land & building investment opportunities at Tanjung Agas, Port Dickson, Malaysia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        <LangProvider>
          <SiteNav />
          {/* SiteNav is fixed (not sticky), so every page needs this space reserved —
              the home page's hero section cancels it with -mt-[68px] to pull the video
              up behind the (initially transparent) header instead. */}
          <div className="pt-[68px]">{children}</div>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
