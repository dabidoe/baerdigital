export default function FeaturedFilmsSection() {
  const films = [
    {
      title: "Dell - Philadelphia Youth Network Partnership",
      vimeoId: "1161863707",
    },
    {
      title: "JP Morgan Chase Interview",
      vimeoId: "1161859590",
    },
    {
      title: "Paddock Blade Interview Series Excerpt",
      vimeoId: "883016515",
    },
  ];

  return (
    <section id="featured-films" className="py-20 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-institutional">
            Featured <span className="text-[#d4af37]">Films</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-body">
            Professional production work for industry leaders
          </p>
        </div>

        {/* 3-Tile Vimeo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {films.map((film, index) => (
            <div
              key={index}
              className="aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#9ca3af]/30 hover:border-[#d4af37]/50 transition-colors duration-300"
            >
              <iframe
                src={`https://player.vimeo.com/video/${film.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={film.title}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <script src="https://player.vimeo.com/api/player.js"></script>
    </section>
  );
}
