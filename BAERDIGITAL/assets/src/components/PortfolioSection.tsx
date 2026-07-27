import { useEffect, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import VideoPopup from './VideoPopup';

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
  const [activeReview, setActiveReview] = useState(0);
  const activeTile = portfolioTiles[activeReview];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % portfolioTiles.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="portfolio" className="cinematic-band py-16 lg:py-24 bg-[#050607]">
      <div style={{ maxWidth: "1500px" }} className="relative mx-auto px-4 sm:px-6 lg:px-8 section-reveal">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
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
            className="text-lg text-[#d6dde1] max-w-3xl mx-auto mb-6"
          >
            Production work across broadcast, executive, and brand storytelling
          </p>
        </div>

        {/* Large Video Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {portfolioTiles.map((tile, index) => (
            <div
              key={index}
              className={`group transition-all duration-300 hover:-translate-y-2 ${
                index === 2 ? 'md:col-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveReview(index)}
                className={`mb-4 flex w-full flex-col gap-1 border px-4 py-3 text-left transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                  activeReview === index
                    ? 'border-[#00d4ff] bg-[#00d4ff]/10 text-[#9beeff]'
                    : 'border-white/10 bg-white/[0.03] text-[#d6dde1] hover:border-[#00d4ff]/50'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {tile.category}
                </span>
                <span className="text-sm text-[#7f8a93]">{tile.caseStudy}</span>
              </button>
              <div className={index === 2 ? 'mx-auto max-w-4xl' : ''}>
                <VideoPopup
                  vimeoId={tile.vimeoId}
                  title={tile.caseStudy}
                  className="border border-white/15 shadow-2xl shadow-black/40 transition-all duration-300 group-hover:border-[#00d4ff]/60"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Rotating Reviews */}
        <div className="mb-12 border border-white/10 bg-[#11161a]/90 shadow-2xl shadow-black/30">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#9beeff]">
                Client Review
              </p>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
                className="text-3xl text-white md:text-4xl"
              >
                {activeTile.caseStudy}
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {portfolioTiles.map((tile, index) => (
                  <button
                    key={tile.vimeoId}
                    type="button"
                    onClick={() => setActiveReview(index)}
                    aria-label={`Show review for ${tile.caseStudy}`}
                    className={`h-2.5 transition-all duration-300 ${
                      activeReview === index
                        ? 'w-12 bg-[#00d4ff]'
                        : 'w-7 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <blockquote
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                }}
                className="text-2xl leading-tight text-[#f4f7f8] md:text-4xl"
              >
                "{activeTile.quote}"
              </blockquote>
              <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-base font-semibold text-[#9beeff]">{activeTile.credit}</p>
                  <p className="text-sm text-[#7f8a93]">{activeTile.category}</p>
                </div>
                {activeTile.ctas && (
                  <div className="flex flex-wrap gap-2">
                    {activeTile.ctas.map((cta, ctaIndex) => (
                      <Button
                        key={ctaIndex}
                        onClick={() => window.open(cta.url, "_blank")}
                        className={`${
                          ctaIndex === 0
                            ? 'bg-[#00d4ff] hover:bg-[#9beeff] text-[#050607]'
                            : 'border border-[#00d4ff]/60 text-[#9beeff] hover:bg-[#00d4ff]/10 bg-transparent'
                        } flex items-center gap-2`}
                        size="sm"
                      >
                        {cta.type === 'vimeo' ? (
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
          </div>
        </div>

        {/* Stats Below Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-white/10 bg-white/[0.04] p-4 md:p-6">
          <div className="text-center py-4">
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
              className="text-[#b7c0c7]"
            >
              Years Experience
            </div>
          </div>
          <div className="text-center py-4 border-y md:border-x md:border-y-0 border-white/10">
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
              className="text-[#b7c0c7]"
            >
              Production Projects
            </div>
          </div>
          <div className="text-center py-4">
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
    </section>
  );
}
