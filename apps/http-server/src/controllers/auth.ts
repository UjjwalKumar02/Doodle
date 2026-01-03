import { Request, Response } from "express";
import { signupType, signinType } from "@repo/zod-types/types";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup handler
export const handleSignup = async (req: Request, res: Response) => {
  // Zod validation
  const result = signupType.safeParse(req.body);
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({ error: "Invaild inputs" });
  }

  // Hashing password
  const hashedPassword = await bcrypt.hash(result.data.password, 5);

  try {
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        name: result.data.name,
        avatar: result.data.avatar,
      },
    });

    res.status(200).json({ message: "User is signed up!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error while registering user" });
  }
};

// Signin handler
export const handleSignin = async (req: Request, res: Response) => {
  // Zod validation
  const result = signinType.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invaild inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Password validation check
    const isPasswordCorrect = await bcrypt.compare(
      result.data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate token
    // @ts-ignore
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in signin" });
  }
};
