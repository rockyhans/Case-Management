import { Request, Response } from "express";
import Case from "../models/case.model";
import Task from "../models/task.model";
import asyncHandler from "../utils/asyncHandler";

export const getDashboardSummary = asyncHandler(
  async (req: Request, res: Response) => {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    const [totalCases, upcomingHearings, pendingTasks, completedTasks] =
      await Promise.all([
        Case.countDocuments(),
        Case.countDocuments({
          nextHearingDate: { $gte: now, $lte: sevenDaysLater },
        }),
        Task.countDocuments({ status: "Pending" }),
        Task.countDocuments({ status: "Completed" }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalCases,
        upcomingHearings,
        pendingTasks,
        completedTasks,
      },
    });
  },
);
