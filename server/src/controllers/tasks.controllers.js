import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Task } from "../models/tasks.model.js";

export const addTask = asyncHandler(async (req, res) => {
  //get task from user
  const { title } = req.body;

  //validation
  if (!title) {
    throw new ApiError(404, "task title is required");
  }

  //after getting task store in db
  const task = await Task.create({
    title,
  });

  if (!task) {
    throw new ApiError(500, "Something went wrong while storing task");
  }

  //if task is stored sucessfully send a response
  return res
    .status(200)
    .json(new ApiResponse(200, task, "task is stored successfully"));
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const incompleteTasks = await Task.find({ completed: false });
  const completedTasks = await Task.find({ completed: true });

  //return response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        incompleteTasks,
        completedTasks,
      },
      "Tasks fetched successfully",
    ),
  );
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //find the task in DB
  const oldTask = await Task.findById(id);
  console.log("Old task is=", oldTask);

  if (!oldTask) {
    throw new ApiError(404, "Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      completed: !oldTask.completed,
    },
    {
      new: true,
    },
  );

  console.log("Updated task is=", updatedTask);

  //send response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTask,
        "Completed Status Updated Successfully..!!",
      ),
    );
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
});
