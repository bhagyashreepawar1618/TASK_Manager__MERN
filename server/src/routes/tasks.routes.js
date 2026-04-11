import Router from "express";
import {
  addTask,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.route("/tasks").post(addTask);
router.route("/tasks").get(getAllTasks);
router.route("/tasks/:id").patch(updateTaskStatus);
router.route("/tasks/:id").delete(deleteTask);

export default router;
