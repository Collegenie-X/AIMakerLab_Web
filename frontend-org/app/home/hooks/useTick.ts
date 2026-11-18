"use client";
import { useEffect, useState } from "react";

/** SVG 애니메이션용 프레임 카운터. 마운트 후에만 동작해 SSR 불일치를 피한다. */
export function useTick(intervalMs = 60) {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return { mounted, tick };
}
