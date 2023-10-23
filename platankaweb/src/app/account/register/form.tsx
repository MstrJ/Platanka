"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import caesarCipher from "../../utilities/caesarCipher";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../components/icons";
import { NewUser } from "../../types/user";
import Post from "../../utilities/Post";
import ResponseActions from "../../components/ResponseActions";

const Form = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Dane wejściowe są nieprawidłowe")
      .email("Email jest nieprawidłowy"),
    firstName: yup.string().required("Pole Imie jest wymagane"),
    lastName: yup.string().required("Pole Nazwisko jest wymagane"),
    password: yup
      .string()
      .required("Pole Hasło jest wymagane")
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
      .required("Pole Potwierdz Hasło jest wymagane")
      .oneOf(
        [yup.ref("password")],
        "Pole Hasło i Potwierdź Hasło muszą być takie same"
      ),
    acceptCheckbox: yup
      .boolean()
      .oneOf([true], "Musisz zaakceptować regulamin")
      .required("Musisz zaakceptować regulamin"),
    captcha: yup.string().required(),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const onSubmit = async (d: any) => {
    const newUser: NewUser = {
      first_Name: d.firstName,
      email: d.email,
      last_Name: d.lastName,
      password: d.password,
      confirmPassword: d.confirmPassword,
      providers: [],
    };

    setLoading(true);
    const res = await Post({
      data: newUser,
      link: `Accounts/CreateUser?addastemp=true`,
    });
    if (res?.error) setError(res.data);
    else setError("");

    setLoading(false);

    if (!res?.error) {
      const c: string = caesarCipher(
        d.email,
        Number(process.env.NEXT_PUBLIC_SHIFT!)
      );
      params.set("email", d.email);
      params.set("c", c);
      params.set("type", "emailauth");
      params.set("callbackUrl", callbackUrl);
      router.push(`/account/confirmation?${params.toString()}`);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 mt-8 space-y-1 mb-8 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        label="Email"
        variant="bordered"
        placeholder=" "
        size="lg"
        radius="lg"
        labelPlacement="outside"
        className="w-full "
        {...register("email")}
        isInvalid={errors.email?.message ? true : false}
        errorMessage={errors.email?.message}
        aria-invalid={errors.email ? "true" : "false"}
      />
      <Input
        placeholder=" "
        radius="lg"
        size="lg"
        labelPlacement="outside"
        type="text"
        label="Imie"
        variant="bordered"
        className="w-full"
        {...register("firstName")}
        isInvalid={errors.firstName?.message ? true : false}
        errorMessage={errors.firstName?.message}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      <Input
        placeholder=" "
        size="lg"
        radius="lg"
        labelPlacement="outside"
        type="text"
        label="Nazwisko"
        variant="bordered"
        className="w-full"
        {...register("lastName")}
        isInvalid={errors.lastName?.message ? true : false}
        errorMessage={errors.lastName?.message}
        aria-invalid={errors.lastName ? "true" : "false"}
      />
      <Input
        placeholder=" "
        labelPlacement="outside"
        size="lg"
        radius="lg"
        type={isVisible ? "text" : "password"}
        label="Hasło"
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
        label="Potwierdz Hasło"
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
      <Checkbox
        radius="lg"
        color="primary"
        checked={watch("acceptCheckbox")}
        onChange={(e) => {
          setValue("acceptCheckbox", e.target.checked);
        }}
      >
        <span className={`text-sm ${errors.acceptCheckbox && "err"}`}>
          Akceptuję{" "}
          <Link
            href="/polityka-prywatnosci"
            as={Link}
            className="text-sm font-bold "
          >
            Politykę Prywatności
          </Link>{" "}
          i{" "}
          <Link href="/regulamin" as={Link} className="text-sm font-bold">
            Regulamin
          </Link>
        </span>
      </Checkbox>
      <div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          onChange={(e: any) => {
            setValue("captcha", e);
          }}
        />
        {errors.captcha && (
          <div className="text-red-500">
            Poczekaj chwilę, abyśmy mogli zweryfikować, czy nie jesteś robotem.
          </div>
        )}
      </div>
      <ResponseActions error={error} loading={loading} />

      <Button
        className="w-full"
        color="primary"
        type="submit"
        onClick={() => setError("")}
        variant="flat"
      >
        Stwórz Konto
      </Button>
    </form>
  );
};

export default Form;
