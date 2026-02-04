import { Play, ExternalLink, Award, TrendingUp, Calendar, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function PortfolioSection() {
  const stats = [
    { label: "Years Experience", value: "10+", icon: Calendar },
    { label: "Production Projects", value: "200+", icon: Award }
  ];



  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-6">
            <span className="text-[#d4af37] font-medium">Our Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-institutional">
            Our <span className="text-[#00d4ff]">Work</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 font-body">
            Video production projects for clients across various industries
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4af37]/20 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-[#d4af37]" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 font-institutional">{stat.value}</div>
                  <div className="text-gray-400 font-body">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Portfolio */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-institutional">
              Award-Winning Production Work
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-body">
              From multi-camera podcast productions and brand films to commercial content and social media campaigns, we create compelling stories that drive results.
            </p>

            {/* Portfolio Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-[#2a2a2a] border border-[#d4af37]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2 font-institutional">50+</div>
                  <p className="text-white font-semibold mb-1 font-body">Multi-Camera Productions</p>
                  <p className="text-gray-400 text-sm font-body">Podcasts, interviews, live events</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border border-[#d4af37]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#00d4ff] mb-2 font-institutional">500+</div>
                  <p className="text-white font-semibold mb-1 font-body">Content Clips Delivered</p>
                  <p className="text-gray-400 text-sm font-body">Short-form for maximum engagement</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border border-[#d4af37]/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2 font-institutional">25+</div>
                  <p className="text-white font-semibold mb-1 font-body">Brands Grown</p>
                  <p className="text-gray-400 text-sm font-body">Through strategic content</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vimeo CTA */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.open('https://vimeo.com/baerstudios', '_blank')}
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] px-8 py-3 inline-flex items-center space-x-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>View Complete Portfolio on Vimeo</span>
            </Button>
          </div>
        </div>




      </div>
    </section>
  );
}