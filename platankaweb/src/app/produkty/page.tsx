"use client";
import PostType from "../types/post";
import useFetch from "../hooks/useFetch";
import { Button, Spinner } from "@nextui-org/react";
import LoadingComponent from "../components/LoadingComponent";
import PostsCard from "../components/Cards/PostsCard";

const Produkty = () => {
  // TODO: change spinner to skeleton
  const {
    loading,
    data,
    getData,
    error,
  }: {
    loading: boolean;
    data: PostType[] | null;
    getData: any;
    error: string;
  } = useFetch<PostType[]>({
    urlEnd: `Posts`,
  });

  return (
    <>
      {/* //TODO: buttons add new post only for permission >=1 */}
      {data ? (
        <div className="grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center mt-8  mx-4 items-center">
          {data.map((post) => {
            return <PostsCard key={post._Id} post={post} />;
          })}
        </div>
      ) : error ? (
        <LoadingComponent error={error} loading={loading}>
          <Button
            variant="solid"
            color="primary"
            onClick={() => getData()}
            isDisabled={loading}
          >
            Odśwież Dane
          </Button>
        </LoadingComponent>
      ) : (
        <div>Nie ma aktualnie zadnych aktywnych produktów</div>
      )}
    </>
  );
};

export default Produkty;
