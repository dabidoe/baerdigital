import { Play } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export default function InstitutionalImpactSection() {
  return (
    <section id="institutional-impact" className="py-20 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-institutional">
            Institutional <span className="text-[#d4af37]">Impact</span>
          </h2>
        </div>

        {/* Featured Film Card */}
        <div className="flex justify-center">
          <Card className="max-w-3xl w-full bg-[#1a1a1a]/70 backdrop-blur-md border border-[#9ca3af]/50 rounded-xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 space-y-6">
              {/* Label */}
              <div className="text-[#9ca3af] uppercase text-xs tracking-widest font-semibold">
                Dell | PYN
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white font-institutional">
                Corporate Film
              </h3>

              {/* Description */}
              <p className="text-gray-300 font-body text-lg leading-relaxed">
                Enterprise-level corporate film production for Dell and Paddock Yard Network, showcasing institutional excellence through strategic visual storytelling.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={() => window.open('https://vimeo.com/1161863707', '_blank')}
                  className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a] flex items-center gap-2"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  Watch Film
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
