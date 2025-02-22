export default async function ProjectPlaygroundPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return <div>Playground {id}</div>;
}
