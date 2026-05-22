const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type Project = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  deadline: string | null;
  created_at: string;
};

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}