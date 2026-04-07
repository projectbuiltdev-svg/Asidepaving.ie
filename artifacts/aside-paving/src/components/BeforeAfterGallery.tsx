import { useRef, useState, useCallback } from "react";
import { IMAGES } from "@/lib/constants";

interface BeforeAfterPair {
  before: string;
  after: string;
  title: string;
  caption: string;
}

const pairs: BeforeAfterPair[] = [
  {
    before: IMAGES.gallery[1],
    after: IMAGES.gallery[0],
    title: "Driveway Transformation",
    caption: "Block paving driveway installation — Dublin"
  },
  {
    before: IMAGES.gallery[3],
    after: IMAGES.gallery[4],
    title: "Patio Transformation",
    caption: "Natural stone patio installation — Dublin"
  },
  {
    before: IMAGES.gallery[7],
    after: IMAGES.gallery[8],
    title: "Garden Transformation",
    caption: "Artificial grass installation — Dublin"
  }
];

function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(() => setDragging(true), []);
  const handleMouseUp = useCallback(() => setDragging(false), []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) updatePosition(e.clientX);
  }, [dragging, updatePosition]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <div
        ref={containerRef}
        className="relative w-full aspect-video cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <img
          src={pair.after}
          alt={`After - ${pair.title}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={pair.before}
            alt={`Before - ${pair.title}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth || 0}px`, maxWidth: "none" }}
            loading="lazy"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
              <path d="M6 10L2 10M2 10L5 7M2 10L5 13M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">Before</span>
        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">After</span>
      </div>
      <div className="bg-white p-4">
        <h3 className="font-serif font-bold">{pair.title}</h3>
        <p className="text-sm text-muted-foreground">{pair.caption}</p>
      </div>
    </div>
  );
}

export function BeforeAfterGallery() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Paving Work</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Drag the slider to see the transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pairs.map((pair, idx) => (
            <BeforeAfterSlider key={idx} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  );
}
