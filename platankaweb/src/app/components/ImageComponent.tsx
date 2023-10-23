import React from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

const ImageComponent = ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  return (
    <Image
      alt=""
      height={700}
      width={700}
      style={{ filter: `${isActive ? "" : "grayscale(100%)"}` }}
      isBlurred={isActive}
      className="rounded-none rounded-t-lg"
      as={NextImage}
      src={`${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/Images/${id}`}
    />
  );
};

export default ImageComponent;
