import { Skeleton } from "@nextui-org/react";
import React from "react";

//TODO: better name

const ImageDashboardSkeleton = () => {
  return (
    <Skeleton className="rounded-lg">
      <div className="imgPreview" />
    </Skeleton>
  );
};

export default ImageDashboardSkeleton;
