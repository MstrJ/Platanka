import React from "react";
import PostType from "../../types/post";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
export const PostCard = ({
  post,
  isAccess,
}: {
  post: PostType;
  isAccess: boolean;
}) => {
  return (
    <>
      <Card shadow="md" isPressable className="break-inside-avoid">
        <CardBody className="overflow-visible p-0">
          <Image
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
          />
        </CardBody>
        <CardFooter className="justify-between flex flex-row text-left gap-2 max-w-md h-fit  -my-0">
          <div className="flex flex-col">
            <b className="md:text-base">{post.title}</b>
            <div className="md:text-base">{post.category}</div>
          </div>
          <p className="md:text-base">{post.price}ZŁ</p>
        </CardFooter>
      </Card>
    </>
  );
};
