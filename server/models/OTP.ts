import mongoose, { Document, Schema } from "mongoose";

export interface IOTP extends Document {
  email?: string;
  phone?: string;
  otp: string;
  type: "email" | "phone";
}

const otpSchema: Schema = new Schema({
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  type: { type: String, enum: ["email", "phone"], required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires after 5 minutes
});

export default mongoose.model<IOTP>("OTP", otpSchema);
