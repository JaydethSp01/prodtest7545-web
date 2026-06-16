import { cn } from "@/lib/cn";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s?.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function GenerativePattern({
  seed = "scrumdev",
  className,
  variant = "auto",
}: {
  seed?: string;
  className?: string;
  variant?: "auto" | "field" | "orbits" | "mesh";
}) {
  const rnd = mulberry32(hashSeed(seed));
  const variants = ["field", "orbits", "mesh"] as const;
  const v = variant === "auto" ? variants[Math.floor(rnd() * variants?.length)] : variant;
  const W = 400, H = 300;
  const shapes: React.ReactNode[] = [];

  if (v === "orbits") {
    const cx = 60 + rnd() * 280, cy = 40 + rnd() * 220;
    for (let i = 0; i < 9; i++) {
      const r = 18 + i * (14 + rnd() * 10);
      shapes.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity={0.06 + rnd() * 0.08}
          strokeWidth={1 + rnd() * 1.5}
          className="transition-all duration-200 ease-in-out"
        />
      );
    }
  } else if (v === "mesh") {
    for (let i = 0; i < 26; i++) {
      const x1 = rnd() * W, y1 = rnd() * H, x2 = rnd() * W, y2 = rnd() * H;
      shapes.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeOpacity={0.05 + rnd() * 0.07}
          strokeWidth={1}
          className="transition-all duration-200 ease-in-out"
        />
      );
    }
    for (let i = 0; i < 14; i++) {
      shapes.push(
        <circle
          key={`d${i}`}
          cx={rnd() * W}
          cy={rnd() * H}
          r={1.5 + rnd() * 2.5}
          fill="white"
          fillOpacity={0.12}
          className="transition-all duration-200 ease-in-out"
        />
      );
    }
  } else {
    for (let i = 0; i < 70; i++) {
      shapes.push(
        <circle
          key={i}
          cx={rnd() * W}
          cy={rnd() * H}
          r={1 + rnd() * 4}
          fill="white"
          fillOpacity={0.04 + rnd() * 0.12}
          className="transition-all duration-200 ease-in-out"
        />
      );
    }
  }

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full rounded-xl shadow-md",
        className
      )}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {shapes}
    </svg>
  );
}

export default GenerativePattern;