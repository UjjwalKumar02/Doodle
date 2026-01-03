"use client";

import { useRef, useState } from "react";
import { Button } from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (
      emailRef.current?.value === "" ||
      nameRef.current?.value === "" ||
      passwordRef.current?.value === ""
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current?.value,
            name: nameRef.current?.value,
            avatar: "temp_avatar",
            password: passwordRef.current?.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Request failed");
      }

      router.push("/signin");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-white px-7 py-10 flex flex-col justify-center gap-2.5 rounded-xl border border-gray-200">
        <h1 className="mb-5 text-xl font-medium tracking-tight text-center">
          Signup
        </h1>
        <InputBox
          reference={emailRef}
          size="md"
          type={"text"}
          placeholder="Email"
        />
        <InputBox
          reference={nameRef}
          size="md"
          type={"text"}
          placeholder="Name"
        />
        <InputBox
          reference={passwordRef}
          size="md"
          type={"password"}
          placeholder="Password"
        />
        <Button
          variant="primary"
          size="md"
          name="Signup"
          onClick={handleSignup}
          fullWidth={true}
          className={"mt-2"}
          loading={loading}
        />
      </div>

      <div className="flex items-center gap-1">
        <p>Already have an account?</p>
        <Link href={"/signin"} className="text-center text-sky-500">
          Login
        </Link>
      </div>
    </div>
  );
}
