import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SchemaScript } from "@/components/SchemaMarkup";
import { blogPosts } from "@/data/blogPosts";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableRows: string[][] = [];
  let inTable = false;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      const cells = line.split("|").filter(c => c.trim() !== "");
      if (!cells.every(c => /^[\s-]+$/.test(c))) {
        tableRows.push(cells.map(c => c.trim()));
      }
      i++;
      continue;
    }

    if (inTable) {
      inTable = false;
      const [header, ...body] = tableRows;
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary/5">
                {header.map((h, j) => (
                  <th key={j} className="text-left p-3 font-bold border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-serif font-bold mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-serif font-bold mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 mb-4 space-y-1">
          {items.map((item, j) => <li key={j} className="text-muted-foreground">{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip
    } else {
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-4">{renderInline(line)}</p>);
    }
    i++;
  }

  if (inTable && tableRows.length > 0) {
    const [header, ...body] = tableRows;
    elements.push(
      <div key="table-end" className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary/5">
              {header.map((h, j) => (
                <th key={j} className="text-left p-3 font-bold border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={key++} className="font-bold text-foreground">{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      parts.push(
        <Link key={key++} href={match[3]} className="text-primary hover:underline font-medium">
          {match[2]}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild><Link href="/blog">Back to Blog</Link></Button>
        </div>
      </Layout>
    );
  }

  const related = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.thumbnail,
    "author": { "@type": "Organization", "name": "Aside Paving" },
    "publisher": { "@type": "Organization", "name": "Aside Paving", "url": "https://asidepaving.ie" },
    "datePublished": post.publishDate,
    "url": `https://asidepaving.ie/blog/${post.slug}`
  };

  return (
    <Layout>
      <SchemaScript data={articleSchema} />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishDate).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">{post.title}</h1>

              <img
                src={post.thumbnail}
                alt={post.thumbnailAlt}
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
              />

              <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4">{post.excerpt}</p>

              <div className="prose prose-lg max-w-none">
                {renderMarkdown(post.content)}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link href="/blog" className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </div>

            <aside className="lg:w-1/3 space-y-8">
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-serif font-bold text-lg mb-3">Get a Free Quote</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert paving across Dublin, Kildare & Meath since 1985. Free no-obligation quotes.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${CONTACT_INFO.office}`} className="text-primary font-medium hover:underline">
                    {CONTACT_INFO.office}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-border">
                <h3 className="font-serif font-bold text-lg mb-4">Our Services</h3>
                <nav className="space-y-2">
                  {[
                    { label: "Driveways", href: "/driveways" },
                    { label: "Patios", href: "/patios" },
                    { label: "Block Paving", href: "/block-paving" },
                    { label: "Garden Walls", href: "/garden-walls" },
                    { label: "Artificial Grass", href: "/artificial-grass" },
                  ].map(s => (
                    <Link key={s.href} href={s.href}
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-sm hover:bg-muted/50 transition-colors group">
                      <span>{s.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </nav>
              </div>

              {related.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-border">
                  <h3 className="font-serif font-bold text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map(r => (
                      <Link key={r.slug} href={`/blog/${r.slug}`}
                        className="block text-sm font-medium hover:text-primary transition-colors">
                        {r.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
