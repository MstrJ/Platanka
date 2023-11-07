"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginUser } from "../types/user";

const SignIn = async (props: {
  data: LoginUser;
  setError: React.Dispatch<React.SetStateAction<string>>;
  router: any;
  callbackURL: string;
}) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: props.data.email,
      password: props.data.password,
      callbackUrl: props.callbackURL,
    });

    if (!res?.error && res?.ok) {
      props.router.push(props.callbackURL);
    } else {
      props.setError("Podaj prawidłowy adres email i hasło.");
    }
  } catch (error: any) {
    props.setError("Błąd podczas łączenia z bazą danych");
  }
};

export default SignIn;
