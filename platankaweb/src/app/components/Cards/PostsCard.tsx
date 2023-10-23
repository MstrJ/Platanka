import React from "react";
import PostType from "../../types/post";
import ImageComponent from "../ImageComponent";

const PostsCard = ({ post }: { post: PostType }) => {
  return (
    <div className="flex flex-col gap-2  bg-foreground/5 rounded-lg">
      <div className="flex justify-center w-fit ">
        <ImageComponent id={post.imagesIds[0]} isActive={post.active} />
      </div>
      <div className="px-3 pb-2">
        <div className="text-4xl font-bold">{post.title}</div>
        <div className="text-2xl">{post.category}</div>
        <div className="text-xl">{post.price} PLN</div>
        <div className="text-[8px]">{post._Id}</div>
      </div>
    </div>
  );
};

export default PostsCard;
