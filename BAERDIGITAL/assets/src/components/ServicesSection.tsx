import { Video, Mic2, Package, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export default function ServicesSection() {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Video,
      title: "Video Production",
      description: "Professional multi-camera video production that creates once, distributes everywhere. We capture from multiple angles to generate short-form clips for social media, long-form content for YouTube, and everything in between.",
      offerings: ["Multi-Camera Setup", "Short-Form Social Clips", "Commercial Production", "Podcast Video Recording", "Brand Content Libraries"],
      accent: "#00d4ff"
    },
    {
      icon: Mic2,
      title: "Podcast Production",
      description: "Multi-camera podcast production that goes beyond audio. We record your show with visual elements, create clip-ready segments, and deliver content optimized for podcast platforms, YouTube, and social media.",
      offerings: ["Multi-Camera Recording", "Professional Editing & Mixing", "Clip Segmentation Strategy", "Distribution Support", "Video + Audio Delivery"],
      accent: "#d4af37"
    },
    {
      icon: Package,
      title: "Brand Growth Package",
      description: "Full-service content strategy designed to grow your brand. Multi-camera production, intelligent clip segmentation, and coordinated distribution across all platforms—turning one production into dozens of engaging assets.",
      offerings: ["Strategic Content Planning", "Multi-Format Production", "Clip & Segment Creation", "Cross-Platform Distribution", "Growth Analytics"],
      accent: "#00d4ff",
      isPackage: true
    }
  ];

  return (
    <section id="services" className="py-12 lg:py-16 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-6">
            <span className="text-[#d4af37] font-medium">What We Do</span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            What We <span className="text-[#d4af37]">Create</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Professional content production for businesses. Choose individual services or go full-service with our marketing package.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className={`bg-[#2a2a2a] border transition-all duration-300 ${
                  service.isPackage
                    ? 'border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20'
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/40'
                }`}
              >
                <CardContent className="p-8 text-center">
                  {service.isPackage && (
                    <div className="text-center mb-4">
                      <span className="inline-block bg-[#00d4ff] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full">
                        FULL SERVICE
                      </span>
                    </div>
                  )}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${service.accent}20` }}
                  >
                    <IconComponent
                      className="h-10 w-10"
                      style={{ color: service.accent }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                    }}
                    className="text-white text-2xl mb-4"
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', Helvetica, sans-serif",
                      lineHeight: "1.6",
                    }}
                    className="text-gray-300 mb-6"
                  >
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.offerings.map((offering, idx) => (
                      <div key={idx} className="flex items-center justify-center text-gray-400 text-sm font-body">
                        <Check className="h-4 w-4 mr-2" style={{ color: service.accent }} />
                        <span>{offering}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleContactClick}
                    className={`w-full ${
                      service.isPackage
                        ? 'bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#1a1a1a]'
                        : 'bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleContactClick}
            size="lg"
            className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a] px-8 py-4"
          >
            Contact Us
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}