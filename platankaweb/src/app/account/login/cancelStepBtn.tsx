import React from "react";
import { UseFormReset } from "react-hook-form";

const CancelStepBtn = ({
  step,
  setStep,
  reset,
  setError,
}: {
  step: number;
  setStep: any;
  setError: any;
  reset: UseFormReset<{
    password?: string | undefined;
    email: string;
  }>;
}) => {
  return (
    <>
      {step === 2 ? (
        <button
          onClick={() => {
            setStep(1);
            reset({ email: "" });
            setError("");
          }}
          type="reset"
          className=" w-fit  h-fit text-sm font-medium text-violet-500"
        >
          Zmień
        </button>
      ) : (
        <div> </div>
      )}
    </>
  );
};

export default CancelStepBtn;
