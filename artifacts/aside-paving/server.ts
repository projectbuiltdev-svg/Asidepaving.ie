import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageMeta, serviceKeywords } from "./src/data/seoMeta";
import { locationData } from "./src/data/locationData";
import { serviceData } from "./src/data/serviceData";
import { blogPosts } from "./src/data/blogPosts";

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

function getMetaForUrl(url: string) {
  const parsed = new URL(url, "https://asidepaving.ie");
  const pathname = parsed.pathname.replace(/\/$/, "") || "/";
  const locationSlug = parsed.searchParams.get("location");

  if (locationSlug && locationData[locationSlug]) {
    const serviceSlug = pathname.replace("/", "");
    const service = serviceData[serviceSlug];
    const locData = locationData[locationSlug];

    if (service && locData) {
      const locationName = formatLocation(locationSlug);
      const county = locData.county;
      const keywords = serviceKeywords[serviceSlug] || [];
      const canonical = `https://asidepaving.ie/${serviceSlug}?location=${locationSlug}`;

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
        schema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Aside Paving",
          "description": `${service.title} in ${locationName}`,
          "url": canonical,
          "telephone": "045395149",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": locationName,
            "addressRegion": `Co. ${county}`,
            "addressCountry": "IE",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": locData.lat,
            "longitude": locData.lng,
          },
          "areaServed": `${locationName}, Co. ${county}`,
          "foundingDate": "1985",
          "priceRange": "$$",
        }),
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
          "url": `https://asidepaving.ie/blog/${post.slug}`
        }),
      };
    }
  }

  const staticMeta = pageMeta[pathname];
  if (staticMeta) {
    return {
      title: staticMeta.title,
      description: staticMeta.description,
      keywords: staticMeta.keywords,
      canonical: `https://asidepaving.ie${pathname === "/" ? "" : pathname}`,
      schema: null,
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
