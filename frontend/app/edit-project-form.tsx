"use client";

import { useState } from "react";
import { updateProject } from "@/lib/api";

type Props = {
  projectId: number;
  initialTitle: string;
  initialDescription: string | null;
  initialStatus: string;
  initialDeadline: string | null;
};

export default function EditProjectForm({
  projectId,
  initialTitle,
  initialDescription,
  initialStatus,
  initialDeadline,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(initialTitle);

  const [description, setDescription] = useState(
    initialDescription ?? ""
  );

  const [status, setStatus] = useState(initialStatus);

  const [deadline, setDeadline] = useState(
    initialDeadline
      ? new Date(initialDeadline)
          .toISOString()
          .slice(0, 16)
      : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateProject(projectId, {
      title,
      description,
      status,
      deadline: deadline || null,
    });

    setIsEditing(false);

    window.location.reload();
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        className="w-full rounded border p-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full rounded border p-2 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full rounded border p-2 text-white"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="review">review</option>
        <option value="done">done</option>
      </select>

      <input
        type="datetime-local"
        className="w-full rounded border p-2 text-white"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-green-600 px-3 py-1 text-sm text-white"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded bg-gray-600 px-3 py-1 text-sm text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}