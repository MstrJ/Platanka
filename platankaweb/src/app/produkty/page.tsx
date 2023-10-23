"use client";
import PostType from "../types/post";
import useFetch from "../hooks/useFetch";
import { Progress } from "@nextui-org/react";
import { useEffect } from "react";

const Produkty = () => {
  const { loading, data } = useFetch<PostType[]>({
    urlEnd: `Posts`,
  });

  return (
    <>
      {loading ? (
        <div className=" w-screen h-screen flex justify-center items-start pt-16">
          <Progress
            size="lg"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md "
          />
        </div>
      ) : data != null ? (
        <div>
          {data.map((x: PostType) => {
            return <div key={x._Id}>{x.category}</div>;
          })}
        </div>
      ) : (
        <div>nic tu nie ma</div>
      )}
    </>
  );
};

export default Produkty;
