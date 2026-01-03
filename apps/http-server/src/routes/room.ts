import { Router } from "express";
import { createRoom, getRoomShapes } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/create-room", authMiddleware, createRoom);

// router.get("/:slug/chats", getRoomChats);

// router.get("/:roomId/slug", authMiddleware, getRoomSlug);

router.get("/room/:roomId", authMiddleware, getRoomShapes);

export default router;
