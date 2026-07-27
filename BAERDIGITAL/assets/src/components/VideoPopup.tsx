import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

interface VideoPopupProps {
  vimeoId: string;
  title: string;
  className?: string;
}

export default function VideoPopup({ vimeoId, title, className = '' }: VideoPopupProps) {
  const baseUrl = `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

  return (
    <Dialog>
      <div className={`relative aspect-video bg-[#0a0a0a] overflow-hidden ${className}`}>
        <iframe
          src={baseUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
          className="pointer-events-none h-full w-full"
        />
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`Open ${title} video`}
            className="absolute inset-0 flex items-center justify-center bg-[#050607]/20 transition-all duration-300 hover:bg-[#050607]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00d4ff] text-[#050607] shadow-xl shadow-[#00d4ff]/25 transition-transform duration-300 hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5 fill-current" />
            </span>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-[min(96vw,1280px)] border-white/20 bg-[#050607] p-3 shadow-2xl sm:max-w-[min(96vw,1280px)]">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={`${baseUrl}&autoplay=1`}
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
