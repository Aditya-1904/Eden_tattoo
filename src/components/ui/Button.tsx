import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full eyebrow transition-colors duration-500 ease-expo focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stencil disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-stencil px-6 py-4",
  outline: "border border-ink/25 text-ink hover:border-stencil hover:text-stencil px-6 py-4",
  ghost: "text-ink hover:text-stencil px-0 py-2",
};

/** Label that rolls up to a duplicate on hover. */
function Roll({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-expo group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-expo group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("h-3 w-3 shrink-0", className)}>
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode; arrow?: boolean };

export function ButtonLink({
  href,
  variant = "solid",
  className,
  children,
  arrow = true,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const content = (
    <>
      <Roll>{children}</Roll>
      {arrow && <Arrow className="transition-transform duration-500 ease-expo group-hover/btn:rotate-45" />}
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className,
  children,
  arrow = true,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Roll>{children}</Roll>
      {arrow && <Arrow className="transition-transform duration-500 ease-expo group-hover/btn:rotate-45" />}
    </button>
  );
}

/** Underlined text link with a sweeping stencil-violet underline. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const cls = cn(
    "relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-stencil after:transition-transform after:duration-500 after:ease-expo hover:after:origin-left hover:after:scale-x-100",
    className,
  );
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
