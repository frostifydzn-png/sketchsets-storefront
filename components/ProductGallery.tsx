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
      <div className="border-line bg-ink-high relative aspect-[4/3] overflow-hidden rounded-xl border">
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
          className="mt-3 grid grid-cols-5 gap-2"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show preview ${i + 1}`}
              aria-pressed={i === active}
              className={`bg-ink-high relative aspect-[4/3] overflow-hidden rounded-lg border transition-colors ${
                i === active
                  ? "border-accent"
                  : "border-line hover:border-line-strong"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
