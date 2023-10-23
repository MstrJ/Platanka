"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Button, Link } from "@nextui-org/react";
import flowers from "/public/images/flowers2.png";
import GoogleButton from "../../components/GoogleButton";
import ProviderCard from "../../components/ProviderCard";
import Form from "./form";
import AccountTemplate from "@/app/components/AccountTemplate";

const RegisterPage = () => {
  return (
    <AccountTemplate>
      <div className="flex-1 md:basis-1/4 basis-1/6  "></div>
      <div className=" flex-1 md:basis-3/4 basis-5/6 h-screen bg-background/95  overflow-y-auto">
        <div className="pl-14 md:w-96">
          <h1 className="text-primary-400 font-platanka text-[28px] mt-8">
            PlątAnka
          </h1>
          <h1 className="text-primary-500  font-platanka  text-[34px]  bold mt-8">
            Stwórz Konto
          </h1>
          <div className="mt-3  ">
            <span className="font-medium text-lg">Posiadasz konto? </span>
            <Link
              href="login"
              className="font-bold text-lg text-violet-500"
              underline="none"
              as={Link}
              color="primary"
            >
              Zaloguj się teraz
            </Link>
          </div>
          <div className="mr-8 mt-10">
            <ProviderCard />
            <Form />
          </div>
        </div>
      </div>
    </AccountTemplate>
  );
};

export default RegisterPage;
