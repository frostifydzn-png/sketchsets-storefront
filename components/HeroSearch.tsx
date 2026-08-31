"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { formatPrice, searchProducts } from "@/lib/products";

const suggestions = ["overlays", "psd", "texture", "brushes", "bundle"];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = query ? searchProducts(query).slice(0, 5) : [];
  const showPanel = focused && query.length > 0;

  const go = (slug: string) => {
    setQuery("");
    setFocused(false);
    router.push(`/products/${slug}`);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="bg-surface ring-line focus-within:ring-accent flex items-center gap-3 rounded-2xl px-5 py-4 ring-1 transition-shadow focus-within:ring-2 sm:py-5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="text-muted shrink-0"
        >
          <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M13 13l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <label htmlFor="hero-search" className="sr-only">
          Search packs
        </label>
        <input
          id="hero-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current);
            setFocused(true);
          }}
          // Delay so a click on a result lands before the panel closes.
          onBlur={() => {
            blurTimer.current = setTimeout(() => setFocused(false), 140);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].slug);
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Search overlays, textures, brushes…"
          className="text-text placeholder:text-muted min-w-0 flex-1 bg-transparent text-[16px] outline-none sm:text-[17px]"
        />
        <Link
          href="/browse"
          className="bg-accent text-ink hidden shrink-0 rounded-xl px-5 py-2.5 text-[14px] font-bold transition-transform hover:scale-[1.03] sm:block"
        >
          Browse all
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-muted text-[13px]">Popular:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="border-line text-dim hover:text-text hover:border-line-bright rounded-full border px-3 py-1 text-[13px] transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {showPanel && (
        <div className="bg-surface ring-line animate-fade-up absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl ring-1 shadow-2xl">
          {results.length > 0 ? (
            <ul className="p-2">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => go(p.slug)}
                    className="hover:bg-elevated flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors"
                  >
                    <span className="bg-elevated relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={p.thumbnail}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">
                        {p.title}
                      </span>
                      <span className="text-muted block truncate text-[13px]">
                        {p.subcategory}
                      </span>
                    </span>
                    <span className="text-accent shrink-0 text-[15px] font-bold">
                      {formatPrice(p.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted px-4 py-7 text-center text-[14px]">
              Nothing matches &ldquo;{query}&rdquo; yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
