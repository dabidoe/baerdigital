import { Play, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface PortfolioTile {
  category: string;
  vimeoId: string;
  quote: string;
  credit: string;
  caseStudy: string;
  ctas?: { label: string; url: string; type: 'vimeo' | 'external' }[];
}

const portfolioTiles: PortfolioTile[] = [
  {
    category: "THE BROADCAST STANDARD",
    vimeoId: "707886560",
    quote: "Baer Digital Studios brings the technical precision and calm under pressure required for high-profile network production. When the stakes are broadcast-level, they are the professionals you want behind the lens.",
    credit: "Wendy Walker, Executive Producer | Larry King Now",
    caseStudy: "Dominican Sisters Family Health Clinical Profile",
    ctas: [{ label: "Watch", url: "https://vimeo.com/707886560", type: "vimeo" }],
  },
  {
    category: "GLOBAL TECHNOLOGY SUMMIT",
    vimeoId: "1161859590",
    quote: "Exceptional reliability and executive presence. The team at Baer Digital Studios didn't just capture an interview; he captured the institutional authority required for our global leadership series that aligned with our standards.",
    credit: "Jon Forman, Head of Intraday Liquidity | J.P. Morgan Chase",
    caseStudy: "Executive Leadership Series",
    ctas: [{ label: "Watch", url: "https://vimeo.com/1161859590", type: "vimeo" }],
  },
  {
    category: "BRAND INTERVIEW SERIES",
    vimeoId: "883016515",
    quote: "Baer Digital Studios are experts crafting compelling content that resonated with our customers, crafting content into a high-engagement series. They gave our brand the voice and the cinema-grade authority we needed to own the market.",
    credit: "Jake Fowler, CEO | Paddock Blade US3",
    caseStudy: "Brand Interview Series",
    ctas: [
      { label: "Watch Series", url: "https://vimeo.com/883016515", type: "vimeo" },
      { label: "Listen to Podcast", url: "https://open.spotify.com/show/07QCOEslplMUjYK6x1vjdb", type: "external" },
    ],
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-12 lg:py-16 bg-[#1a1a1a]">
      <div style={{ maxWidth: "1400px" }} className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Our <span className="text-[#00d4ff]">Work</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-6"
          >
            Production work across broadcast, executive, and brand storytelling
          </p>
        </div>

        {/* 3-Tile Grid: Videos + Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {portfolioTiles.map((tile, index) => (
            <div key={index} className="flex flex-col">
              {/* Video Player - Full Width */}
              <div className="w-full mb-0">
                <div className="aspect-video bg-[#0a0a0a] rounded-t-lg overflow-hidden border border-[#9ca3af]/30">
                  <iframe
                    src={`https://player.vimeo.com/video/${tile.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={tile.caseStudy}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Testimonial Card - No Top Gap */}
              <div className="bg-[#1a1a1a]/70 backdrop-blur-md border border-[#9ca3af]/50 border-t-0 rounded-b-lg p-6 space-y-4 flex-1">
                {/* Category Badge */}
                <div className="inline-block border border-[#d4af37] text-[#d4af37] uppercase text-xs tracking-widest font-semibold px-3 py-1 rounded-full">
                  {tile.category}
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontFamily: "'Inter', Helvetica, sans-serif",
                    lineHeight: "1.6",
                  }}
                  className="italic text-gray-200 text-base"
                >
                  "{tile.quote}"
                </blockquote>

                {/* Credit */}
                <div
                  style={{
                    fontFamily: "'Inter', Helvetica, sans-serif",
                    lineHeight: "1.6",
                  }}
                  className="text-[#9ca3af] text-sm"
                >
                  <span className="mr-2">—</span>
                  {tile.credit}
                </div>

                {/* Case Study */}
                <div
                  style={{
                    fontFamily: "'Inter', Helvetica, sans-serif",
                    lineHeight: "1.6",
                  }}
                  className="text-gray-500 text-sm"
                >
                  {tile.caseStudy}
                </div>

                {/* CTAs */}
                {tile.ctas && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tile.ctas.map((cta, ctaIndex) => (
                      <Button
                        key={ctaIndex}
                        onClick={() => window.open(cta.url, "_blank")}
                        className={`${
                          ctaIndex === 0
                            ? "bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]"
                            : "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 bg-transparent"
                        } flex items-center gap-2`}
                        size="sm"
                      >
                        {cta.type === "vimeo" ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        {cta.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Below Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
              className="text-3xl text-white mb-2"
            >
              10+
            </div>
            <div
              style={{
                fontFamily: "'Inter', Helvetica, sans-serif",
                lineHeight: "1.6",
              }}
              className="text-gray-400"
            >
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
              className="text-3xl text-white mb-2"
            >
              200+
            </div>
            <div
              style={{
                fontFamily: "'Inter', Helvetica, sans-serif",
                lineHeight: "1.6",
              }}
              className="text-gray-400"
            >
              Production Projects
            </div>
          </div>
          <div className="text-center">
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
              }}
              className="text-3xl text-[#00d4ff] mb-2"
            >
              50+
            </div>
            <div
              style={{
                fontFamily: "'Inter', Helvetica, sans-serif",
                lineHeight: "1.6",
              }}
              className="text-gray-400"
            >
              Multi-Camera Productions
            </div>
          </div>
        </div>
      </div>

      <script src="https://player.vimeo.com/api/player.js"></script>
    </section>
  );
}
