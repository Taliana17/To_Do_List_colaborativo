const BASE = "http://localhost:3001";

export async function login(username, password) {
  const res = await fetch(
    `${BASE}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );
  const users = await res.json();
  if (users.length === 1) return users[0];
  throw new Error("Credenciales inválidas");
}

export async function listTasks(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/tasks${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Error al listar");
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error al crear");
  return res.json();
}

export async function patchTask(id, patch) {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error("Error al editar");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar");
}
