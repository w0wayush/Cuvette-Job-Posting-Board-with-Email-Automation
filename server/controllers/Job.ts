import { Request, Response } from "express";
import { JobPosting } from "../models/Job.js";
import { ApiResponse, JobRequest } from "../types/job.js";
import { JobNotificationService } from "../utils/jobNotificationService.js";
import User from "../models/User.js";

// Create an instance of JobNotificationService
const notificationService = new JobNotificationService();

// Function to create a job posting
export const createJobPosting = async (
  req: Request<{}, {}, JobRequest>,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidatesList,
      endDate,
    } = req.body;

    if (
      !jobTitle ||
      !jobDescription ||
      !experienceLevel ||
      !candidatesList ||
      !endDate
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const newJobPosting = new JobPosting({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidatesList,
      endDate: new Date(endDate),
    });

    const savedJob = await newJobPosting.save();

    //@ts-ignore
    // console.log("user id in creating job - ", req.user._id);

    const updatedUser = await User.findByIdAndUpdate(
      //@ts-ignore
      req.user._id,
      { $push: { jobPostings: savedJob._id } },
      { new: true }
    );

    //@ts-ignore
    const companyName = req.user.companyName;
    savedJob.companyName = companyName;

    const emailResults = await notificationService.sendJobNotifications(
      savedJob
    );

    const successfulEmails = emailResults.filter((result) => result.success);
    const failedEmails = emailResults.filter((result) => !result.success);

    res.status(201).json({
      success: true,
      message: "Job posting created successfully",
      job: savedJob,
      emailResults: {
        total: emailResults.length,
        successful: successfulEmails.length,
        failed: failedEmails.length,
        failedEmails: failedEmails.map((result) => ({
          email: result.email,
          error: result.error,
        })),
      },
    });
  } catch (error) {
    console.error("Error in createJobPosting:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job posting",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const getJobPostings = async (
  req: Request,
  res: Response
): Promise<void> => {
  // @ts-ignore
  const userId = req.user._id; // Get userId from the request (assuming it's attached)
  //   const company = req.user.companyName;

  try {
    // Find user by ID and populate the job postings
    const user = await User.findById(userId).populate({
      path: "jobPostings",
      options: { sort: { createdAt: -1 } }, // Sort job postings by createdAt (newest first)
    });

    // Check if user exists and has job postings
    //@ts-ignore
    if (!user || !user.jobPostings || user.jobPostings.length === 0) {
      res.status(404).json({ message: "No job postings found." }); // Return early
      return;
    }

    //@ts-ignore
    const companyName = req.user.companyName;

    res
      .status(200)
      .json({ jobPostings: user.jobPostings, companyName: companyName }); // Return the job postings array
  } catch (error) {
    console.error("Error in getJobPostings:", error);
    res.status(500).json({ message: "Server error." });
  }
};
