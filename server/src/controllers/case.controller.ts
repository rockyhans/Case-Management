import { Request, Response } from "express";
import Case from "../models/case.model";
import Task from "../models/task.model";
import asyncHandler from "../utils/asyncHandler";

// POST /cases
export const createCase = asyncHandler(async (req: Request, res: Response) => {
  const caseData = req.body;
  const newCase = await Case.create(caseData);
  res.status(201).json({ success: true, data: newCase });
});

// GET /cases
export const getCases = asyncHandler(async (req: Request, res: Response) => {
  const { search, stage, dateFrom, dateTo } = req.query;

  const query: any = {};

  if (search) {
    query.$or = [
      { caseTitle: { $regex: search, $options: "i" } },
      { clientName: { $regex: search, $options: "i" } },
    ];
  }

  if (stage) {
    query.stage = stage;
  }

  if (dateFrom || dateTo) {
    query.nextHearingDate = {};
    if (dateFrom) query.nextHearingDate.$gte = new Date(dateFrom as string);
    if (dateTo) query.nextHearingDate.$lte = new Date(dateTo as string);
  }

  const cases = await Case.find(query).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: cases, total: cases.length });
});

// GET /cases/:id
export const getCaseById = asyncHandler(async (req: Request, res: Response) => {
  const caseRecord = await Case.findById(req.params.id);
  if (!caseRecord) {
    res.status(404).json({ success: false, message: "Case not found" });
    return;
  }
  res.status(200).json({ success: true, data: caseRecord });
});

// PUT /cases/:id
export const updateCase = asyncHandler(async (req: Request, res: Response) => {
  const updated = await Case.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    res.status(404).json({ success: false, message: "Case not found" });
    return;
  }
  res.status(200).json({ success: true, data: updated });
});

// DELETE /cases/:id
export const deleteCase = asyncHandler(async (req: Request, res: Response) => {
  const caseRecord = await Case.findById(req.params.id);
  if (!caseRecord) {
    res.status(404).json({ success: false, message: "Case not found" });
    return;
  }

  // Cascade delete tasks
  await Task.deleteMany({ caseId: req.params.id });
  await Case.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Case and associated tasks deleted successfully",
  });
});
