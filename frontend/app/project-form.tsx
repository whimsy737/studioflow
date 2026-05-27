"use client";

import { useState } from "react";
import { createProject } from "@/lib/api";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createProject({
      title,
      description,
      deadline: deadline || null,
    });

    setTitle("");
    setDescription("");
    setDeadline("");

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          className="w-full rounded border p-2 text-white"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <textarea
          className="w-full rounded border p-2 text-white"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full rounded border p-2 text-white"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      

      <button
        className="rounded bg-white px-4 py-2 text-black"
        type="submit"
      >
        Create Project
      </button>
    </form>
  );
}