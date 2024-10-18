import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  email: string;
  password: string;
  phone: number;
  employeeSize?: number;
  token?: string;
  jobPosting?: mongoose.Types.ObjectId;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

const userSchema: Schema = new Schema({
  firstName: {
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
  employeeSize: {
    type: Number,
  },
  token: {
    type: String,
  },
  jobPosting: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
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
