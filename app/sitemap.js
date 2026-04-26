const siteUrl = "https://faraazzz31.github.io";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
