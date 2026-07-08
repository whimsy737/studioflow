"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";

import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem(
        "access_token"
      );

      if (!token) {
        return;
      }

      try {
        const user = await getCurrentUser();

        setUsername(user.username);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem(
          "access_token"
        );

        setIsLoggedIn(false);
      }
    }

    loadUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    setUsername("");
    setIsLoggedIn(false);
    router.push("/login");
  }

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="rounded bg-white px-4 py-2 text-sm text-black"
      >
        Login
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-green-400">
        Welcome, {username}
      </span>

      <button
        onClick={handleLogout}
        className="rounded bg-zinc-800 px-4 py-2 text-sm text-white"
      >
        Logout
      </button>
    </div>
  );
}