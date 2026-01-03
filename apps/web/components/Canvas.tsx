"use client";

import { useEffect, useRef, useState } from "react";
import { Draw } from "../app/draw";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export function Canvas({
  socket,
  roomId,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canva = canvasRef.current;
    if (!canva) return;

    Draw({ canva, roomId, socket });
  }, [canvasRef]);

  const handleLeaveRoom = () => {
    try {
      setLoading(true);
      socket.close();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="fixed h-fit inset-0 py-6 px-10 flex justify-between">
        <h1 className="text-xl font-medium tracking-tighter">Doodle</h1>
        <Button
          variant="secondary"
          size="sm"
          name="Leave room"
          onClick={handleLeaveRoom}
          loading={loading}
        />
      </div>
      <div className="border-2 border-gray-200 rounded-xl">
        <canvas
          ref={canvasRef}
          className="bg-white rounded-xl"
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}
