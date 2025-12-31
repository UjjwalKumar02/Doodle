import { WebSocketServer } from "ws";
import { verifyToken } from "./utils/verifyToken";
import "dotenv/config";

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

  socket.on("open", () => {
    console.log("Connenction is on!");
  });
});
