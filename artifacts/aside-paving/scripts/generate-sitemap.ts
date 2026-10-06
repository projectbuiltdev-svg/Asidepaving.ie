import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { locationData } from "../src/data/locationData.js";
import { blogPosts } from "../src/data/blogPosts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serviceSlugs = ["driveways", "patios", "block-paving", "garden-walls", "artificial-grass"];

const corePages = [
  { loc: "https://asidepaving.ie/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://asidepaving.ie/driveways", changefreq: "weekly", priority: "0.9" },
  { loc: "https://asidepaving.ie/patios", changefreq: "weekly", priority: "0.9" },
  { loc: "https://asidepaving.ie/block-paving", changefreq: "weekly", priority: "0.9" },
  { loc: "https://asidepaving.ie/garden-walls", changefreq: "weekly", priority: "0.9" },
  { loc: "https://asidepaving.ie/artificial-grass", changefreq: "weekly", priority: "0.9" },
  { loc: "https://asidepaving.ie/locations", changefreq: "monthly", priority: "0.8" },
  { loc: "https://asidepaving.ie/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "https://asidepaving.ie/about", changefreq: "monthly", priority: "0.7" },
];

const locationSlugs = Object.keys(locationData);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const page of corePages) {
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
}

for (const service of serviceSlugs) {
  for (const location of locationSlugs) {
    xml += `  <url>\n`;
    xml += `    <loc>https://asidepaving.ie/${service}/${location}</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }
}

xml += `  <url>\n    <loc>https://asidepaving.ie/blog</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
for (const post of blogPosts) {
  xml += `  <url>\n    <loc>https://asidepaving.ie/blog/${post.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
}

xml += `</urlset>\n`;

const outPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");

const totalLocPages = serviceSlugs.length * locationSlugs.length;
console.log(`Sitemap generated: ${corePages.length} core + ${totalLocPages} location pages = ${corePages.length + totalLocPages} total URLs`);
console.log(`Written to: ${outPath}`);
