"use client";

import { useState } from "react";
import { updateComment } from "@/lib/api";

type Props = {
  projectId: number;
  commentId: number;
  initialContent: string;
};

export default function CommentEditForm({
  projectId,
  commentId,
  initialContent,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment is required");
      return;
    }

    setError("");

    await updateComment(projectId, commentId, {
      content,
    });

    setIsEditing(false);
    window.location.reload();
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <textarea
        className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-green-600 px-3 py-1 text-sm text-white"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => {
            setContent(initialContent);
            setIsEditing(false);
            setError("");
          }}
          className="rounded bg-gray-600 px-3 py-1 text-sm text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}