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

  const now = new Date();

  const overdueProjects = projects.filter((project) => {
    if (!project.deadline) return false;
    return new Date(project.deadline).getTime() < now.getTime();
  });

  const dueSoonProjects = projects.filter((project) => {
    if (!project.deadline) return false;

    const diffMs = new Date(project.deadline).getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffMs >= 0 && diffHours <= 24;
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="w-full">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              StudioFlow
            </h1>

            <p className="mt-2 text-zinc-400">
              Creative Production Management Dashboard
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <p className="text-sm text-zinc-400">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <p className="text-sm text-zinc-400">Overdue</p>
              <p className="text-2xl font-bold text-red-400">
                {overdueProjects.length}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <p className="text-sm text-zinc-400">Due Soon</p>
              <p className="text-2xl font-bold text-yellow-400">
                {dueSoonProjects.length}
              </p>
            </div>
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

              <div className="mt-6 grid w-full gap-6 lg:grid-cols-2 2xl:grid-cols-4">

                <div>
                  <h3 className="mb-4 text-lg font-bold text-zinc-400">
                    TODO
                  </h3>

                  <div className="space-y-4">
                    {todoProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold text-blue-400">
                    DOING
                  </h3>

                  <div className="space-y-4">
                    {doingProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold text-yellow-400">
                    REVIEW
                  </h3>

                  <div className="space-y-4">
                    {reviewProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-bold text-green-400">
                    DONE
                  </h3>

                  <div className="space-y-4">
                    {doneProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}