import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SchemaScript } from "@/components/SchemaMarkup";

export const homepageFAQs = [
  {
    question: "How much does a new driveway cost in Dublin?",
    answer: "A standard cobblelock or block paving driveway in Dublin costs between €60–€100 per square metre, installed. For an average 40–50m² driveway, expect to pay €2,500–€5,000 depending on material, prep work and access. We provide free no-obligation quotes."
  },
  {
    question: "How long does a driveway installation take?",
    answer: "Most standard driveway installations take 2–4 days. Larger driveways or those requiring significant excavation may take 5–7 days. We'll give you a precise timeline at the quote stage."
  },
  {
    question: "Do I need planning permission for a new driveway?",
    answer: "In most cases, no. Driveway works on private residential properties are generally considered exempted development in Ireland. However, if you need a new kerb crossing on a public road, you'll need local authority approval. We can advise you during the free quote."
  },
  {
    question: "What areas do you cover?",
    answer: "Aside Paving serves all areas across County Dublin, County Kildare and County Meath — over 135 towns and villages. See our full list of service areas."
  },
  {
    question: "How long has Aside Paving been in business?",
    answer: "Aside Paving was established in 1985 — giving us over 40 years of experience in driveways, patios, block paving, garden walls and artificial grass across the greater Dublin area."
  },
  {
    question: "Are you fully insured?",
    answer: "Yes. Aside Paving is fully insured for all paving and landscaping work. We carry public liability insurance on every job. Documentation available on request."
  },
  {
    question: "How long will my new driveway last?",
    answer: "A well-installed block paving or cobblelock driveway can last 30+ years with basic maintenance. Tarmac typically lasts 15–25 years. Resin bound driveways last 20–25 years. We use quality materials and proper sub-base preparation to maximise longevity."
  },
  {
    question: "Do you offer a guarantee?",
    answer: "Yes. All Aside Paving installations come with a written workmanship guarantee. We stand behind the quality of our work and will address any issues that arise."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-bold text-foreground pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function HomepageFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        <SchemaScript data={faqSchema} />
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Everything you need to know about paving in Dublin, Kildare & Meath
          </p>
        </div>

        <div className="space-y-3">
          {homepageFAQs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
