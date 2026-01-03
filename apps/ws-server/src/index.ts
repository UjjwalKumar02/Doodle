import WebSocket, { WebSocketServer } from "ws";
import { verifyToken } from "./utils/verifyToken";
import { prisma } from "@repo/db";
import "dotenv/config";

interface User {
  ws: WebSocket;
  userId: string;
  room: string[];
}

const data: User[] = [];

// websocket server
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, req) => {
  const url = req.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  const userId = verifyToken(token || "");

  if (userId == null) {
    wss.close();
    return;
  }

  data.push({ ws: socket, userId: userId, room: [] });

  // Event handeling
  socket.on("message", async (req) => {
    const message = JSON.parse(req.toString());

    // Join room
    if (message.type === "join_room") {
      const user = data.find((d) => d.ws === socket);
      if (!user) {
        socket.send("User not found");
        return;
      }

      // check in db if room exists or not
      const room = await prisma.room.findUnique({
        where: { id: message.roomId },
      });
      if (!room) {
        socket.send("Room not exists");
        return;
      }

      user.room.push(message.roomId);
    }

    // Leave room
    if (message.type === "leave_room") {
      const user = data.find((d) => d.ws === socket);
      if (!user) {
        socket.send("User not found");
        return;
      }
      user.room = user.room.filter((r) => r != message.roomId);
    }

    // Incoming message: Saving in DB and sending to members
    if (message.type === "chat") {
      await prisma.chat.create({
        data: {
          content: message.content,
          roomId: message.roomId,
          createdById: userId,
        },
      });

      data.forEach((d) => {
        if (d.room.includes(message.roomId)) {
          d.ws.send(message.content);
        }
      });
    }
  });
});
