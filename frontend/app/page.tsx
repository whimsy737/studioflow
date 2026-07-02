"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/api";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { fetchProjects } from "@/lib/api";

import ProjectForm from "./project-form";
import DeleteProjectButton from "./delete-project-button";
import EditProjectForm from "./edit-project-form";
import StatusBadge from "./status-badge";

import ProjectCard from "./project-card";
import ProjectBoard from "./project-board";

import AuthStatus from "./auth-status";


export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const projects = await fetchProjects();
        setProjects(projects);
      } catch {
        localStorage.removeItem("access_token");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        Loading...
      </main>
    );
  }

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
            <AuthStatus />

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

        <ProjectBoard projects={projects} />

      </div>
    </main>
  );
}