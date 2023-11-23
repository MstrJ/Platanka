import React from "react";

const ErrorCard = ({ error }: { error: string }) => {
  return (
    <div className="px-4 py-2 bg-red-500 text-red-50 rounded-lg">{error}</div>
  );
};

export default ErrorCard;
