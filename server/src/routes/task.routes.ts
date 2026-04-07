import { Router } from "express";
import {
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/task.controller";
import { requireAdmin, attachRole } from "../middlewares/role.middleware";

const router = Router();

router.use(attachRole);

router.put("/:id", updateTask);
router.delete("/:id", requireAdmin, deleteTask);
router.patch("/:id/status", toggleTaskStatus);

export default router;
