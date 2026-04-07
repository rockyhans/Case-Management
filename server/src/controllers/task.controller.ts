import { Request, Response } from "express";
import Task from "../models/task.model";
import Case from "../models/case.model";
import asyncHandler from "../utils/asyncHandler";

// POST /cases/:id/tasks
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const caseRecord = await Case.findById(req.params.id);
  if (!caseRecord) {
    res.status(404).json({ success: false, message: "Case not found" });
    return;
  }
  const task = await Task.create({ ...req.body, caseId: req.params.id });
  res.status(201).json({ success: true, data: task });
});

// GET /cases/:id/tasks
export const getTasksByCase = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await Task.find({ caseId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: tasks, total: tasks.length });
  },
);

// PUT /tasks/:id
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    res.status(404).json({ success: false, message: "Task not found" });
    return;
  }
  res.status(200).json({ success: true, data: updated });
});

// DELETE /tasks/:id
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404).json({ success: false, message: "Task not found" });
    return;
  }
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

// PATCH /tasks/:id/status
export const toggleTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    task.status = task.status === "Pending" ? "Completed" : "Pending";
    await task.save();
    res.status(200).json({ success: true, data: task });
  },
);
