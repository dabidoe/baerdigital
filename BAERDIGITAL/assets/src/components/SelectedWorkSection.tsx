import ProjectThumbnail from './ProjectThumbnail';
import ProjectLinks from './ProjectLinks';
import ProjectScope from './ProjectScope';
import FeaturedClientWork from './FeaturedClientWork';
import VideoPopup from './VideoPopup';
import { clientWorkDetails } from './clientWorkDetails';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

const projects = [
  {
    name: 'RenovAgent',
    caption: 'AI Renovation Planning & Estimating',
    image: '/renovagent-project.jpg',
    description: 'A renovation planning app with room visualization, material estimates, and interactive planning tools.',
    scope: ['Built the web app and room visualization tools.', 'Produced the product demo video.'],
    website: 'https://renovagent.app/',
    preview: 'https://www.youtube-nocookie.com/embed/E97iGaoiMz4',
  },
  {
    name: 'MythOS',
    caption: 'AI WORLDBUILDING & INTERACTIVE STORYTELLING',
    image: '/mythos-project.jpg',
    description: 'An interactive storytelling platform for building characters, exploring worlds, and playing through stories.',
    scope: ['Built the web app, character creator, and interactive maps.', 'Connected AI-generated storytelling with the game’s characters and worlds.'],
    website: 'https://www.mythos.quest/',
  },
  {
    name: 'On Record',
    caption: 'Sports Apparel Storefront',
    image: '/on-record-project.jpg',
    description: 'A sports apparel brand with original shirt designs and a storefront built around fan rivalries.',
    scope: ['Built the brand website and online storefront.', 'Designed original apparel graphics.'],
    website: 'https://onrecord.davebaereastridge.workers.dev/',
    sitePreview: true,
  },
  {
    name: 'Character Foundry',
    caption: 'AI Character Creation Platform',
    image: 'https://i.ytimg.com/vi/BzZD3ZtrBtg/hqdefault.jpg',
    description: 'A tabletop RPG tool for creating characters, maps, items, and spells.',
    scope: ['Built the web app and product landing page.', 'Produced the demo video.'],
    website: 'https://characterfoundry.pages.dev/',
    preview: 'https://www.youtube-nocookie.com/embed/BzZD3ZtrBtg',
  },
];

function AppProject({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="selected-project">
      <Dialog>
        <ProjectThumbnail image={project.image} name={project.name} />
        <DialogContent className="cinema-film-dialog selected-project-dialog">
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
          <ProjectScope items={project.scope} />
          <ProjectLinks name={project.name} website={project.website} />
          {project.preview && (
            <iframe className="selected-project-player" src={project.preview} title={`${project.name} demo on YouTube`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          )}
          {project.sitePreview && (
            <iframe className="selected-project-site" src={project.website} title={`${project.name} website preview`} sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin" />
          )}
        </DialogContent>
      </Dialog>
      <div className="work-caption"><h3>{project.name}</h3><p>{project.caption}</p></div>
    </article>
  );
}

export default function SelectedWorkSection() {
  const [renovAgent, mythos, onRecord, characterFoundry] = projects;

  return (
    <section id="portfolio" className="selected-work">
      <div className="cinema-section-inner">
        <h2 className="section-heading">Work</h2>
        <div className="selected-work-grid project-grid">
          <AppProject project={renovAgent} />
          <AppProject project={mythos} />
          <FeaturedClientWork />
          <VideoPopup vimeoId="707886560" title="Larry King Now" caption="Dominican Sisters Family Health Profile" poster="/larry-king-now.png" scope={['Produced the Dominican Sisters Family Health profile.']} youtube="https://www.youtube.com/@LarryKing" />
          <AppProject project={onRecord} />
          <AppProject project={characterFoundry} />
          <VideoPopup vimeoId="1161859590" title={clientWorkDetails.jpMorgan.name} caption="Executive Leadership Series" scope={clientWorkDetails.jpMorgan.scope} website={clientWorkDetails.jpMorgan.website} />
        </div>
      </div>
    </section>
  );
}
