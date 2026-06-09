import Link from "next/link";
import { fetchComments, fetchProject } from "@/lib/api";
import StatusBadge from "../../status-badge";
import CommentForm from "./comment-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await fetchProject(Number(id));
  const comments = await fetchComments(Number(id));
  
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
    <main className="min-h-screen p-8">
      <Link href="/" className="text-sm text-blue-400 underline">
        Back to projects
      </Link>

      <section className="mt-6 rounded border p-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>

        <div className="mt-4">
          <StatusBadge status={project.status} />
        </div>

        {project.description && (
          <p className="mt-6 text-gray-300">{project.description}</p>
        )}

        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Project ID</dt>
            <dd>{project.id}</dd>
          </div>

          <div>
            <dt className="text-gray-500">Created At</dt>
            <dd>{new Date(project.created_at).toLocaleString()}</dd>
          </div>

          <div>
            <dt className="text-gray-500">Deadline</dt>
            <dd>
              <span className={`font-semibold ${deadlineStatus.className}`}>
                {deadlineStatus.label}
              </span>
              <br />
              {project.deadline
                ? new Date(project.deadline).toLocaleString()
                : "未設定"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded border p-6">
        <h2 className="text-xl font-bold">Comments</h2>

        <CommentForm projectId={project.id} />

        <div className="mt-6 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">
              No comments yet.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="text-zinc-200">
                  {comment.content}
                </p>

                <p className="mt-2 text-xs text-zinc-500" suppressHydrationWarning>
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

    </main>
  );
}