"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export default function RoomClient({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`
    );

    if (ws) {
      setSocket(ws);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "join_room",
            roomId,
          })
        );
      };
    }

    return () => {
      ws.close();
    };
  }, []);

  if (!socket) return <div>Connecting to the server...</div>;

  return <Canvas socket={socket} roomId={roomId} />;
}
