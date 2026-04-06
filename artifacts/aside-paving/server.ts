import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3000;
const base = process.env.BASE_PATH || "/";

async function createApp() {
  const app = express();

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
        const html = template.replace("<!--ssr-outlet-->", appHtml);
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
        const html = template.replace("<!--ssr-outlet-->", appHtml);
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
