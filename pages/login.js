import { useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/todos");
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 Giriş Yap</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı adı"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-gray-700 text-gray-100 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-medium"
          >
            Giriş Yap
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Hesabın yok mu?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            Kayıt ol
          </span>
        </p>
      </div>
    </div>
  );
}
