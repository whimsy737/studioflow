import { fetchProjects } from "@/lib/api";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">StudioFlow</h1>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>

        <div className="mt-4 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded border p-4">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.status}</p>
              {project.description && (
                <p className="mt-2">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}