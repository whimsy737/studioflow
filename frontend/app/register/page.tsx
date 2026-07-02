"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setError("");

      await register({
        username,
        email,
        password,
      });

      router.push("/login");
    } catch {
      setError("Register failed");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            className="w-full rounded border border-zinc-700 bg-zinc-950 p-2"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            className="w-full rounded border border-zinc-700 bg-zinc-950 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="w-full rounded border border-zinc-700 bg-zinc-950 p-2"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-white py-2 text-black"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}