"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatPrice, searchProducts } from "@/lib/products";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query ? searchProducts(query).slice(0, 6) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // ⌘K / Ctrl+K opens, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const go = (slug: string) => {
    close();
    router.push(`/products/${slug}`);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].slug);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="text-dim hover:text-text hover:border-line-bright border-line flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors"
      >
        <SearchIcon />
        <span className="hidden lg:inline">Search</span>
        <kbd className="text-muted hidden font-sans text-[11px] lg:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="bg-ink/80 absolute inset-0 backdrop-blur-sm"
          />

          <div className="bg-surface ring-line animate-fade-up relative w-full max-w-xl overflow-hidden rounded-2xl ring-1 shadow-2xl">
            <div className="border-line flex items-center gap-3 border-b px-4">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search packs, tags, software…"
                className="text-text placeholder:text-muted flex-1 bg-transparent py-4 text-[15px] outline-none"
              />
              <kbd className="text-muted text-[11px]">esc</kbd>
            </div>

            {query && results.length === 0 && (
              <p className="text-muted px-4 py-8 text-center text-[14px]">
                Nothing matches &ldquo;{query}&rdquo;.
              </p>
            )}

            {results.length > 0 && (
              <ul className="max-h-[52vh] overflow-y-auto p-2">
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => go(p.slug)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                        i === active ? "bg-elevated" : ""
                      }`}
                    >
                      <span className="bg-elevated relative h-11 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={p.thumbnail}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold">
                          {p.title}
                        </span>
                        <span className="text-muted block truncate text-[12px]">
                          {p.subcategory}
                        </span>
                      </span>
                      <span className="text-dim shrink-0 text-[13px] font-semibold">
                        {formatPrice(p.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!query && (
              <p className="text-muted px-4 py-8 text-center text-[13px]">
                Try &ldquo;overlays&rdquo;, &ldquo;photoshop&rdquo; or
                &ldquo;texture&rdquo;.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="6.5"
        cy="6.5"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 10l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
