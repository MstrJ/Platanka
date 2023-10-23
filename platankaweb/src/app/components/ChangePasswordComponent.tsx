import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Image, Input, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";
import SuccessCard from "./Cards/SuccessCard";
import Patch from "../utilities/Patch";
import { ResetPasswordUser } from "../types/user";
import ResponseActions from "./ResponseActions";

const ChangePasswordComponent = ({ email }: { email: string }) => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Pole Nowe Hasło jest wymagane")
      .test(
        "password-strength",
        "Hasło musi spełniać wymagania co najmniej jednej wielkiej litery, jednej małej litery, jednej cyfry i mieć co najmniej 8 znaków.",
        (value) => {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          return passwordRegex.test(value);
        }
      ),
    confirmPassword: yup
      .string()
      .required("Pole NowePotwierdz Hasło jest wymagane")
      .oneOf(
        [yup.ref("password")],
        "Pole Nowe Hasło i Potwierdź Nowe Hasło muszą być takie same"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const [isVisible, setIsVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);

    const obj: ResetPasswordUser = {
      email: email,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    };
    const r = await Patch<ResetPasswordUser>("Accounts/ChangePassword", obj);

    setLoading(false);
    if (r) {
      setError("");
      setSuccess(true);
    } else
      setError(`Wystąpił błąd. Możliwe przyczyny:    
    1. Konto z emailem ${email} nie istnieje w naszej bazie danych.
    2. Wystąpił problem z połączeniem do naszej bazy danych.`);
  };

  return (
    <>
      {!success ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-10"
        >
          <h1>
            Zmiana hasła dla <span className="font-bold">{email}</span>
          </h1>
          <Input
            placeholder=" "
            labelPlacement="outside"
            size="lg"
            radius="lg"
            type={isVisible ? "text" : "password"}
            label="Nowe Hasło"
            variant="bordered"
            className="w-full"
            {...register("password")}
            isInvalid={errors.password?.message ? true : false}
            errorMessage={errors.password?.message}
            aria-invalid={errors.password ? "true" : "false"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => {
                  setIsVisible((prev) => !prev);
                }}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            placeholder=" "
            size="lg"
            labelPlacement="outside"
            type={isVisible ? "text" : "password"}
            label="Potwierdz Nowe Hasło"
            variant="bordered"
            className="w-full"
            {...register("confirmPassword")}
            isInvalid={errors.confirmPassword?.message ? true : false}
            errorMessage={errors.confirmPassword?.message}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => {
                  setIsVisible((prev) => !prev);
                }}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <ResponseActions error={error} loading={loading} />
          <Button variant="flat" color="primary" type="submit">
            Potwierdź
          </Button>
        </form>
      ) : (
        <SuccessCard
          title="Pomyślna Zmiana Hasła"
          subText={
            <>
              Hasło dla <span className="font-semibold">{email}</span> zostało
              zmienione!
            </>
          }
          callBackUrl="/"
        />
      )}
    </>
  );
};

export default ChangePasswordComponent;
