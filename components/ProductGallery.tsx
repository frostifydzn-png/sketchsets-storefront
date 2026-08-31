"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="bg-ink-raised relative aspect-[5/4] overflow-hidden rounded-2xl">
        <Image
          key={current}
          src={current}
          alt={`${title} — preview ${active + 1} of ${images.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label={`${title} previews`}
          className="mt-4 flex gap-3"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show preview ${i + 1}`}
              aria-pressed={i === active}
              className={`bg-ink-high relative aspect-[5/4] w-20 shrink-0 overflow-hidden rounded-lg ring-inset transition-all sm:w-24 ${
                i === active
                  ? "opacity-100 ring-2 ring-white"
                  : "opacity-70 ring-1 ring-white/15 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
