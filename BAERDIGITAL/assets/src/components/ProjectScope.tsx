export default function ProjectScope({ items }: { items: string[] }) {
  return (
    <div className="project-scope">
      <h3>What we did</h3>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
