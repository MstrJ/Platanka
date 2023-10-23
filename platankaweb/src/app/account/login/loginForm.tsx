"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CancelStepBtn from "./cancelStepBtn";
import { LoginUser } from "../../types/user";
import { useRouter, useSearchParams } from "next/navigation";
import SignIn from "../../utilities/SignIn";
import ResponseActions from "../../components/ResponseActions";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../components/icons";
const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const { data: session } = useSession(); // todo make it in mailware
  // if (session?.user) router.push(callbackUrl);

  const passwordValid = yup
    .string()
    .required("Dane wejściowe są nieprawidłowe")
    .min(1);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Dane wejściowe są nieprawidłowe")
      .email("Email jest nieprawidłowy"),
    password: step == 2 ? passwordValid : yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    unregister,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  useEffect(() => {
    if (step === 1) {
      unregister("password");
    }
  }, [step]);

  const onSubmit = async (data: any) => {
    setError("");
    setLoading(true);
    const d = data as LoginUser;
    console.log(callbackUrl);
    await SignIn({
      data: d,
      setError: setError,
      router: router,
      callbackURL: callbackUrl,
    });
    setLoading(false);
  };

  const resetPassword = () => {
    params.set("email", watch("email"));
    router.push(`/account/reset?${params.toString()}`);
  };

  return (
    <form
      className="flex flex-col gap-4 mt-8 space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        label="Email"
        variant="bordered"
        placeholder=" "
        id={`${step === 2 ? "cursor-not-allowed" : ""}`}
        disabled={step === 2 ? true : false}
        endContent={
          <CancelStepBtn
            step={step}
            setStep={setStep}
            reset={reset}
            setError={setError}
          />
        }
        className={`w-full ${
          step === 2
            ? "border-2 hover:outline-0 bg-slate-500/20 rounded-lg text-black/20 "
            : ""
        }`}
        isInvalid={errors.email?.message ? true : false}
        errorMessage={errors.email?.message}
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email")}
      />
      {step === 2 && (
        <div className="flex flex-col gap-8 items-end">
          <Input
            type={isVisible ? "text" : "password"}
            label="Hasło"
            placeholder=" "
            variant="bordered"
            className="w-full"
            isInvalid={errors.password?.message === undefined ? false : true}
            errorMessage={errors.password?.message}
            {...register("password")}
            aria-invalid={errors.password?.message ? "true" : "false"}
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
          <Link
            as={Link}
            color="primary"
            onClick={() => resetPassword()}
            className=" cursor-pointer mx-0.5"
          >
            Zapomniałeś hasła?
          </Link>
        </div>
      )}

      <ResponseActions error={error} loading={loading} />
      {step === 2 ? (
        <Button
          variant="flat"
          color="primary"
          type="submit"
          isDisabled={!isValid || loading}
        >
          Zaloguj
        </Button>
      ) : (
        <Button
          variant="flat"
          color="primary"
          type="button"
          isDisabled={!isValid}
          onClick={() => setStep((prev) => prev + 1)}
        >
          Dalej
        </Button>
      )}
    </form>
  );
};

export default LoginForm;
