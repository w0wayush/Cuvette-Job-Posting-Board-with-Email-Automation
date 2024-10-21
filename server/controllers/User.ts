import { Request, Response } from "express";

export const userRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the Authorization header correctly
    const authHeader = req.headers.authorization; // authorization headers are case-insensitive

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(403).json({ message: "User not logged in" });
      return; // Exit after sending the response
    }

    // Split to get the token
    const token = authHeader.split(" ")[1];
    // console.log("User route token - ", token);

    if (!token) {
      res.status(403).json({ message: "User not logged in" });
    }

    res.status(200).json({
      //@ts-ignore
      data: req.user,
    });
  } catch (error) {
    console.error("Error in userRoute: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
