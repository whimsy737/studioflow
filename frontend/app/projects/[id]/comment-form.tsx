"use client";

import { useState } from "react";
import { createComment } from "@/lib/api";

type Props = {
  projectId: number;
};

export default function CommentForm({ projectId }: Props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Comment is required");
      return;
    }

    setError("");

    await createComment(projectId, {
      content,
    });

    setContent("");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <textarea
        className="w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-white"
        placeholder="Add comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="rounded bg-white px-4 py-2 text-black"
      >
        Add Comment
      </button>
    </form>
  );
}