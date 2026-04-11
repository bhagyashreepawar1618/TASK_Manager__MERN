import { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "https://task-manager-mern-72lb.onrender.com/api/v1/tasks";

  //  Fetch Tasks
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

  // load once
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
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

  //  Toggle Complete
  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(`${API}/${id}`);

      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    } catch {
      setError("Failed to update task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  // Safe Filtering
  const incompleteTasks = tasks?.filter((t) => !t.completed) || [];
  const completedTasks = tasks?.filter((t) => t.completed) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Add Task */}
      <div className="bg-white p-4 rounded-2xl shadow-md max-w-xl mx-auto mb-6">
        <h1 className="text-xl font-semibold mb-3">Task Manager</h1>

        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <button
          onClick={() => setShowTasks(!showTasks)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tasks */}
      {showTasks && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incomplete Tasks */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="font-semibold mb-3">Incomplete Tasks</h2>

            {incompleteTasks.length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              incompleteTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-2"
                >
                  <span
                    onClick={() => toggleTask(task._id)}
                    className="cursor-pointer"
                  >
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Completed Tasks */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="font-semibold mb-3">Completed Tasks</h2>

            {completedTasks.length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg mb-2"
                >
                  <span
                    className="line-through text-gray-400 cursor-pointer"
                    onClick={() => toggleTask(task._id)}
                  >
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500"
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
