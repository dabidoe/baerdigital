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

export default function TrustedPartnersSection() {
  const { bremoir, paddock, jpMorgan } = clientWorkDetails;

  return (
    <section className="client-proof" id="client-work" aria-labelledby="client-work-heading">
      <div className="cinema-section-inner">
        <h2 id="client-work-heading" className="section-heading">Client work</h2>
        <div className="client-proof-projects">
          {[bremoir, paddock, jpMorgan].map(project => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.contribution}</p>
              {'website' in project && <ProjectLinks {...project} />}
            </article>
          ))}
        </div>
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
      </div>
    </section>
  );
}
