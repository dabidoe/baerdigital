import { Globe, Instagram, Youtube } from 'lucide-react';

export default function ProjectLinks({ name, website, instagram, youtube }: { name: string; website?: string; instagram?: string; youtube?: string }) {
  return (
    <div className="project-links">
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} website in a new tab`} title="Website">
          <Globe size={20} aria-hidden="true" />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} on Instagram in a new tab`} title="Instagram">
          <Instagram size={20} aria-hidden="true" />
        </a>
      )}
      {youtube && (
        <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} on YouTube in a new tab`} title="YouTube">
          <Youtube size={20} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
