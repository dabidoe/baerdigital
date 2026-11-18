const services = [
  ['website-content-launch', 'Advertising', 'Product ads, landing pages, and edits for your launch.'],
  ['website-app-development', 'Web Design & Development', 'Business websites, interactive demos, and custom apps.'],
  ['video-content-production', 'Video Production', 'Product demos, customer stories, interviews, and social edits.'],
];

export default function ServicesSection() {
  return (
    <section id="services" className="cinema-services">
      <div className="cinema-section-inner services-layout">
        <h2 className="section-heading">Services</h2>
        <div className="service-list">
          {services.map(([id, title, description]) => (
            <article className="service-row" id={id} key={id}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
