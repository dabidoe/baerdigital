const links = [
  ['Work', '#portfolio'],
  ['Services', '#services'],
  ['Contact', '#contact'],
];

export default function Navigation() {
  return (
    <nav className="cinema-nav" aria-label="Main navigation">
      <div className="cinema-nav-inner">
        <a className="cinema-brand" href="#home" aria-label="Baer Digital Studios home">
          <img className="cinema-wordmark" src="/baer-digital-logo.png" alt="" width="700" height="233" />
        </a>
        <div className="cinema-desktop-links">
          {links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}
        </div>
      </div>
    </nav>
  );
}
