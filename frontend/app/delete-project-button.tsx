"use client";

import { deleteProject } from "@/lib/api";

type Props = {
  projectId: number;
};

export default function DeleteProjectButton({ projectId }: Props) {
  async function handleDelete() {
    await deleteProject(projectId);
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="mt-3 rounded bg-red-600 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  );
}