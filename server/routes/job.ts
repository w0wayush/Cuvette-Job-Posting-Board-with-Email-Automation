import express from "express";
import { createJobPosting, getJobPostings } from "../controllers/Job.js";
import { auth } from "../middlewares/index.js";

const router = express.Router();

router.post("/createJob", auth, createJobPosting);
router.get("/getJobs", auth, getJobPostings);

export const jobRoutes = router;
