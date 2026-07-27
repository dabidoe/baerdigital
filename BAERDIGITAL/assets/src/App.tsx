import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import InstitutionalImpactSection from './components/InstitutionalImpactSection';
import ServicesSection from './components/ServicesSection';
import TrustedPartnersSection from './components/TrustedPartnersSection';
import ContactSection from './components/ContactSection';
import smallLogo from './assets/Baer Digital Studios smalllogo.png';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050607]">
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <InstitutionalImpactSection />
        <ServicesSection />
        <TrustedPartnersSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#050607] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src={smallLogo}
                alt="Baer Digital Studios"
                className="h-16 w-auto"
              />
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.8",
              }}
                className="flex justify-center space-x-8 text-sm text-[#b7c0c7]"
            >
              <span>Philadelphia, PA</span>
              <span>•</span>
              <span>10+ Years Experience</span>
            </div>

            {/* Legal Text */}
            <div className="pt-8 border-t border-white/10">
              <p
                style={{
                  fontFamily: "'Inter', Helvetica, sans-serif",
                  lineHeight: "1.6",
                }}
                className="text-[#7f8a93] text-sm"
              >
                © 2026 Baer Digital Studios | A Division of B. East Digital Media LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
