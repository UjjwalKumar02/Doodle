import { prisma } from "@repo/db";
import { roomType } from "@repo/zod-types/types";
import { Request, Response } from "express";
import { generateSlug } from "../utils/generateSlug";

export const createRoom = async (req: Request, res: Response) => {
  // Zod validation
  const result = roomType.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid inputs" });
  }

  const userId = req.userId;
  if (!userId) return res.status(400).json({ error: "Empty userId!" });

  // Generate slug
  const slug = generateSlug(result.data.name);

  try {
    const room = await prisma.room.create({
      data: { slug, adminId: userId },
    });

    res.status(200).json({ slug: room.slug, message: "Room is created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error in creating room" });
  }
};
