import mongoose, { Document, Schema } from "mongoose";

export type CaseStage = "Filing" | "Evidence" | "Arguments" | "Order Reserved";

export interface ICase extends Document {
  caseTitle: string;
  clientName: string;
  courtName: string;
  caseType: string;
  nextHearingDate: Date;
  stage: CaseStage;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CaseSchema = new Schema<ICase>(
  {
    caseTitle: {
      type: String,
      required: [true, "Case title is required"],
      minlength: [3, "Case title must be at least 3 characters"],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    courtName: {
      type: String,
      required: [true, "Court name is required"],
      trim: true,
    },
    caseType: {
      type: String,
      required: [true, "Case type is required"],
      trim: true,
    },
    nextHearingDate: {
      type: Date,
      required: [true, "Next hearing date is required"],
    },
    stage: {
      type: String,
      required: [true, "Stage is required"],
      enum: {
        values: ["Filing", "Evidence", "Arguments", "Order Reserved"],
        message:
          "Stage must be one of: Filing, Evidence, Arguments, Order Reserved",
      },
    },
    notes: {
      type: String,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICase>("Case", CaseSchema);
