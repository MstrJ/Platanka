import { Spinner } from "@nextui-org/react";
import React from "react";
import ErrorCard from "./Cards/ErrorCard";

const ResponseActions = ({
  error,
  loading,
}: {
  error: string;
  loading: boolean;
}) => {
  return (
    <>
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <ErrorCard error={error} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ResponseActions;
