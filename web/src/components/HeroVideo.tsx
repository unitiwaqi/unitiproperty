"use client";

import { useEffect, useRef, useState } from "react";

// Two <video> elements crossfade into each other 0.5s before the active one
// ends, so the loop never shows a hard cut or a black frame.
// Source: design_handoff_unitiproperty/README.md (§ Interactions & Behaviour,
// "Hero video loop").
export function HeroVideo({ src }: { src: string }) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const activeRef = useRef<"a" | "b">("a");

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    for (const v of [a, b]) {
      v.muted = true;
      v.playbackRate = 0.8;
    }
    a.play().catch(() => {});

    const handleTimeUpdate = (current: HTMLVideoElement, other: HTMLVideoElement, self: "a" | "b") => {
      if (activeRef.current !== self) return;
      if (current.duration - current.currentTime <= 0.5) {
        other.currentTime = 0;
        other.muted = true;
        other.play().catch(() => {});
        setActive(self === "a" ? "b" : "a");
      }
    };

    const onA = () => handleTimeUpdate(a, b, "a");
    const onB = () => handleTimeUpdate(b, a, "b");
    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    return () => {
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
    };
  }, []);

  return (
    <>
      <video
        ref={videoA}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-linear ${
          active === "a" ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={videoB}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-linear ${
          active === "b" ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
