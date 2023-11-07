"use client";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

const AccountBtn = ({ type }: { type?: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {session ? (
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => signOut()}
            color="primary"
            variant="ghost"
            className=" hover:bg-primary-500"
          >
            Wyloguj
          </Button>
        </div>
      ) : (
        <div className="flex flex-col  gap-2 w-min sm:flex-row">
          <Button
            onClick={() => signIn()}
            color="primary"
            className="hover:bg-primary-500/10"
            variant="flat"
          >
            Zaloguj
          </Button>
          <Button
            href="/register"
            onClick={() => router.push("/account/register")}
            color="primary"
            variant="ghost"
          >
            Zajerestruj
          </Button>
        </div>
      )}
    </>
  );
};

export default AccountBtn;
