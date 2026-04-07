import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const services = [
    { name: "Driveways", href: "/driveways" },
    { name: "Patios", href: "/patios" },
    { name: "Block Paving", href: "/block-paving" },
    { name: "Garden Walls", href: "/garden-walls" },
    { name: "Artificial Grass", href: "/artificial-grass" },
  ];

  return (
    <Layout>
      <meta name="robots" content="noindex, follow" />
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-serif font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors mb-10">
          Back to Homepage
        </Link>
        <div className="border-t border-border pt-8">
          <h2 className="text-xl font-serif font-bold mb-4">Our Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map(s => (
              <Link key={s.href} href={s.href} className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
