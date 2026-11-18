import ProjectLinks from './ProjectLinks';
import ProjectThumbnail from './ProjectThumbnail';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

const cases = [
  {
    id: 'bremoir-watches',
    name: 'Bremoir Watches',
    caption: 'The Lexington Product Ad',
    description: 'An Art Deco watch inspired by the Chrysler Building.',
    contribution: 'Baer produced the Lexington product ad.',
    film: { title: 'Bremoir Lexington product ad', src: 'https://www.youtube-nocookie.com/embed/N1HYHvNQthg' },
    poster: '/bremoir-lexington-case.jpg',
    website: 'https://www.bremoir.com/',
    instagram: 'https://www.instagram.com/bremoir/',
  },
  {
    id: 'paddock-blade',
    name: 'Paddock Blade',
    caption: 'Product Demo & Interview Series',
    description: 'A tow-behind cleaner that picks up manure from the field so horse owners can skip the hand raking.',
    contribution: 'Baer produced the interview series for Paddock Blade.',
    film: { title: 'Paddock Blade product demo', src: 'https://www.youtube-nocookie.com/embed/pD4u4mPgwjk' },
    interview: { title: 'Paddock Blade interview excerpt', src: 'https://player.vimeo.com/video/883016515' },
    poster: '/paddock-blade-case.jpg',
    website: 'https://www.paddockblade.co.uk/',
    instagram: 'https://www.instagram.com/paddockblade/',
  },
];

export default function FeaturedClientWork() {
  return (
    <>
      {cases.map(({ id, name, caption, description, contribution, film, interview, poster, website, instagram }) => (
        <article className="selected-project" id={id} key={id}>
          <Dialog>
            <ProjectThumbnail image={poster} name={name} />
            <DialogContent className="cinema-film-dialog selected-project-dialog">
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
              <p className="project-contribution">{contribution}</p>
              <ProjectLinks name={name} website={website} instagram={instagram} />
              <iframe className="selected-project-player" src={film.src} title={film.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              {interview && (
                <details className="case-demo">
                  <summary>Watch an interview excerpt</summary>
                  <iframe className="selected-project-player" src={interview.src} title={interview.title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                </details>
              )}
            </DialogContent>
          </Dialog>
          <div className="work-caption"><h3>{name}</h3><p>{caption}</p></div>
        </article>
      ))}
    </>
  );
}
