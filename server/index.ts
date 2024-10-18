import express, { Request, Response } from "express";
import env from "dotenv";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/job";
import cors from "cors";
import dbConnect from "./config/db";
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
