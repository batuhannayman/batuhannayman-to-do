import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Todos() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Todo yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await API.post("/todos", { text: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo("");
  };

  const toggleTodo = async (id, completed) => {
    const res = await API.put(`/todos/${id}`, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            📝 Yapılacaklar Listem
          </h1>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition"
          >
            Çıkış
          </button>
        </div>

        <form onSubmit={addTodo} className="flex mb-5">
          <input
            className="flex-1 border border-gray-300 dark:border-gray-600 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Yeni görev ekle..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition"
          >
            Ekle
          </button>
        </form>

        <ul className="space-y-2">
          {todos.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Henüz görev yok 🎉
            </p>
          )}
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition p-3 rounded-md"
            >
              <div
                className={`flex-1 cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-100"
                }`}
                onClick={() => toggleTodo(todo._id, todo.completed)}
              >
                {todo.text}
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 text-sm transition"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
