"use client";

import { useMagneticButton } from "@/hooks/useMagneticButton";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  as?: "button" | "a";
  target?: string;
  rel?: string;
  id?: string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  as: Tag = "button",
  target,
  rel,
  id,
}: MagneticButtonProps) {
  const magneticRef = useMagneticButton(0.35) as React.RefObject<HTMLAnchorElement & HTMLButtonElement>;

  const baseStyles =
    "magnetic-btn relative overflow-hidden px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 select-none";

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-white/90",
    ghost:
      "text-white/70 hover:text-white",
    outline:
      "border border-white/20 text-white/80 hover:border-white/50 hover:text-white hover:bg-white/5",
  };

  const props = {
    ref: magneticRef,
    className: cn(baseStyles, variantStyles[variant], className),
    onClick,
    id,
  };

  if (Tag === "a") {
    return (
      <a {...props} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return <button {...props}>{children}</button>;
}
