import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageMeta, serviceKeywords } from "./src/data/seoMeta";
import { locationData } from "./src/data/locationData";
import { serviceData } from "./src/data/serviceData";
import { blogPosts } from "./src/data/blogPosts";
import { serviceFAQs } from "./src/data/serviceFAQs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3000;
const base = process.env.BASE_PATH || "/";

function formatLocation(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const serviceSlugs = new Set(["driveways", "patios", "block-paving", "garden-walls", "artificial-grass"]);

function getMetaForUrl(url: string) {
  const parsed = new URL(url, "https://asidepaving.ie");
  const pathname = parsed.pathname.replace(/\/$/, "") || "/";
  const pathParts = pathname.split("/").filter(Boolean);
  const pathLocation = pathParts.length === 2 && serviceSlugs.has(pathParts[0]) ? pathParts[1] : null;
  const locationSlug = pathLocation || parsed.searchParams.get("location");

  if (locationSlug && locationData[locationSlug]) {
    const serviceSlug = pathLocation ? pathParts[0] : pathname.replace("/", "");
    const service = serviceData[serviceSlug];
    const locData = locationData[locationSlug];

    if (service && locData) {
      const locationName = formatLocation(locationSlug);
      const county = locData.county;
      const keywords = serviceKeywords[serviceSlug] || [];
      const canonical = `https://asidepaving.ie/${serviceSlug}/${locationSlug}`;

      const localBizSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Aside Paving",
        "description": `${service.title} in ${locationName}`,
        "url": canonical,
        "telephone": "+35345395149",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Naas",
          "addressRegion": "Co. Kildare",
          "addressCountry": "IE",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 53.2197,
          "longitude": -6.6672,
        },
        "areaServed": `${locationName}, Co. ${county}`,
        "foundingDate": "1985",
        "priceRange": "$$",
      };

      const locationFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (serviceFAQs[serviceSlug] || []).slice(0, 5).map(faq => ({
          "@type": "Question",
          "name": faq.question.includes(locationName) ? faq.question : faq.question.replace('?', ` in ${locationName}?`),
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      };

      return {
        title: `${service.title} in ${locationName}, Co. ${county} | Aside Paving Est. 1985`,
        description: `Expert ${service.title.toLowerCase()} in ${locationName}, Co. ${county}. ${service.features.slice(0, 3).join(", ")}. Est. 1985. Free quotes. Serving Dublin, Kildare & Meath.`,
        keywords: [
          ...keywords.map((k) => `${k} ${locationName}`),
          ...keywords.map((k) => `${k} ${county}`),
          `paving ${locationName}`,
          `paving company ${locationName}`,
          `paving contractors ${locationName}`,
          `${service.title.toLowerCase()} ${locationName}`,
          `${service.title.toLowerCase()} Co. ${county}`,
          `driveways ${locationName}`,
          `patios ${locationName}`,
        ].join(", "),
        canonical,
        schema: JSON.stringify(localBizSchema) + `</script><script type="application/ld+json">` + JSON.stringify(locationFaqSchema),
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const post = blogPosts.find(p => p.slug === blogMatch[1]);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        canonical: `https://asidepaving.ie/blog/${post.slug}`,
        schema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "author": { "@type": "Organization", "name": "Aside Paving" },
          "publisher": { "@type": "Organization", "name": "Aside Paving", "url": "https://asidepaving.ie" },
          "datePublished": post.publishDate,
          "dateModified": post.dateModified ?? "2026-10-06",
          "url": `https://asidepaving.ie/blog/${post.slug}`
        }),
      };
    }
  }

  const staticMeta = pageMeta[pathname];
  if (staticMeta) {
    let schema: string | null = null;

    if (pathname === "/") {
      const homeBiz = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Aside Paving",
        "url": "https://asidepaving.ie",
        "telephone": "+35345395149",
        "foundingDate": "1985",
        "priceRange": "$$",
        "address": { "@type": "PostalAddress", "addressLocality": "Naas", "addressRegion": "Co. Kildare", "addressCountry": "IE" },
        "geo": { "@type": "GeoCoordinates", "latitude": 53.2197, "longitude": -6.6672 },
        "areaServed": ["Dublin", "Kildare", "Meath"],
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "17:00" }
        ],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "6", "bestRating": "5", "worstRating": "1" },
        "review": [
          { "@type": "Review", "author": { "@type": "Person", "name": "Michael O'Brien" }, "reviewRating": { "@type": "Rating", "ratingValue": 5 }, "datePublished": "2024-11-15", "reviewBody": "Aside Paving did a fantastic job on our cobblelock driveway. Professional, clean and finished exactly on time." },
          { "@type": "Review", "author": { "@type": "Person", "name": "Sarah Connolly" }, "reviewRating": { "@type": "Rating", "ratingValue": 5 }, "datePublished": "2024-10-20", "reviewBody": "We had a natural sandstone patio installed and it transformed our garden. Excellent experience throughout." },
          { "@type": "Review", "author": { "@type": "Person", "name": "James Murphy" }, "reviewRating": { "@type": "Rating", "ratingValue": 5 }, "datePublished": "2024-09-10", "reviewBody": "The artificial grass looks incredible and the kids love it. No more muddy footprints. Great team." }
        ]
      };
      const homeWebsite = { "@context": "https://schema.org", "@type": "WebSite", "name": "Aside Paving", "url": "https://asidepaving.ie" };
      const homeFaq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does a new driveway cost in Dublin?", "acceptedAnswer": { "@type": "Answer", "text": "A standard cobblelock or block paving driveway in Dublin costs €60–€100 per m² installed. For an average 50m² driveway expect €3,000–€5,000 depending on material and access. We provide free no-obligation quotes." } },
          { "@type": "Question", "name": "What areas do you cover?", "acceptedAnswer": { "@type": "Answer", "text": "Aside Paving serves County Dublin, County Kildare and County Meath. The locations page lists every town we cover." } },
          { "@type": "Question", "name": "How long has Aside Paving been in business?", "acceptedAnswer": { "@type": "Answer", "text": "Aside Paving was established in 1985 — over 40 years of experience in driveways, patios, block paving, garden walls and artificial grass." } },
          { "@type": "Question", "name": "Do you offer a guarantee?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Aside Paving installations come with a written workmanship guarantee. We stand behind the quality of every job." } },
          { "@type": "Question", "name": "Do I need planning permission for a new driveway?", "acceptedAnswer": { "@type": "Answer", "text": "In most cases no. Driveway works on private residential properties are generally exempted development in Ireland. We advise on this during your free quote." } }
        ]
      };
      schema = JSON.stringify(homeBiz) + `</script><script type="application/ld+json">` + JSON.stringify(homeWebsite) + `</script><script type="application/ld+json">` + JSON.stringify(homeFaq);
    }

    const serviceSlugMap: Record<string, string> = {
      "/driveways": "driveways", "/patios": "patios", "/block-paving": "block-paving",
      "/garden-walls": "garden-walls", "/artificial-grass": "artificial-grass"
    };
    const svcSlug = serviceSlugMap[pathname];
    if (svcSlug && serviceFAQs[svcSlug]) {
      const svcBiz = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Aside Paving",
        "url": `https://asidepaving.ie${pathname}`,
        "telephone": "+35345395149",
        "foundingDate": "1985",
        "priceRange": "$$",
        "address": { "@type": "PostalAddress", "addressLocality": "Naas", "addressRegion": "Co. Kildare", "addressCountry": "IE" },
        "areaServed": ["Dublin", "Kildare", "Meath"]
      };
      const svcFaq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": serviceFAQs[svcSlug].slice(0, 5).map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      };
      schema = JSON.stringify(svcBiz) + `</script><script type="application/ld+json">` + JSON.stringify(svcFaq);
    }

    return {
      title: staticMeta.title,
      description: staticMeta.description,
      keywords: staticMeta.keywords,
      canonical: `https://asidepaving.ie${pathname === "/" ? "" : pathname}`,
      schema,
    };
  }

  return null;
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function injectMeta(template: string, url: string): string {
  const meta = getMetaForUrl(url);
  if (!meta) return template;

  let html = template;

  html = html.replace(
    /<!--ssr-title--><title>[^<]*<\/title>/,
    `<title>${esc(meta.title)}</title>`
  );
  html = html.replace(
    /<!--ssr-desc--><meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(meta.description)}" />`
  );
  html = html.replace(
    /<!--ssr-keywords--><meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${esc(meta.keywords)}" />`
  );
  html = html.replace(
    /<!--ssr-canonical--><link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`
  );
  html = html.replace(
    /<!--ssr-og-title--><meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(meta.title)}" />`
  );
  html = html.replace(
    /<!--ssr-og-desc--><meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(meta.description)}" />`
  );
  html = html.replace(
    /<!--ssr-og-url--><meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`
  );
  html = html.replace(
    /<!--ssr-tw-title--><meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`
  );
  html = html.replace(
    /<!--ssr-tw-desc--><meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`
  );

  if (meta.schema) {
    html = html.replace(
      /<!--ssr-schema-->/,
      `<script type="application/ld+json">${meta.schema}</script>`
    );
  } else {
    html = html.replace(/<!--ssr-schema-->/, "");
  }

  return html;
}

const redirects: Record<string, string> = {
  '/driveway': '/driveways',
  '/patio': '/patios',
  '/garden-wall': '/garden-walls',
  '/artificial-lawn': '/artificial-grass',
  '/fake-grass': '/artificial-grass',
  '/astroturf': '/artificial-grass',
  '/cobblelock': '/block-paving',
  '/tarmac': '/driveways',
};

async function createApp() {
  const app = express();

  app.use((req, res, next) => {
    const rawLocation = req.query.location;
    const location = Array.isArray(rawLocation) ? rawLocation[0] : rawLocation;
    if (typeof location === "string" && serviceSlugs.has(req.path.replace(/^\//, "")) && locationData[location]) {
      return res.redirect(301, `${req.path}/${location}`);
    }
    const target = redirects[req.path];
    if (target) {
      return res.redirect(301, target);
    }
    next();
  });

  app.use((_, res, next) => {
    res.set("X-Robots-Tag", "index, follow");
    if (isProduction) {
      res.set("Cache-Control", "public, max-age=3600");
    }
    next();
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
      root: __dirname,
    });

    app.use(vite.middlewares);

    app.use(/.*/, async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await fs.readFile(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const { render } = await vite.ssrLoadModule(path.resolve(__dirname, "src/entry-server.tsx"));
        const pagePath = url.replace(base.replace(/\/$/, ""), "") || "/";
        const { html: appHtml } = render(pagePath);
        let html = template.replace("<!--ssr-outlet-->", appHtml);
        html = injectMeta(html, url);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e: unknown) {
        if (e instanceof Error) vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const compression = (await import("compression")).default;
    app.use(compression());
    app.use(
      base,
      express.static(path.resolve(__dirname, "dist/public"), { index: false }),
    );

    const template = await fs.readFile(
      path.resolve(__dirname, "dist/public/index.html"),
      "utf-8",
    );
    const { render } = await import(
      path.resolve(__dirname, "dist/server/entry-server.js")
    );

    app.use(/.*/, async (req, res, next) => {
      try {
        const pagePath = req.originalUrl.replace(base.replace(/\/$/, ""), "") || "/";
        const { html: appHtml } = render(pagePath);
        let html = template.replace("<!--ssr-outlet-->", appHtml);
        html = injectMeta(html, req.originalUrl);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(port, () => {
    console.log(`SSR server running on port ${port} (${isProduction ? "production" : "development"})`);
  });
}

createApp().catch((err) => {
  console.error(err);
  process.exit(1);
});
