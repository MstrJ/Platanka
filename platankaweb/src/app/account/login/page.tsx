"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Button, Link } from "@nextui-org/react";
import ProviderCard from "../../components/ProviderCard";
import LoginForm from "./loginForm";
import { useRouter, useSearchParams } from "next/navigation";
import AccountTemplate from "@/app/components/AccountTemplate";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { data: session } = useSession();
  if (session?.user) router.push(callbackUrl);
  return (
    <AccountTemplate>
      <div className="md:flex-none flex-1 basis-full md:w-96 h-screen bg-background/95">
        <div className="pl-8">
          <h1 className="text-primary-400 font-platanka text-[28px] mt-8">
            PlątAnka
          </h1>
          <h1 className="text-primary-500  font-platanka  text-[34px]  bold mt-8">
            Zaloguj się na swoje konto
          </h1>
          <div className="mt-3  ">
            <span className="font-medium text-lg">Nie posiadasz konta? </span>
            <Link
              href="register"
              className="font-bold text-lg text-violet-500"
              underline="none"
              as={Link}
              color="primary"
            >
              Stwórz konto
            </Link>
          </div>
          <div className="mr-8 mt-10">
            <ProviderCard />
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
    </AccountTemplate>
  );
};

export default LoginPage;
