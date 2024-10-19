import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.js";
import { jobRoutes } from "./routes/job.js";
import { dbConnect } from "./config/db.js";
import { userRoutes } from "./routes/user.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/auth", userRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
