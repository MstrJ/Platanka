import { Spinner } from "@nextui-org/react";
import React from "react";
import ErrorCard from "./Cards/ErrorCard";

const ResponseActions = ({
  error,
  status,
  loading,
}: {
  error: string;
  status?: string;
  loading: boolean;
}) => {
  const message =
    status == "delayed"
      ? "Ta odpowiedź trwa dłużej niż zwykle. nadal działa w tle."
      : "";
  return (
    <>
      {loading ? (
        <Spinner size="lg" label={message} />
      ) : error ? (
        <ErrorCard error={error} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ResponseActions;
