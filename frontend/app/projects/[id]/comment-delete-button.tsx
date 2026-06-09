"use client";

import { deleteComment } from "@/lib/api";

type Props = {
  projectId: number;
  commentId: number;
};

export default function CommentDeleteButton({
  projectId,
  commentId,
}: Props) {
  async function handleDelete() {
    const confirmed = confirm(
      "Delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    await deleteComment(
      projectId,
      commentId
    );

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  );
}