import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  email: string;
  password: string;
  phone: number;
  employeeSize?: number;
  token?: string;
  jobPostings?: mongoose.Schema.Types.ObjectId[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  employeeSize: {
    type: Number,
  },
  token: {
    type: String,
  },
  jobPostings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>("User", userSchema);
