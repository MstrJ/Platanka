"use client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";

const Account = () => {
  const { status, data: session } = useSession();
  if (status !== "loading" && !session) return notFound();
  return (
    <div className="flex flex-col">
      <div className="bg-foreground text-background ">
        Id: {session?.user.id}
      </div>
      <h1>Email: {session?.user.email}</h1>
      <h2>Role: {session?.user.permission.role}</h2>
      <div>
        Imie: {session?.user.first_name} Nazwisko: {session?.user.last_name}
      </div>
    </div>
  );
};

export default Account;
