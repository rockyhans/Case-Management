import { Request, Response, NextFunction } from "express";

//Role is passed via header x-user-role
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const role = req.headers["x-user-role"] as string;
  if (role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
    return;
  }
  next();
};

export const attachRole = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const role = (req.headers["x-user-role"] as string) || "intern";
  (req as any).userRole = role;
  next();
};
