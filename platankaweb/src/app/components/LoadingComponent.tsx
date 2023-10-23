import { Spinner } from "@nextui-org/react";
import React, { ReactNode } from "react";
import ResponseActions from "./ResponseActions";

const LoadingComponent = ({
  error,
  loading,
  children,
}: {
  error: string;
  loading: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 w-screen h-screen  pb-72 justify-center items-center ">
      <ResponseActions error={error} loading={loading} />
      {children}
    </div>
  );
};

export default LoadingComponent;
