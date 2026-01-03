import Image from "next/image";
import { ReactNode } from "react";
import img from "../../public/logo.png";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between">
      <div className="min-h-screen min-w-[67%] flex justify-center items-center border-r border-gray-200">
        <Image src={img} width={200} height={200} alt="logo" />
      </div>
      <div className="w-full bg-gray-100 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
