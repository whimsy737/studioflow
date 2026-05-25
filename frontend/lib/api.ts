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

export async function createProject(data: {
  title: string;
  description: string;
}) {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      status: "todo",
      deadline: null,
    }),
  });



  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function deleteProject(id: number) {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}

export async function updateProject(
  id: number,
  data: {
    title: string;
    description: string;
    status: string;
  }
) {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      deadline: null,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
}

export async function fetchProject(id: number): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
}