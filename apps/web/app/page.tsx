"use client";

import Image from "next/image";
import img from "../public/logo.png";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Image src={img} width={200} height={200} alt="logo" />
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="md"
          name="Get started >"
          onClick={() => router.push("/signin")}
        />
      </div>
    </div>
  );
}
