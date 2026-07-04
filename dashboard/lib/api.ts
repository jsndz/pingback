const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function getAuthHeaders(): Promise<HeadersInit> {
  try {
    const res = await fetch("/api/token");
    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        return {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        };
      }
    }
  } catch (err) {
    console.error("Failed to retrieve auth token", err);
  }
  return {
    "Content-Type": "application/json",
  };
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  const url = `${API_URL}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error: ${res.statusText}`);
  }
  
  return res.json();
}
