import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import React from "react";

const ImageCard = async ({ image }: { image: Image }) => {
  const imgSrc = `data:image/jpeg;base64,${image.data}`;
  return (
    <div>
      <Image
        as={NextImage}
        width={320}
        height={320}
        className="imgPreview"
        alt={image.fileName}
        src={imgSrc}
      />
      {/* OR */}

      {/* <Image
        as={NextImage}
        shadow="sm"
        radius="lg"
        width={600}
        height={600}
        priority
        alt="img"
        className="w-full object-cover relative "
        style={{ filter: `${post.active ? "" : "grayscale(100%)"}` }}
        src={`${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/Images/${post.imagesIds[0]}`}
      /> */}
    </div>
  );
};

export default ImageCard;
