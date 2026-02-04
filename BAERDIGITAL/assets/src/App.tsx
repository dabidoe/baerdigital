import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import FeaturedFilmsSection from './components/FeaturedFilmsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <FeaturedFilmsSection />
        <TestimonialsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4 font-institutional">
              Baer <span className="text-[#d4af37]">Digital Studios</span>
            </h2>
            <div className="flex justify-center space-x-8 text-sm text-gray-400 font-body">
              <span>Philadelphia, PA</span>
              <span>•</span>
              <span>10+ Years Experience</span>
            </div>

            {/* Trusted By Bar */}
            <div className="mt-8 pt-8 border-t border-[#d4af37]/20">
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-6 font-body">
                Trusted By
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8">
                <img
                  src="assets/src/assets/300px-Dell_Logo.svg-3902470812.png"
                  alt="Dell"
                  className="h-8 grayscale brightness-0 invert opacity-60"
                />
                <img
                  src="assets/src/assets/JP-Morgan-Chase-Emblem-1004076427.png"
                  alt="JP Morgan"
                  className="h-8 grayscale brightness-0 invert opacity-60"
                />
                <img
                  src="assets/src/assets/CBS-Symbol-1846180216.png"
                  alt="CBS"
                  className="h-8 grayscale brightness-0 invert opacity-60"
                />
                <img
                  src="assets/src/assets/amazon-logo-s3f-2351218662.png"
                  alt="Amazon"
                  className="h-8 grayscale brightness-0 invert opacity-60"
                />
                <img
                  src="assets/src/assets/Larrykingnow_show_card.jpg"
                  alt="Larry King Now"
                  className="h-8 grayscale brightness-0 invert opacity-60"
                />
              </div>
            </div>

            {/* Legal Text */}
            <div className="pt-8 border-t border-[#d4af37]/20">
              <p className="text-gray-500 text-sm font-body">
                © 2026 Baer Digital Studios | A Division of B. East Digital Media LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}