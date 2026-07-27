import amazonLogo from '../assets/amazon-logo.jpg';
import cbsLogo from '../assets/CBS-Symbol-1846180216.png';
import dellLogo from '../assets/300px-Dell_Logo.svg-3902470812.png';
import jpMorganLogo from '../assets/JP-Morgan-Chase-Emblem-1004076427.png';
import larryKingLogo from '../assets/Larrykingnow_show_card.jpg';

export default function TrustedPartnersSection() {
  return (
    <section className="py-14 bg-[#f4f7f8] border-y border-[#d6dde1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal">
        <div className="text-center mb-8">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: "1.8",
            }}
            className="text-[#3d4751] text-xs uppercase tracking-widest font-semibold"
          >
            Trusted Partners
          </p>
        </div>

        {/* Logo Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* J.P. Morgan Chase */}
          <div className="bg-white border border-[#d6dde1] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={jpMorganLogo}
              alt="J.P. Morgan Chase"
              className="h-20 md:h-24 object-contain"
            />
          </div>

          {/* Dell Technologies */}
          <div className="bg-white border border-[#d6dde1] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={dellLogo}
              alt="Dell Technologies"
              className="h-20 md:h-24 object-contain"
            />
          </div>

          {/* Amazon */}
          <div className="bg-white border border-[#d6dde1] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={amazonLogo}
              alt="Amazon"
              className="h-20 md:h-24 object-contain"
            />
          </div>

          {/* CBS News */}
          <div className="bg-white border border-[#d6dde1] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={cbsLogo}
              alt="CBS News"
              className="h-20 md:h-24 object-contain"
            />
          </div>

          {/* Larry King Now */}
          <div className="bg-white border border-[#d6dde1] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <img
              src={larryKingLogo}
              alt="Larry King Now"
              className="h-20 md:h-24 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
