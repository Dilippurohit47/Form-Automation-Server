import { Request, Response } from "express";
import { errorResponse } from "../utils/errorHelper.js";
import { playWright } from "../puppeter/index.js";
import User from "../schema/userSchema.js";
import Profile from "../schema/profileSchema.js";
import { prisma } from "../db/prisma.js";

export const formFill = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const { id } = req.params;

    if (!url) {
      return errorResponse(res, 404, "Please enter url");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const profile = await prisma.profile.findFirst({ where: { userId: id } });
    await playWright(url, profile);
    return res.status(200).json({
      message: "Form filled successfully",
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal server error");
  }
};
