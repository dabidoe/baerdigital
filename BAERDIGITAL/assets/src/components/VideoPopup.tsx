import { useState } from 'react';
import ProjectThumbnail from './ProjectThumbnail';
import ProjectLinks from './ProjectLinks';
import ProjectScope from './ProjectScope';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

interface VideoPopupProps {
  vimeoId: string;
  title: string;
  caption: string;
  poster?: string;
  scope: string[];
  website?: string;
  youtube?: string;
}

export default function VideoPopup({ vimeoId, title, caption, poster, scope, website, youtube }: VideoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
  const posterUrl = poster ?? `https://vumbnail.com/${vimeoId}.jpg`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <article className="selected-project">
        <ProjectThumbnail image={posterUrl} name={title} action="Watch video" className={poster ? 'video-custom-poster' : ''} />
        <div className="work-caption"><h3>{title}</h3><p>{caption}</p></div>
      </article>

      <DialogContent className="cinema-film-dialog selected-project-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{caption}</DialogDescription>
        <ProjectScope items={scope} />
        {(website || youtube) && <ProjectLinks name={title} website={website} youtube={youtube} />}
        <div className="aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={`${baseUrl}&autoplay=1`}
            loading="lazy"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`${title} fullscreen player`}
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
