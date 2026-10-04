import { cn } from "@/lib/utils";

/** CSS-only infinite marquee. Content is duplicated once so the loop is seamless. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee flex overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max shrink-0"
        data-reverse={reverse}
        data-pause={pauseOnHover}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
