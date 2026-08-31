import type { MetadataRoute } from "next";
import { creators } from "@/lib/creators";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/browse`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/free`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/new`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categories.map((c) => ({
      url: `${site.url}/${c.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...creators.map((c) => ({
      url: `${site.url}/creators/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
