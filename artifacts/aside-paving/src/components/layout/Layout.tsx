import { Header } from "./Header";
import { Footer } from "./Footer";
import { PartnersStrip } from "@/components/shared/PartnersStrip";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <PartnersStrip />
      <Footer />
    </div>
  );
}
