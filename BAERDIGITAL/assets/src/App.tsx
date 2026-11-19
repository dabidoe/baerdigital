import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SelectedWorkSection from './components/SelectedWorkSection';
import ContactSection from './components/ContactSection';
import TrustedPartnersSection, { ClientLogos } from './components/TrustedPartnersSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050607]">
      <Navigation />
      <main>
        <HeroSection />
        <SelectedWorkSection />
        <ServicesSection />
        <TrustedPartnersSection />
        <ContactSection />
      </main>
      <footer className="cinema-section-inner">
        <ClientLogos />
        <div className="site-footer">
          <img className="cinema-wordmark" src="/baer-digital-logo.png" alt="Baer Digital Studios" width="700" height="233" />
          <small>© 2026 Baer Digital Studios · A division of B. East Digital Media LLC</small>
        </div>
      </footer>
    </div>
  );
}
