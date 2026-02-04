import { Play, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface Testimonial {
  category: string;
  quote: string;
  credit: string;
  caseStudy: string;
  ctas: { label: string; url: string; type: 'vimeo' | 'external' }[];
}

const testimonials: Testimonial[] = [
  {
    category: "Broadcast Standard",
    quote: "The production quality and attention to detail set a new standard for our show.",
    credit: "Wendy Walker, Executive Producer | Larry King Now",
    caseStudy: "Dominican Sisters Family Health Clinical Profile",
    ctas: [
      { label: "Watch", url: "https://vimeo.com/707886560", type: "vimeo" }
    ]
  },
  {
    category: "Executive Summit",
    quote: "Exceptional production values that elevated our executive messaging.",
    credit: "Jon Forman, Head of Intraday Liquidity | J.P. Morgan Chase",
    caseStudy: "Executive Leadership Series",
    ctas: [
      { label: "Watch", url: "https://vimeo.com/1161859590", type: "vimeo" }
    ]
  },
  {
    category: "Brand Series",
    quote: "Professional storytelling that captured our brand essence perfectly.",
    credit: "Jake Fowler, CEO | Paddock Blade US3",
    caseStudy: "Brand Interview Series",
    ctas: [
      { label: "Watch Series", url: "https://vimeo.com/883016515", type: "vimeo" },
      { label: "Listen to Podcast", url: "https://paddockblade.com", type: "external" }
    ]
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-institutional">
            What Our <span className="text-[#d4af37]">Clients Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-[#1a1a1a]/70 backdrop-blur-md border border-[#9ca3af]/50 rounded-xl overflow-hidden"
            >
              <CardContent className="p-8 space-y-6">
                {/* Category Badge */}
                <div className="inline-block border border-[#d4af37] text-[#d4af37] uppercase text-xs tracking-widest font-semibold px-3 py-1 rounded-full">
                  {testimonial.category}
                </div>

                {/* Quote */}
                <blockquote className="italic text-gray-200 font-body text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Credit */}
                <div className="text-[#9ca3af] font-body">
                  <span className="mr-2">—</span>
                  {testimonial.credit}
                </div>

                {/* Case Study */}
                <div className="text-gray-500 text-sm font-body">
                  {testimonial.caseStudy}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {testimonial.ctas.map((cta, ctaIndex) => (
                    <Button
                      key={ctaIndex}
                      onClick={() => window.open(cta.url, '_blank')}
                      className={`${
                        ctaIndex === 0
                          ? 'bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]'
                          : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 bg-transparent'
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
