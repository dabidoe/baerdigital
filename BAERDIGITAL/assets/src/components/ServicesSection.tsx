const services = [
  {
    id: 'website-content-launch',
    title: 'Advertising Campaigns',
    image: '/bremoir-lexington-case.jpg',
    description: 'Launching a product? We develop the campaign concept, make the ads, and build the landing page they lead to. Get a lead spot and shorter edits for paid social, YouTube, and your site.',
  },
  {
    id: 'website-app-development',
    title: 'Web Design & Development',
    image: '/mythos-project.jpg',
    description: 'We design websites and build custom apps, including AI agents that work with your data and tools. We also build the backend that handles model requests, accounts, and usage limits.',
  },
  {
    id: 'video-content-production',
    title: 'Video Production',
    image: '/paddock-blade-case.jpg',
    description: 'Show customers how your product works, or let them hear from someone who uses it. We handle planning, shooting, and editing for product demos, customer stories, and interview series.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="cinema-services">
      <div className="cinema-section-inner services-layout">
        <h2 className="section-heading">Services</h2>
        <div className="service-list">
          {services.map(({ id, title, image, description }) => (
            <article className="service-row" id={id} key={id}>
              <div className="service-photo"><img src={image} alt="" loading="lazy" decoding="async" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
