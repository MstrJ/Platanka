import React, { ReactNode } from "react";
import ResponseActions from "./ResponseActions";

const LoadingComponent = ({
  error,
  loading,
  status,
  children,
}: {
  error: string;
  loading: boolean;
  status?: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 w-screen h-screen  pb-72 justify-center items-center ">
      <ResponseActions error={error} loading={loading} status={status} />
      {children}
    </div>
  );
};

export default LoadingComponent;
