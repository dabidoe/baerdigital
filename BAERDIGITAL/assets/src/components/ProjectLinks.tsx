import { Globe, Instagram } from 'lucide-react';

export default function ProjectLinks({ name, website, instagram }: { name: string; website: string; instagram?: string }) {
  return (
    <div className="project-links">
      <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} website in a new tab`} title="Website">
        <Globe size={20} aria-hidden="true" />
      </a>
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} on Instagram in a new tab`} title="Instagram">
          <Instagram size={20} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
