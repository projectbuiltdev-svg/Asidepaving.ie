import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function render(url: string) {
  const path = url.split("?")[0] || "/";
  const search = url.includes("?") ? url.slice(url.indexOf("?")) : "";

  const useStaticLocation = (): [string, () => void] => [path, () => {}];
  (useStaticLocation as any).searchHook = (): string => search;

  const html = renderToString(
    <Router hook={useStaticLocation}>
      <App />
    </Router>
  );

  return { html };
}
