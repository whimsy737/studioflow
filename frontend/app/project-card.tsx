import Link from "next/link";

import DeleteProjectButton from "./delete-project-button";
import EditProjectForm from "./edit-project-form";
import StatusBadge from "./status-badge";

import { Project } from "@/lib/api";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {

  const deadlineStatus = (() => {
    if (!project.deadline) {
        return {
        label: "No deadline",
        className: "text-zinc-500",
        };
    }

    const now = new Date();
    const deadline = new Date(project.deadline);
    const diffMs = deadline.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffMs < 0) {
        return {
        label: "Overdue",
        className: "text-red-400",
        };
    }

    if (diffHours <= 24) {
        return {
        label: "Due soon",
        className: "text-yellow-400",
        };
    }

    return {
        label: "On track",
        className: "text-green-400",
    };
  })();

  return (
    <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="break-words text-lg font-bold">
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

        <p className="mt-1 text-sm text-zinc-300" suppressHydrationWarning>
          {new Date(project.created_at).toLocaleString()}
        </p>
        
      </div>

      <div className="mt-3">
        <p className="text-xs text-zinc-500">
            Deadline:
        </p>

        <p className={`mt-1 text-xs font-semibold ${deadlineStatus.className}`}>
            {deadlineStatus.label}
        </p>

        <p className="mt-1 text-sm text-zinc-300" suppressHydrationWarning>
            {project.deadline
            ? new Date(project.deadline).toLocaleString()
            : "未設定"}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <EditProjectForm
          projectId={project.id}
          initialTitle={project.title}
          initialDescription={project.description}
          initialStatus={project.status}
          initialDeadline={project.deadline}
        />

        <DeleteProjectButton
          projectId={project.id}
        />
      </div>
    </div>
  );
}