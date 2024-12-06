import { Response, Request } from "express";
import { errorResponse } from "../utils/errorHelper.js";
import Profile from "../schema/profileSchema.js";
import User from "../schema/userSchema.js";
export const createProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.userId) {
      return errorResponse(res, 404, "UserId is required");
    }

    const user = await User.findById(data.userId);
    if (!user) {
      return errorResponse(res, 404, "User doesn't exist ");
    }
    await Profile.create({
      user_id: data.userId,
      firstName: data.firstName || null,
      email: data.email || null,
      fullName: data.fullName || null,
      lastName: data.lastName || null,
      linkedInUrl: data.linkedInUrl || null,
      githubUrl: data.githubUrl || null,
      phoneNumber: data.phoneNumber || null,
      portfolioUrl: data.portfolioUrl || null,
      experience: data.experience || null,
    });
    return res.status(200).json({
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error)
    errorResponse(res, 500, "Internal server error");
  }
};
