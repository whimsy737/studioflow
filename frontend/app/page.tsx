import Link from "next/link";

import { fetchProjects } from "@/lib/api";

import ProjectForm from "./project-form";
import DeleteProjectButton from "./delete-project-button";
import EditProjectForm from "./edit-project-form";
import StatusBadge from "./status-badge";

import ProjectCard from "./project-card";

export default async function Home() {
  const projects = await fetchProjects();

  const todoProjects = projects.filter(
    (project) => project.status === "todo"
  );

  const doingProjects = projects.filter(
    (project) => project.status === "doing"
  );

  const reviewProjects = projects.filter(
    (project) => project.status === "review"
  );

  const doneProjects = projects.filter(
    (project) => project.status === "done"
  );

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              StudioFlow
            </h1>

            <p className="mt-2 text-zinc-400">
              Creative Production Management Dashboard
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <p className="text-sm text-zinc-400">
              Total Projects
            </p>

            <p className="text-2xl font-bold">
              {projects.length}
            </p>
          </div>
        </header>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Create Project
          </h2>

          <div className="mt-4 max-w-2xl">
            <ProjectForm />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Projects
            </h2>

            <p className="text-sm text-zinc-500">
              Active production tracking
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-500">
              No projects yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="text-lg font-bold">
                        {project.title}
                      </h3>

                      <div className="mt-3">
                        <StatusBadge status={project.status} />
                      </div>
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Detail
                    </Link>
                  </div>

                  {project.description && (
                    <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-6 border-t border-zinc-800 pt-4">
                    <p className="text-xs text-zinc-500">
                      Created:
                    </p>

                    <p className="mt-1 text-sm text-zinc-300">
                      {new Date(project.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <EditProjectForm
                      projectId={project.id}
                      initialTitle={project.title}
                      initialDescription={project.description}
                      initialStatus={project.status}
                    />

                    <DeleteProjectButton
                      projectId={project.id}
                    />
                  </div>
                </div>
              ))}

            </div>
          )}
        </section>
      </div>
    </main>
  );
}