import { z } from "zod";

export const signupType = z.object({
  email: z.string().min(3).max(30),
  password: z.string().min(3).max(30),
  name: z.string().min(3).max(30),
  avatar: z.string().min(3).max(100),
});

export const signinType = z.object({
  email: z.string().min(3).max(30),
  password: z.string().min(3).max(30),
});

export const roomType = z.object({
  name: z.string().min(3).max(30),
});
