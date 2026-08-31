import { NEWSLETTER_ENDPOINT, site } from "@/lib/site";

/**
 * Footer signup.
 *
 * The form only appears once a real provider endpoint is configured — a signup
 * that quietly discards addresses is worse than no signup. Until then the slot
 * points at the Discord, which is a real place drops actually land, rather than
 * sitting empty or promising a list that does not exist yet.
 */
export function NewsletterForm() {
  if (!NEWSLETTER_ENDPOINT) {
    return (
      <a
        href={site.links.frostoria}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost px-5 py-3 text-[13.5px]"
      >
        Get drops in the Discord
        <span aria-hidden="true">&rarr;</span>
      </a>
    );
  }

  return (
    <form
      action={NEWSLETTER_ENDPOINT}
      method="post"
      className="bg-elevated border-line focus-within:border-accent flex items-center gap-2 rounded-full border p-1.5 pl-4 transition-colors"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="text-text placeholder:text-muted min-w-0 flex-1 bg-transparent py-2 text-[13.5px] outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="btn-primary h-9 w-9 shrink-0 p-0"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
