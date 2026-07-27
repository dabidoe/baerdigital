import VideoPopup from './VideoPopup';

export default function InstitutionalImpactSection() {
  return (
    <section id="institutional-impact" className="py-16 lg:py-24 bg-[#f4f7f8] text-[#050607]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#007e99]">
            Featured Partnership
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-[#050607] mb-6"
          >
            Institutional <span className="text-[#007e99]">Impact</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-[#3d4751] max-w-2xl mx-auto"
          >
            Dell Technologies & Philadelphia Youth Network Partnership
          </p>
        </div>

        {/* Full-Width Video */}
        <VideoPopup
          vimeoId="1161863707"
          title="DELL - Philadelphia Youth Network Partnership"
          className="border border-[#d6dde1] shadow-2xl shadow-[#050607]/15"
        />
      </div>
    </section>
  );
}
