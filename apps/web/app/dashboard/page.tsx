"use client";

import { useRef, useState } from "react";
import { Button } from "../../components/Button";
import InputBox from "../../components/InputBox";
import { useRouter } from "next/navigation";

export default function Home() {
  const roomIdRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleJoin = () => {
    setLoading(true);
    router.push(`/canvas/${roomIdRef.current?.value}`);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="fixed h-fit inset-0 py-6 px-10 flex justify-between">
        <h1 className="text-xl font-medium tracking-tighter">Doodle</h1>
        <Button
          variant="secondary"
          size="sm"
          name="Logout"
          onClick={handleLogout}
        />
      </div>
      <h1 className="text-xl font-medium tracking-tight mb-5">Join Room</h1>
      <div className="space-x-2">
        <InputBox
          reference={roomIdRef}
          size="md"
          type="text"
          placeholder="RoomId"
        />
        <Button
          variant="primary"
          size="md"
          name="Join"
          onClick={handleJoin}
          loading={loading}
        />
      </div>
    </div>
  );
}
