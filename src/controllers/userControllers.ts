import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import User from "../schema/userSchema.js";
import { errorResponse } from "../utils/errorHelper.js";
export const signUp = async (req: Request, res: Response) => {
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

    const data = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User sign-in  successfully",
      data,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      errorResponse(res, 404, "Please enter all fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordCorrect = bycrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return errorResponse(res, 404, "Invalid password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfully",
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};
