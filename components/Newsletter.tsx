import { NEWSLETTER_ENDPOINT } from "@/lib/site";

/**
 * Renders only once a real provider endpoint is configured. A signup form that
 * quietly discards addresses is worse than no signup form.
 */
export function Newsletter() {
  if (!NEWSLETTER_ENDPOINT) return null;

  return (
    <section className="shell section-gap">
      <div className="bg-surface ring-line p-7 ring-1 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05]">
              Good resources. No garbage.
            </h2>
            <p className="text-dim mt-3 text-[15px] leading-relaxed">
              Occasional SketchSets drops. New packs, freebies and things worth
              stealing for your workflow.
            </p>
          </div>
          <form
            action={NEWSLETTER_ENDPOINT}
            method="post"
            className="flex w-full max-w-md gap-2"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="bg-elevated ring-line focus:ring-accent text-text placeholder:text-muted min-w-0 flex-1 px-4 py-3.5 text-[15px] ring-1 outline-none"
            />
            <button
              type="submit"
              className="bg-accent text-ink shrink-0 px-5 py-3.5 text-[15px] font-bold transition-transform hover:scale-[1.02]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
