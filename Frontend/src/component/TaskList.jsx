import { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "https://task-manager-mern-72lb.onrender.com/api/v1/tasks";

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API);

      const allTasks = [
        ...res.data.data.incompleteTasks,
        ...res.data.data.completedTasks,
      ];

      setTasks(allTasks);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await axios.post(API, { title: newTask });

      setTasks((prev) => [...prev, res.data.data]);
      setNewTask("");
      alert("Task Added Successfully");
    } catch {
      setError("Failed to add task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(`${API}/${id}`);

      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  const incompleteTasks = tasks?.filter((t) => !t.completed) || [];
  const completedTasks = tasks?.filter((t) => t.completed) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6">
      {/* Add Task Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 p-5 rounded-2xl shadow-xl max-w-xl mx-auto mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          ✨ Task Manager
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        <button
          onClick={() => setShowTasks(!showTasks)}
          className="mt-4 text-blue-600 font-medium hover:underline"
        >
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-600 animate-pulse">
          Loading tasks...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tasks */}
      {showTasks && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incomplete */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border">
            <h2 className="font-semibold mb-4 text-gray-700 text-lg">
              🕒 Incomplete Tasks
            </h2>

            {incompleteTasks.length === 0 ? (
              <p className="text-gray-400 text-sm">No tasks</p>
            ) : (
              incompleteTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg mb-3 transition shadow-sm"
                >
                  <span
                    onClick={() => toggleTask(task._id)}
                    className="cursor-pointer text-gray-800 font-medium"
                  >
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Completed */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border">
            <h2 className="font-semibold mb-4 text-gray-700 text-lg">
              ✅ Completed Tasks
            </h2>

            {completedTasks.length === 0 ? (
              <p className="text-gray-400 text-sm">No tasks</p>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg mb-3 transition shadow-sm"
                >
                  <span
                    className="line-through text-gray-400 cursor-pointer"
                    onClick={() => toggleTask(task._id)}
                  >
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
