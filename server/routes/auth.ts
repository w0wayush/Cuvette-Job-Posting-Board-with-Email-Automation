import express from "express";
import { login } from "../controllers/Signin.js";
import { signup } from "../controllers/Signup.js";
import { verifyEmail, verifyPhone } from "../controllers/Verify.js";

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/verify-phone", verifyPhone);
router.post("/login", login);

// Export the router as authRoutes
export const authRoutes = router;
