import { useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      router.push("/login");
    } catch (err) {
      setError("Kayıt başarısız, kullanıcı zaten olabilir");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">📝 Kayıt Ol</h1>
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
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md font-medium"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Zaten hesabın var mı?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            Giriş yap
          </span>
        </p>
      </div>
    </div>
  );
}
