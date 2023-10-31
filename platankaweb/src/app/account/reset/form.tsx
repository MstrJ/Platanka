import ResponseActions from "@/app/components/ResponseActions";
import { User } from "@/app/types/user";
import Get from "@/app/utilities/Get";
import SendCode from "@/app/utilities/SendCode";
import caesarCipher from "@/app/utilities/caesarCipher";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Form = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Dane wejściowe są nieprawidłowe")
      .email("Email jest nieprawidłowy"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setError("");

    const obj: User | null = await Get({
      urlEnd: `Accounts/${data.email}`,
      setLoading: setLoading,
    });
    if (!obj) {
      setError("Brak użytkownika dla podanych danych.");
      return;
    }
    if (!obj.salt) {
      setError(
        "Niemożliwa zmiana hasła dla użytkownika, który pierwotnie utworzył konto przez providerem."
      );
      return;
    }
    SendCode(setLoading, setError, data.email);
    params.set("email", data.email);
    params.set("callbackUrl", params.get("callbackUrl")!);
    params.set("type", "resetpassword");
    params.set(
      "c",
      caesarCipher(data.email, Number(process.env.NEXT_PUBLIC_SHIFT))
    );
    router.push(`/account/confirmation?${params.toString()}`);
  };
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const email: string | null = params.get("email");
    if (email) {
      setValue("email", email);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-10"
    >
      <Input
        type="text"
        label="Email"
        variant="bordered"
        placeholder=" "
        isInvalid={errors.email?.message ? true : false}
        errorMessage={errors.email?.message}
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email")}
      />
      <ResponseActions error={error} loading={loading} />
      <Button variant="flat" color="primary" type="submit" isDisabled={loading}>
        Wyślij
      </Button>
    </form>
  );
};

export default Form;
