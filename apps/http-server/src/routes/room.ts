import { Router } from "express";
import { createRoom, getRoomChats } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";

const router : Router = Router();

router.post("/create-room",authMiddleware, createRoom)

router.get("/:roomId/chats", authMiddleware, getRoomChats)

export default router;