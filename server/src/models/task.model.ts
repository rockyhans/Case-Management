import mongoose, { Document, Schema } from "mongoose";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Pending" | "Completed";

export interface ITask extends Document {
  caseId: mongoose.Types.ObjectId;
  title: string;
  dueDate: Date;
  ownerName: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: [true, "Case ID is required"],
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Priority must be Low, Medium, or High",
      },
      default: "Medium",
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Completed"],
        message: "Status must be Pending or Completed",
      },
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", TaskSchema);
