import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(", ");
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry detected";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddleware;
