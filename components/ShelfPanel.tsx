"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

/**
 * The layout signature of this storefront.
 *
 * A bordered panel split into a narrow left rail carrying the section's name
 * and a sentence about it, and a horizontal product track on the right that
 * scrolls past a circular arrow. It reads as a shelf rather than a grid, and
 * because the label sits beside the products instead of above them, four
 * sections stack down the page without four full-width headings shouting over
 * each other.
 *
 * Scroll state is driven through refs and direct DOM writes rather than React
 * state: the buttons update on every scroll frame, and re-rendering the whole
 * track that often would be wasteful (it also keeps this clear of the
 * set-state-in-effect rule).
 */
export function ShelfPanel({
  title,
  description,
  icon,
  action,
  children,
}: {
  title: string;
  description?: string;
  /** Small glyph shown before the title, as in the reference design. */
  icon?: React.ReactNode;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    // A few pixels of slack: sub-pixel layout means scrollLeft rarely lands
    // exactly on 0 or on the maximum.
    const atStart = rail.scrollLeft <= 4;
    const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    prevRef.current?.toggleAttribute("disabled", atStart);
    nextRef.current?.toggleAttribute("disabled", atEnd);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    rail.addEventListener("scroll", sync, { passive: true });

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
    observer?.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      observer?.disconnect();
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8 });
  };

  return (
    <section className="panel">
      <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
        {/* Label rail. Narrow on purpose, so the products get the width. */}
        <div className="lg:pt-1">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-[0.06em] text-white uppercase">
            {icon}
            {title}
          </h2>
          {description && (
            <p className="text-dim mt-3 max-w-[38ch] text-[14px] leading-relaxed lg:max-w-none">
              {description}
            </p>
          )}
          {action && (
            <Link
              href={action.href}
              className="btn-ghost mt-5 px-4 py-2.5 text-[13px]"
            >
              {action.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

        {/* Product track. */}
        <div className="relative min-w-0">
          <div ref={railRef} className="rail py-1">
            {children}
          </div>

          {/*
            Arrows sit over the track, aligned to the cover art rather than the
            card's full height so they never drift down next to the price line.
          */}
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 hidden items-center justify-between sm:flex">
            <RailButton
              ref={prevRef}
              label="Scroll left"
              onClick={() => nudge(-1)}
              direction="left"
            />
            <RailButton
              ref={nextRef}
              label="Scroll right"
              onClick={() => nudge(1)}
              direction="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RailButton({
  ref,
  label,
  onClick,
  direction,
}: {
  ref: React.Ref<HTMLButtonElement>;
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`bg-raised/90 border-line-bright hover:border-accent hover:text-accent pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white backdrop-blur-md transition-all duration-300 disabled:pointer-events-none disabled:opacity-0 ${
        direction === "left" ? "-translate-x-3" : "translate-x-3"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d={direction === "right" ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
