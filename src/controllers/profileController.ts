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
    if (!profile) {
      return errorResponse(res, 404, "user doesn't exist");
    }

    const updatedData = data.inputs.reduce((acc, info) => {
      acc[info.key] = info.value;
      return acc;
    }, {});
    const updatedInformation = [...profile.information, updatedData];
    const mergedObject = updatedInformation.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
    const confirm = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        information: [mergedObject],
      },
    });

    if (confirm) {
      return res.status(200).json({
        message: "Profile Updated",
      });
    } else {
      errorResponse(res, 500, "Internal server error");
    }
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

export const deleteData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { keyToDelete, valueToDelete } = req.body;
    if (!keyToDelete || !valueToDelete) {
      return errorResponse(res, 400, "Data is already deleted or try again");
    }

    const data = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
      select: {
        information: true,
      },
    });

    const information = data.information;

    const updateData = Object.keys(information[0]).reduce((result, key) => {
      if (key != keyToDelete || information[0][key] != valueToDelete) {
        result[key] = information[0][key];
      }
      return result;
    }, {});

    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        information: [updateData],
      },
    });

    return res.status(200).json({
      message: "Information deleted successfully",
    });
  } catch (error) {
    errorResponse(res, 500, "Internals server error");
  }
};
