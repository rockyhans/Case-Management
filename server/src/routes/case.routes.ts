import { Router } from "express";
import {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  deleteCase,
} from "../controllers/case.controller";
import { createTask, getTasksByCase } from "../controllers/task.controller";
import { requireAdmin, attachRole } from "../middlewares/role.middleware";

const router = Router();

router.use(attachRole);

router.post("/", createCase);
router.get("/", getCases);
router.get("/:id", getCaseById);
router.put("/:id", updateCase);
router.delete("/:id", requireAdmin, deleteCase);

// Nested task routes
router.post("/:id/tasks", createTask);
router.get("/:id/tasks", getTasksByCase);

export default router;
