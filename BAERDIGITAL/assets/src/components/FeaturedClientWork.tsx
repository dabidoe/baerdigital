import ProjectLinks from './ProjectLinks';
import ProjectThumbnail from './ProjectThumbnail';
import ProjectScope from './ProjectScope';
import { clientWorkDetails } from './clientWorkDetails';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

const cases = [
  {
    id: 'bremoir-watches',
    ...clientWorkDetails.bremoir,
    caption: 'The Lexington Product Ad',
    description: 'An Art Deco watch inspired by the Chrysler Building.',
    film: { title: 'Bremoir Lexington product ad', src: 'https://www.youtube-nocookie.com/embed/N1HYHvNQthg' },
    poster: '/bremoir-lexington-case.jpg',
  },
  {
    id: 'paddock-blade',
    ...clientWorkDetails.paddock,
    caption: 'Product Demo & Interview Series',
    description: 'A tow-behind cleaner that picks up manure from the field so horse owners can skip the hand raking.',
    film: { title: 'Paddock Blade product demo', src: 'https://www.youtube-nocookie.com/embed/pD4u4mPgwjk' },
    interview: { title: 'Paddock Blade interview excerpt', src: 'https://player.vimeo.com/video/883016515' },
    poster: '/paddock-blade-case.jpg',
  },
];

export default function FeaturedClientWork() {
  return (
    <>
      {cases.map(({ id, name, caption, description, scope, film, interview, poster, website, instagram, youtube }) => (
        <article className="selected-project" id={id} key={id}>
          <Dialog>
            <ProjectThumbnail image={poster} name={name} />
            <DialogContent className="cinema-film-dialog selected-project-dialog">
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
              <ProjectScope items={scope} />
              <ProjectLinks name={name} website={website} instagram={instagram} youtube={youtube} />
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
