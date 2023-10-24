"use client";
import { Button, Image } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import googleLogo from "public/images/googleLogo.png";
import React from "react";

const GoogleButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const handleClick = async () => {
    const r = await signIn("google", { callbackUrl: callbackUrl });
  };
  // TODO: error setup
  return (
    <Button
      onClick={handleClick}
      className="outline-1 hover:outline-1 outline-offset-0 hover:outline-gray-400 duration-300 shadow-sm h-14 text-base w-full gap-1 bg-gray-50 border-1 border-gray-500 rounded-lg flex flex-row items-center justify-center"
    >
      <Image src={googleLogo.src} width={38} height={38} alt="googleButton" />
      <span className="text-gray-500 font-medium">Google</span>
    </Button>
  );
};

export default GoogleButton;
