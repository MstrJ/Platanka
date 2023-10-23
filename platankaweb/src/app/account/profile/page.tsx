"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="flex flex-col">
          <div className="bg-foreground text-background ">
            Id: {session.user.id}
          </div>
          <h1>Email: {session.user.email}</h1>
          <h2>Role: {session.user.permission.role}</h2>
          <div>
            Imie: {session.user.first_name} Nazwisko: {session.user.last_name}
          </div>
        </div>
      ) : (
        <h1>Nie jestes zalogowany</h1>
      )}
    </>
  );
};

export default Profile;
