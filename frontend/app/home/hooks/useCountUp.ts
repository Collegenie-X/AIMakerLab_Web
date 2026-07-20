"use client";
import { useEffect, useRef, useState } from "react";

function parseNumber(val: string): { num: number; suffix: string; prefix: string } {
  const prefix = val.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = val.match(/[^0-9,]+$/)?.[0] ?? "";
  const num = parseFloat(val.replace(/[^0-9.]/g, "").replace(/,/g, "")) || 0;
  return { num, suffix, prefix };
}

function formatNum(n: number, original: string): string {
  const hasComma = original.includes(",");
  if (hasComma) {
    return Math.round(n).toLocaleString("ko-KR");
  }
  return Math.round(n).toString();
}

export function useCountUp(target: string, duration = 1800, active = false) {
  const { num, suffix, prefix } = parseNumber(target);
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(formatNum(eased * num, target));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, num, duration, target]);

  return prefix + display + suffix;
}
