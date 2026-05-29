"use client";

import { useMemo, useState } from "react";

import ProjectCard from "./project-card";
import { Project } from "@/lib/api";

type Props = {
  projects: Project[];
};

const statuses = [
  { key: "todo", label: "TODO", className: "text-zinc-400" },
  { key: "doing", label: "DOING", className: "text-blue-400" },
  { key: "review", label: "REVIEW", className: "text-yellow-400" },
  { key: "done", label: "DONE", className: "text-green-400" },
];

export default function ProjectBoard({ projects }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sortBy, setSortBy] = useState("created_at");

  const filteredProjects = useMemo(() => {
    const result = projects.filter((project) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(keyword) ||
        (project.description ?? "")
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "deadline") {
        const aTime = a.deadline
          ? new Date(a.deadline).getTime()
          : Number.MAX_SAFE_INTEGER;

        const bTime = b.deadline
          ? new Date(b.deadline).getTime()
          : Number.MAX_SAFE_INTEGER;

        return aTime - bTime;
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });

    return result;
  }, [projects, search, statusFilter, sortBy]);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Search and track production status
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            className="rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-white"
            placeholder="Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          <select
            className="rounded border border-zinc-700 bg-zinc-900 p-2 text-sm text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            >
            <option value="created_at">Created At</option>
            <option value="deadline">Deadline</option>
            <option value="title">Title</option>
          </select>

        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-500">
          No projects found.
        </div>
      ) : (
        <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statuses.map((status) => {
            const statusProjects = filteredProjects.filter(
              (project) => project.status === status.key
            );

            return (
              <div key={status.key}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${status.className}`}>
                    {status.label}
                  </h3>

                  <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                    {statusProjects.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {statusProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}