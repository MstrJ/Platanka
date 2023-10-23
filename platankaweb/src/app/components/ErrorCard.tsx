import React from "react";

const ErrorCard = (props: { error: string }) => {
  return (
    <div className="px-4 py-2 bg-red-200 text-red-600 rounded-lg">
      {props.error}
    </div>
  );
};

export default ErrorCard;
