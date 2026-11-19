export default function ProjectScope({ items, heading = 'What we did' }: { items: string[]; heading?: string }) {
  return (
    <div className="project-scope">
      <h3>{heading}</h3>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
