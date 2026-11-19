import amazonLogo from '../assets/amazon-logo.jpg';
import cbsLogo from '../assets/CBS-Symbol-1846180216.png';
import dellLogo from '../assets/300px-Dell_Logo.svg-3902470812.png';
import jpMorganLogo from '../assets/JP-Morgan-Chase-Emblem-1004076427.png';
import larryKingLogo from '../assets/Larrykingnow_show_card.jpg';
import ProjectLinks from './ProjectLinks';
import { clientWorkDetails } from './clientWorkDetails';

const brands = [
  { name: 'JPMorgan Chase', image: jpMorganLogo, url: 'https://www.jpmorganchase.com/' },
  { name: 'Dell Technologies', image: dellLogo, url: 'https://www.dell.com/en-us/learn/our-company/lp/who-we-are' },
  { name: 'Amazon', image: amazonLogo, url: 'https://www.amazon.com/', treatment: 'amazon-mark' },
  { name: 'CBS News', image: cbsLogo, url: 'https://www.cbsnews.com/' },
  { name: 'Larry King Now', image: larryKingLogo, url: 'https://www.youtube.com/@LarryKing', treatment: 'larry-mark' },
];

const clients = [
  {
    ...clientWorkDetails.bremoir,
    testimonial: null,
  },
  {
    ...clientWorkDetails.paddock,
    testimonial: {
      quote: 'crafting compelling content that resonated with our customers',
      name: 'Jake Fowler',
      credit: 'CEO, Paddock Blade US3',
    },
  },
  {
    ...clientWorkDetails.jpMorgan,
    testimonial: {
      quote: 'Exceptional reliability and executive presence.',
      name: 'Jon Forman',
      credit: 'Head of Intraday Liquidity, J.P. Morgan Chase',
    },
  },
  {
    name: 'Larry King Now',
    contribution: 'We produced the Dominican Sisters Family Health profile.',
    youtube: 'https://www.youtube.com/@LarryKing',
    testimonial: {
      quote: 'Baer Digital Studios brings the technical precision and calm under pressure required for high-profile network production.',
      name: 'Wendy Walker',
      credit: 'Executive Producer, Larry King Now',
    },
  },
];

export default function TrustedPartnersSection() {
  return (
    <section className="client-proof" id="client-work" aria-labelledby="client-work-heading">
      <div className="cinema-section-inner">
        <h2 id="client-work-heading" className="section-heading">Client work</h2>
        <div className="client-proof-projects" id="testimonials">
          {clients.map(({ testimonial, ...project }) => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.contribution}</p>
              {testimonial && (
                <figure className="client-quote">
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption><strong>{testimonial.name}</strong><span>{testimonial.credit}</span></figcaption>
                </figure>
              )}
              <ProjectLinks {...project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientLogos() {
  return (
    <ul className="client-marks" aria-label="Brands we’ve worked with">
      {brands.map(({ name, image, url, treatment }) => (
        <li key={name}>
          <a href={url} className={treatment} target="_blank" rel="noopener noreferrer">
            <img src={image} alt="" loading="lazy" decoding="async" />
            <span>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
