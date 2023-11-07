import React from "react";
import GoogleButton from "../GoogleButton";
import { Divider } from "@nextui-org/react";

const ProviderCard = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <GoogleButton />
      <div className="flex flex-row ">
        <div className="flex-1 h-0.5 border-b w-max border-gray-400 mr-1 my-2"></div>
        <span className="text-gray-500 text-sm">
          Lub za pomocą emaila i hasła
        </span>
        <div className="flex-1 h-0.5 border-b w-max border-gray-400 -mr-1 ml-1 my-2"></div>
      </div>
    </div>
  );
};

export default ProviderCard;
