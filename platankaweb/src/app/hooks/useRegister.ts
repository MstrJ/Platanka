import { useCallback, useEffect, useState } from "react";
import { NewUser } from "../types/user";
import useSWR from "swr";

const fetcher = async (newUser: NewUser) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/CreateUser?confirmpassword=${newUser.confirmPassword}&addastemp=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );
    return await res.json();
  } catch {
    return;
  }
};

const useRegister = async (newUser: NewUser) => {
  const { data, error, isLoading } = useSWR(
    "CreateUser",
    await fetcher(newUser)
  );

  return { data, error, isLoading };
};

export default useRegister;
