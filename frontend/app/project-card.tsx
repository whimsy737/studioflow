import Link from "next/link";

import DeleteProjectButton from "./delete-project-button";
import EditProjectForm from "./edit-project-form";
import StatusBadge from "./status-badge";

import { Project } from "@/lib/api";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

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
  );
}