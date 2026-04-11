import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./component/TaskList.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <TaskList />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
    <h1 className="bg-purple-400 text-white">HII USER</h1>
  </StrictMode>,
);
