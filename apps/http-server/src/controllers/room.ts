import { prisma } from "@repo/db";
import { roomType } from "@repo/zod-types/types";
import { Request, Response } from "express";
import { generateSlug } from "../utils/generateSlug";

// Create a new room
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

// Get room chats
// export const getRoomChats = async (req: Request, res: Response) => {
//   const slug = req.params.slug;

//   try {
//     const chats = await prisma.room.findUnique({
//       where: { slug },
//       select: {
//         chats: { take: 50, orderBy: { id: "desc" } },
//       },
//     });

//     res.json({ chats });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error while fetching chats" });
//   }
// };

// Get room slug
// export const getRoomSlug = async (req: Request, res: Response) => {
//   const roomId = req.params.roomId;

//   if (!roomId) return res.status(404).json({ error: "Empty roomId!" });

//   try {
//     const room = await prisma.room.findUnique({
//       where: { id: roomId },
//     });

//     if (!room) return res.status(405).json({ error: "Room doesn't exists" });

//     res.status(200).json({ slug: room.slug });
//   } catch (error) {
//     console.log(error);
//     res.status(411).json({ error: "Error while fetching room slug" });
//   }
// };

// Get room shapes
export const getRoomShapes = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  if (!roomId) return res.status(404).json({ error: "RoomId is empty!" });

  try {
    const shapes = await prisma.chat.findMany({
      where: {
        roomId,
      },
      take: 50,
      orderBy: { id: "desc" },
    });

    res.status(200).json(shapes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while fetching room shapes" });
  }
};
