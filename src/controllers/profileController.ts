import { Response, Request } from "express";
import { errorResponse } from "../utils/errorHelper.js";
import { prisma } from "../db/prisma.js";

export const createProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 404, "UserId is required");
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    const updatedInformation = [...profile?.information, data];
    console.log(updatedInformation);
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        information: updatedInformation,
      },
    });
    return res.status(200).json({
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error");
  }
};
export const getInformation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return errorResponse(res, 404, "userId is required");
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      message: "Information fetched successfully",
      data: profile,
    });
  } catch (error) {
    errorResponse(res, 500, "internal server error");
  }
};
