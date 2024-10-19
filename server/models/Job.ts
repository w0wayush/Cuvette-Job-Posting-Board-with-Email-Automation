import mongoose, { Document, Schema } from "mongoose";
import { IJobPosting } from "../types/job";

const jobSchema = new Schema<IJobPosting>({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Intermediate Level", "Mid Level", "Senior Level"],
    required: true,
  },
  candidatesList: [
    {
      type: String,
    },
  ],
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const JobPosting = mongoose.model<IJobPosting>("Job", jobSchema);
