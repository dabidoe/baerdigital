import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function HeroSection() {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"
          alt="Content creator with headset recording podcast"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/70 to-[#1a1a1a]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col justify-center h-full space-y-8">
          {/* Main Headline - Positioned Higher */}
          <div className="transform -translate-y-16">
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
              }}
              className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
            >
              Full-Service <span className="text-[#d4af37]">Digital Marketing</span>
              <br />
              <span className="text-[#00d4ff]">Websites. Videos. Podcasts.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Call to Action - Bottom of Hero */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subtitle - Above Button */}
          <div className="mb-8">
            <p
              style={{
                fontFamily: "'Inter', Helvetica, sans-serif",
                lineHeight: "1.6",
              }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto"
            >
              Multi-camera production, strategic content segmentation, and maximum market engagement. One team in Philadelphia, unlimited possibilities.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleContactClick}
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f4c947] to-[#d4af37] hover:from-[#f4c947] hover:via-[#d4af37] hover:to-[#f4c947] text-[#1a1a1a] px-12 py-6 text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}