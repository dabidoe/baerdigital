import { DialogTrigger } from './ui/dialog';

interface ProjectThumbnailProps {
  image: string;
  name: string;
  className?: string;
  action?: string;
}

export default function ProjectThumbnail({ image, name, className = '', action = 'View project' }: ProjectThumbnailProps) {
  return (
    <DialogTrigger asChild>
      <button type="button" className={`selected-project-image project-thumbnail ${className}`} aria-label={`${action}: ${name}`}>
        <img src={image} alt="" loading="lazy" />
      </button>
    </DialogTrigger>
  );
}
