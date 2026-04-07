import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website Enquiry: ${formData.service || "General"} — ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact us for a free, no-obligation quote. We'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Thank You!
                </h3>
                <p className="text-muted-foreground text-lg">
                  Your email client should have opened with your message. If it didn't, please email us directly at{" "}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary font-bold hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <Button
                  className="mt-6 bg-primary hover:bg-primary/90 text-white"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="08X XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-bold text-foreground mb-2">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="Driveways">Driveways</option>
                      <option value="Patios">Patios</option>
                      <option value="Block Paving">Block Paving</option>
                      <option value="Garden Walls">Garden Walls</option>
                      <option value="Artificial Grass">Artificial Grass</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" /> Send Enquiry
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-muted/30 rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Contact Details</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Phone</p>
                    <a href={`tel:${CONTACT_INFO.office}`} className="text-muted-foreground hover:text-primary transition-colors">
                      Office: {CONTACT_INFO.office}
                    </a>
                    <br />
                    <a href={`tel:${CONTACT_INFO.tj}`} className="text-muted-foreground hover:text-primary transition-colors">
                      TJ: {CONTACT_INFO.tj}
                    </a>
                    <br />
                    <a href={`tel:${CONTACT_INFO.tim}`} className="text-muted-foreground hover:text-primary transition-colors">
                      Tim: {CONTACT_INFO.tim}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Location</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-8">
              <h3 className="text-xl font-serif font-bold mb-4">Prefer WhatsApp?</h3>
              <p className="text-white/80 mb-6">
                Send us photos of your project and we'll get back to you with a quote.
              </p>
              <Button
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 font-bold h-12"
                asChild
              >
                <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
