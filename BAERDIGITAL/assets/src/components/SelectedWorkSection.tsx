import ProjectThumbnail from './ProjectThumbnail';
import ProjectLinks from './ProjectLinks';
import FeaturedClientWork from './FeaturedClientWork';
import VideoPopup from './VideoPopup';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

const projects = [
  {
    name: 'RenovAgent',
    caption: 'Room Planning & Visualization',
    image: '/renovagent-project.jpg',
    description: 'A renovation planning app with room visualization, material estimates, and interactive planning tools.',
    role: 'Web app, room visualization tools, and product demo video',
    website: 'https://renovagent.app/',
    preview: 'https://www.youtube-nocookie.com/embed/E97iGaoiMz4',
    video: true,
  },
  {
    name: 'MythOS',
    caption: 'Worldbuilding & Playable Stories',
    image: '/mythos-project.jpg',
    description: 'An interactive storytelling platform for building characters, exploring worlds, and playing through stories.',
    role: 'Web app, character creation, maps, and interactive gameplay',
    website: 'https://www.mythos.quest/',
    preview: 'https://www.mythos.quest/',
  },
  {
    name: 'On Record',
    caption: 'Sports Apparel Storefront',
    image: '/on-record-project.jpg',
    description: 'A sports apparel brand with original shirt designs and a storefront built around fan rivalries.',
    role: 'Brand website, storefront, and original apparel designs',
    website: 'https://onrecord.davebaereastridge.workers.dev/',
    preview: 'https://onrecord.davebaereastridge.workers.dev/',
  },
  {
    name: 'Character Foundry',
    caption: 'AI Character Creation Platform',
    image: 'https://i.ytimg.com/vi/BzZD3ZtrBtg/hqdefault.jpg',
    description: 'A tabletop RPG tool for creating characters, maps, items, and spells.',
    role: 'Web app, product landing page, and demo video',
    preview: 'https://www.youtube-nocookie.com/embed/BzZD3ZtrBtg',
    video: true,
  },
];

export default function SelectedWorkSection() {
  return (
    <section id="portfolio" className="selected-work">
      <div className="cinema-section-inner">
        <h2 className="section-heading">Work</h2>
        <div className="selected-work-grid project-grid">
          <FeaturedClientWork />
          <VideoPopup vimeoId="707886560" title="Larry King Now" caption="Dominican Sisters Family Health Profile" poster="/larry-king-now.png" />
          {projects.map(project => (
            <article className="selected-project" key={project.name}>
              <Dialog>
                <ProjectThumbnail image={project.image} name={project.name} className={project.video ? 'selected-project-video' : ''} />
                <DialogContent className="cinema-film-dialog selected-project-dialog">
                  <DialogTitle>{project.name}</DialogTitle>
                  <DialogDescription>{project.description}</DialogDescription>
                  <p className="project-contribution">{project.role}</p>
                  {project.website && <ProjectLinks name={project.name} website={project.website} />}
                  {project.video ? (
                    <iframe className="selected-project-player" src={project.preview} title={`${project.name} demo on YouTube`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                  ) : (
                    <iframe className="selected-project-site" src={project.preview} title={`${project.name} website preview`} sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin" />
                  )}
                </DialogContent>
              </Dialog>
              <div className="work-caption"><h3>{project.name}</h3><p>{project.caption}</p></div>
            </article>
          ))}
          <VideoPopup vimeoId="1161859590" title="JP Morgan" caption="Executive Leadership Series" />
        </div>
      </div>
    </section>
  );
}
