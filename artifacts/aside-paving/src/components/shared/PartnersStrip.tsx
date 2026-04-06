import partnersImg from "@assets/partners-strip.jpg";

export function PartnersStrip() {
  return (
    <section className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto max-w-4xl px-4">
        <p className="text-center text-sm text-gray-500 font-medium mb-6 uppercase tracking-wider">
          Trusted Partners & Suppliers
        </p>
        <div className="flex items-center justify-center">
          <img
            src={partnersImg}
            alt="Roadstone, Tobermore Approved Paving Contractor, Kilsaran - Celebrating 60 Years"
            className="max-w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
