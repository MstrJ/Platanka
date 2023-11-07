"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import caesarCipher from "../../../utilities/caesarCipher";
import Patch from "../../../utilities/Patch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import ResponseActions from "../../../components/ResponseActions";
import SuccessCard from "../../../components/Cards/SuccessCard";
import AccountTemplate from "@/components/AccountTemplate";
import ChangePasswordComponent from "@/components/ChangePasswordComponent";
import SendCode from "@/utilities/SendCode";
const Confirmation = () => {
  const schema = yup.object().shape({
    code: yup.number().required(" ").min(1000).max(9999),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const [email, setEmail] = useState<string | null>("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [error, setError] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const dic: any = {
    emailauth: "AuthorizationEmail",
    resetpassword: "CodeVerify",
  };

  const Confirm = async (data: any) => {
    setLoading(true);
    const r = await Patch(`Accounts/${dic[type]}/${email}?code=${data.code}`);

    setLoading(false);
    if (!r)
      setError(`Wystąpił błąd. Możliwe przyczyny:
    1. Niepoprawny kod lub kod wygasł.
    2. Wystąpił problem z połączeniem do naszej bazy danych.`);

    if (r) {
      setError("");
      setSuccess(true);
    }
  };

  useEffect(() => {
    // setSuccess(false);

    const email: string | null = params.get("email");
    const callbackUrl: string | null = params.get("callbackUrl");
    const type: string | null = params.get("type");
    const c: string | null = params.get("c");

    if (email && c && callbackUrl && type) {
      const isCorrect =
        caesarCipher(email!, Number(process.env.NEXT_PUBLIC_SHIFT!)) == c;
      if (isCorrect) {
        setEmail(email);
        setType(type);
        setCallBackUrl(callbackUrl);
      } else router.push("/denied");
    } else router.push("/denied");
  }, []);

  return (
    <AccountTemplate>
      <div className="h-screen w-screen md:w-[640px] bg-background  px-16 ">
        <div className="font-platanka text-4xl mt-12 text-primary-400 text-center">
          PlątAnka
        </div>
        {success && type === "emailauth" ? (
          <SuccessCard
            title="Pomyślna Autoryzacja Emaila"
            subText={<>Konto zostało utworzone.</>}
            callBackUrl={callBackUrl}
          />
        ) : success && type === "resetpassword" ? (
          <ChangePasswordComponent email={email!} />
        ) : (
          <form
            onSubmit={handleSubmit(Confirm)}
            className="flex flex-col items-center  justify-start space-y-8 "
          >
            <div className="md:text-5xl sm:text-4xl text-3xl pt-12">
              <FontAwesomeIcon icon={faShieldHalved} className="" size="sm" />
              Potwierdź Konto
            </div>
            <div className="text-center">
              Prosze potwiedź konto podając kod potwierdzający, który został
              wysłany na{" "}
              <span className=" font-bold text-primary-500   align-bottom">
                {email || "-"}
              </span>
              . Kod jest ważny przez 5min.
            </div>

            <div>
              <input
                type="number"
                {...register("code")}
                placeholder="0000"
                className="w-[15rem] h-32 mx-2 border-b-4 outline-none bg-transparent focus:border-b-primary-500 text-7xl text-center border-black duration-200 text-primary-500 active:border-0 placeholder:text-black/25"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <ResponseActions error={error} loading={loading} />
            <div className="flex flex-row w-full h-cover pt-6">
              <div className=" basis-5/6 mt-2">
                <span>Nie otrzymałeś kodu lub wygasł?</span>{" "}
                <Link
                  className="cursor-pointer"
                  isDisabled={loading}
                  onClick={() => SendCode(setLoading, setError, email!)}
                >
                  {" "}
                  Wyślij kod ponownie.
                </Link>
              </div>
              <div className=" basis-1/6 sm:my-0 my-3">
                <Button
                  isDisabled={!isValid}
                  color="primary"
                  type="submit"
                  className=""
                  variant="flat"
                >
                  Potwierdź
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </AccountTemplate>
  );
};

export default Confirmation;
