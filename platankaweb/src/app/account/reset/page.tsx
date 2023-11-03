"use client";
import AccountTemplate from "@/app/components/AccountTemplate";
import React, { useEffect, useState } from "react";
import Form from "./form";
import PlatankaLink from "@/app/components/PlatankaLink";

const Reset = () => {
  return (
    <AccountTemplate>
      <div className="md:flex-none flex-1 basis-full md:w-96 h-screen bg-background/95">
        <div className="pl-8 pr-8">
          <PlatankaLink />

          <h1 className="text-primary-500  font-platanka  text-[34px]  bold mt-8">
            Zresetuj swoje hasło
          </h1>
          <div className="mt-8 text-sm">
            Aby zresetować hasło, wpisz poniżej swój adres email i naciśnij
            wyślij. Na Twój adres e-mail zostanie wysłany kod, który bedziesz
            musiał/a wpisać w następnym kroku.
          </div>
          <Form />
        </div>
      </div>
      <div className="flex-1"></div>
    </AccountTemplate>
  );
};

export default Reset;
