import { fetchProjects } from "@/lib/api";
import ProjectForm from "./project-form";
import DeleteProjectButton from "./delete-project-button";
import EditProjectForm from "./edit-project-form";
import StatusBadge from "./status-badge";
import Link from "next/link";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">StudioFlow</h1>

      <section className="mt-6 max-w-xl">
        <ProjectForm />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>

        <div className="mt-4 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded border p-4">
              <h3 className="font-bold">{project.title}</h3>
              <div className="mt-2">
                <StatusBadge status={project.status} />
              </div>
              {project.description && (
                <p className="mt-2">{project.description}</p>
              )}

              <Link
                href={`/projects/${project.id}`}
                className="mt-3 inline-block text-sm text-blue-400 underline"
              >
                View detail
              </Link>

              <EditProjectForm
                projectId={project.id}
                initialTitle={project.title}
                initialDescription={project.description}
                initialStatus={project.status}
              />

              <DeleteProjectButton projectId={project.id} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}