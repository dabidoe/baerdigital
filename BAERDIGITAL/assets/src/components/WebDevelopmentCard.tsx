import ProjectScope from './ProjectScope';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';

const scope = [
  'Build web apps that give customers a straightforward way to use AI.',
  'Develop agents that call tools, use project data, and carry out multi-step workflows.',
  'Build the server and backend for model requests, accounts, data, and usage limits. Model API keys stay on the server.',
];

export default function WebDevelopmentCard() {
  return (
    <article className="selected-project">
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className="selected-project-image project-thumbnail development-thumbnail" aria-label="View project: Web Development">
            <span className="development-diagram" aria-hidden="true">
              <span>Web app</span><span>Backend</span><span>AI agents</span>
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="cinema-film-dialog selected-project-dialog development-dialog">
          <DialogTitle>Web Development</DialogTitle>
          <DialogDescription>We build the interface people use and the backend that connects it to AI models and tools.</DialogDescription>
          <ProjectScope heading="What we build" items={scope} />
        </DialogContent>
      </Dialog>
      <div className="work-caption"><h3>Web Development</h3><p>Web apps, AI agents, and backends</p></div>
    </article>
  );
}
