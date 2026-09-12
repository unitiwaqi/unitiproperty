"use client";

import { useEffect, useRef, useState } from "react";

// Two <video> elements crossfade into each other 0.6s before the active one ends, so the
// loop never shows a hard cut or a black frame. Source: handoff_unitiproperty_v2's
// bindVideos()/showLayer() logic. One video decodes at a time — the outgoing layer pauses
// 700ms after the crossfade starts (README §Motion and accessibility). Falls back to a
// still image under prefers-reduced-motion, read live via matchMedia rather than cached in
// state (ref callbacks fire before componentDidMount would have set it).
export function HeroVideo({ src, stillSrc, stillAlt }: { src: string; stillSrc: string; stillAlt: string }) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const activeRef = useRef<"a" | "b">("a");
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b || reduced) return;

    for (const v of [a, b]) {
      v.muted = true;
      v.playbackRate = 0.85;
    }
    a.play().catch(() => {});

    const handleTimeUpdate = (current: HTMLVideoElement, other: HTMLVideoElement, self: "a" | "b") => {
      if (activeRef.current !== self) return;
      if (current.duration && current.duration - current.currentTime <= 0.6) {
        other.currentTime = 0;
        other.muted = true;
        other.play().catch(() => {});
        setActive(self === "a" ? "b" : "a");
        clearTimeout(fadeTimer.current);
        fadeTimer.current = setTimeout(() => {
          try {
            current.pause();
          } catch {
            // ignore — element may already be gone
          }
        }, 700);
      }
    };

    const onA = () => handleTimeUpdate(a, b, "a");
    const onB = () => handleTimeUpdate(b, a, "b");
    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    return () => {
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
      clearTimeout(fadeTimer.current);
    };
  }, [reduced]);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={stillSrc} alt={stillAlt} className="absolute inset-0 h-full w-full object-cover" />;
  }

  return (
    <>
      <video
        ref={videoA}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-linear ${
          active === "a" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoB}
        src={src}
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-linear ${
          active === "b" ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
