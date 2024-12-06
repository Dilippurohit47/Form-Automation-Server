import { Request, Response } from "express";
import bycrypt from "bcrypt";
import User from "../schema/userSchema.js";
import { errorResponse } from "../utils/errorHelper.js";
export const signIn = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return errorResponse(res, 403, "Please enter all fields");
    }
    const user = await User.findOne({ email });
    if (user) {
      return errorResponse(res, 403, "Email already exist try diffrent email");
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
