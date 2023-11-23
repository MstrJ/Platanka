import React from "react";
import PostType from "../../types/post";
import { PostCard } from "../Cards/PostCard";

const PostsComponent = ({
  posts,
  isAccess,
}: {
  posts: PostType[];
  isAccess: boolean;
}) => {
  // TODO: good or bad? jezeli posts jest wiecej niz x to columns-3 itp
  return (
    <>
      <div className="mt-12 columns-1 md:columns-3 md:gap-6 md:space-y-6  sm:columns-2 gap-4 space-y-4   ">
        {posts.map((post) => {
          return <PostCard key={post._Id} post={post} isAccess={isAccess} />;
        })}
      </div>
    </>
  );
};

export default PostsComponent;
