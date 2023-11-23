"use client";
import React, { useEffect, useState } from "react";
import PostType from "../../types/post";
import useFetch from "../../hooks/useFetch";
import LoadingComponent from "../Loading/LoadingComponent";
import { Button } from "@nextui-org/react";
import PostsComponent from "./PostsComponent";
import { getSession, useSession } from "next-auth/react";
import CategoriesComponents from "../Categories/CategoriesComponents";
import { getServerSession } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import ProductsActions from "./ProductsActions";
import { FetchType } from "@/types/fetch";

const ProductsComponent = () => {
  const { data: session } = useSession();

  const [isAccess, setIsAccess] = useState<boolean>(false);
  const [selected, setSelected] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("true");
  const [link, setLink] = useState(`Posts?active=${selectedRadio}`);
  const {
    loading,
    data: posts,
    getData,
    error,
    status,
  }: FetchType<PostType[]> = useFetch<PostType[]>({
    urlEnd: link,
  });

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  useEffect(() => {
    setIsAccess(session?.user.permission.level! >= 1 ? true : false);
  }, []);

  useEffect(() => {
    const cat =
      selected.length > 0
        ? `&category=${selected.join("&category=").toLowerCase()}`
        : "";

    const act =
      selectedRadio == ""
        ? ""
        : selectedRadio == "true"
        ? "active=true"
        : "active=false";

    // params.set("category", selected.join("&category="));
    // if (selected.length === 0) params.delete("category");

    // const ac: string | null = params.get("active");
    // const a = ac ? (ac === "false" ? false : true) : true;

    // if (!active) params.set("active", `${a}`);
    // else params.set("active", `${active}`);

    // if (active) params.delete("active");
    // const act = !active ? "&active=false" : "";

    setLink(`Posts?${act}${cat}`);
    getData();

    // router.push(`/produkty?${params.toString()}`);
  }, [selected, selectedRadio]);

  return (
    <div className="lg:mx-0 md:mx-10 mx-6 my-0 h-true">
      <div className="flex flex-row gap-12 justify-left">
        <CategoriesComponents
          loading={loading}
          selected={selected}
          setSelected={setSelected}
          selectedRadio={selectedRadio}
          setSelectedRadio={setSelectedRadio}
        />
        {!error && isAccess && <ProductsActions className={"ml-auto"} />}
      </div>

      {posts && posts?.length > 0 ? (
        <>
          <PostsComponent posts={posts} isAccess={isAccess} />
        </>
      ) : error || loading ? (
        <LoadingComponent error={error} loading={loading} status={status}>
          <Button
            variant="ghost"
            color="primary"
            className={`${loading ? "hidden" : ""}`}
            onClick={async () => await getData()}
            isDisabled={loading}
          >
            Odśwież Dane
          </Button>
        </LoadingComponent>
      ) : (
        <div className="flex text-xl justify-center items-center mt-52">
          <div>Nie ma aktualnie aktywnych produktów.</div>
        </div>
      )}
    </div>
  );
};

export default ProductsComponent;
