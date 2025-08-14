export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getHealth() {
  try {
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Health check error:", error);
    return null;
  }
}
