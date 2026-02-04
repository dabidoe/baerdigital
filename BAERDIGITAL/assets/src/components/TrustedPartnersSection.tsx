export default function TrustedPartnersSection() {
  return (
    <section className="py-12 bg-[#1a1a1a] border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Row */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {/* J.P. Morgan Chase */}
          <div className="transition-all duration-300 hover:scale-110">
            <img
              src="/assets/src/assets/JP-Morgan-Chase-Emblem-1004076427.png"
              alt="J.P. Morgan Chase"
              className="h-28"
            />
          </div>

          {/* Dell Technologies */}
          <div className="transition-all duration-300 hover:scale-110">
            <img
              src="/assets/src/assets/300px-Dell_Logo.svg-3902470812.png"
              alt="Dell Technologies"
              className="h-28"
            />
          </div>

          {/* Amazon */}
          <div className="transition-all duration-300 hover:scale-110">
            <img
              src="/assets/src/assets/amazon-logo.jpg"
              alt="Amazon"
              className="h-28"
            />
          </div>

          {/* CBS News */}
          <div className="transition-all duration-300 hover:scale-110">
            <img
              src="/assets/src/assets/CBS-Symbol-1846180216.png"
              alt="CBS News"
              className="h-28"
            />
          </div>

          {/* Larry King Now */}
          <div className="transition-all duration-300 hover:scale-110">
            <img
              src="/assets/src/assets/Larrykingnow_show_card.jpg"
              alt="Larry King Now"
              className="h-28"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
