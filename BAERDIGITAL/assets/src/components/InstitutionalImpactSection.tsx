export default function InstitutionalImpactSection() {
  return (
    <section id="institutional-impact" className="py-12 lg:py-16 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Institutional <span className="text-[#d4af37]">Impact</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Dell Technologies & Philadelphia Youth Network Partnership
          </p>
        </div>

        {/* Full-Width Video */}
        <div className="aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#9ca3af]/30">
          <iframe
            src="https://player.vimeo.com/video/1161863707?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="DELL - Philadelphia Youth Network Partnership"
            className="w-full h-full"
          />
        </div>
      </div>

      <script src="https://player.vimeo.com/api/player.js"></script>
    </section>
  );
}
