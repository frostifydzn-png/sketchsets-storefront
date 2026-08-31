"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  video,
  title,
}: {
  images: string[];
  /** Muted autoplaying preview, shown as the first slide when present. */
  video?: string;
  title: string;
}) {
  const [active, setActive] = useState(0);
  const slides = video ? ["__video__", ...images] : images;
  const current = slides[active] ?? slides[0];

  return (
    <div>
      <div className="bg-surface ring-line relative aspect-[4/3] overflow-hidden ring-1">
        {current === "__video__" && video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`${title} preview video`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            key={current}
            src={current}
            alt={`${title}, preview ${active + 1} of ${slides.length}`}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            priority
            className="animate-fade-up object-cover"
          />
        )}
      </div>

      {slides.length > 1 && (
        <div
          role="group"
          aria-label={`${title} previews`}
          className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1"
        >
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show preview ${i + 1}`}
              aria-pressed={i === active}
              className={`bg-elevated relative aspect-[4/3] w-24 shrink-0 overflow-hidden ring-inset transition-all ${
                i === active
                  ? "ring-accent opacity-100 ring-2"
                  : "ring-line opacity-60 ring-1 hover:opacity-100"
              }`}
            >
              {src === "__video__" && video ? (
                <span className="text-dim flex h-full w-full items-center justify-center text-[11px] font-semibold">
                  ▶ Video
                </span>
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
