import { useState } from 'react';
import { Camera, Mic2, Video, MapPin, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BookingModal from './BookingModal';
import studioImage from 'figma:asset/26c0f0df25cd3e0ae6cca0e2d7e8e8a0174c6f32.png';

export default function StudioSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const studioCapabilities = [
    {
      icon: Video,
      title: "Video Production Stage",
      description: "Professional greenscreen stage with multicamera setup, professional lighting grid, and video switching capabilities"
    },
    {
      icon: Camera,
      title: "Live Production Suite",
      description: "Multicamera switching, livestream infrastructure, and real-time production capabilities for broadcasts and events"
    },
    {
      icon: Mic2,
      title: "Audio Recording Booth",
      description: "Acoustically treated recording space with professional-grade microphones and mixing equipment for podcasts and voiceover work"
    }
  ];

  const features = [
    "4K Video Capability",
    "Multi-Camera Live Switching",
    "Professional Lighting Grid",
    "Greenscreen Stage",
    "Professional Audio Monitoring",
    "Real-time Client Monitoring",
    "Live Streaming Infrastructure",
    "Secure Equipment Storage",
    "Event Production Capabilities",
    "Broadcast Quality Output"
  ];

  const handleBookingClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleTourBooking = () => {
    setSelectedService('studio-tour');
    setIsBookingModalOpen(true);
  };

  return (
    <section id="studio" className="py-20 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-6">
            <span className="text-[#d4af37] font-medium">Our Studio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="text-[#d4af37]">Philadelphia</span> Production Facility
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Professional production studio equipped for video, audio, and live streaming projects.
          </p>
          
          {/* Tour CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleTourBooking}
              size="lg"
              className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a] px-8 py-4 text-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <div className="flex items-center text-gray-300 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>Available Mon-Sat</span>
            </div>
          </div>
        </div>

        {/* Main Studio Showcase */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwbWljcm9waG9uZXMlMjBncmVlbnNjcmVlbiUyMHN0dWRpb3xlbnwxfHx8fDE3NTQ1ODU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional podcast recording setup with microphones and greenscreen backdrop"
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]/60"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl ml-8 lg:ml-16">
                <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-4">
                  <Mic2 className="h-4 w-4 text-[#d4af37]" />
                  <span className="text-[#d4af37] font-medium">Professional Audio Production</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  State-of-the-Art Recording Suite
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  Our acoustically treated recording space features professional-grade microphones, 
                  mixing equipment, and versatile greenscreen capabilities perfect for podcasts, 
                  interviews, and audio-visual content creation.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full text-[#d4af37] text-sm">
                    Professional Microphones
                  </span>
                  <span className="px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-sm">
                    Acoustic Treatment
                  </span>
                  <span className="px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full text-[#d4af37] text-sm">
                    Live Mixing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {studioCapabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <Card key={index} className="bg-[#2a2a2a] border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-[#d4af37]" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3">{capability.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{capability.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features List */}
        <div className="bg-[#2a2a2a] border border-[#d4af37]/20 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Studio Features & Capabilities
            </h3>
            <p className="text-gray-300">
              Professional-grade equipment and unique capabilities for any production need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-[#1a1a1a]/50 rounded-lg border border-[#d4af37]/20">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full flex-shrink-0"></div>
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Notice */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full px-6 py-3 mb-4">
            <Clock className="h-4 w-4 text-[#00d4ff]" />
            <span className="text-[#00d4ff] font-medium">Real-time Availability</span>
          </div>
          <p className="text-gray-300 mb-4">
            Check availability and book instantly. Studio hours: Monday - Saturday, 9 AM - 6 PM
          </p>
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <MapPin className="h-4 w-4 text-[#00d4ff]" />
            <span>Located in Philadelphia, PA • Easily accessible with parking</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
}