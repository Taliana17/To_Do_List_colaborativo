import { useState } from "react";
import { login } from "./api";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.username.trim(), form.password);
      localStorage.setItem("user", JSON.stringify(user));
      onSuccess(user); // -> App.jsx recibe y pasa a las tareas
    } catch {
      setError("Usuario o contraseña inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen grid place-items-center p-6"
      style={{ backgroundColor: "#E9D5FF" }} 
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7"
      >
        <h1 className="text-2xl font-bold mb-6 text-purple-800">
          Iniciar sesión
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 text-white py-2 mt-2 hover:bg-purple-700 disabled:opacity-60 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        
      </form>
    </div>
  );
}
