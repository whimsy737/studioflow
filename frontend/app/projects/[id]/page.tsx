import Link from "next/link";
import { fetchProject } from "@/lib/api";
import StatusBadge from "../../status-badge";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await fetchProject(Number(id));

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
              {project.deadline
                ? new Date(project.deadline).toLocaleString()
                : "未設定"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}