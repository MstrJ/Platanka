import ImageCard from "@/components/Cards/ImageCard";
import ImageDashboardSkeleton from "@/components/Skeletons/ImageDashboardSkeleton";
import React, { Suspense } from "react";

const ImageDashboardComponent = ({ images }: { images: Image[] | null }) => {
  return (
    <div className="">
      {Array.isArray(images) && images ? (
        <div className="  columns-4 gap-8">
          {images.map((img) => {
            return (
              <Suspense fallback={<ImageDashboardSkeleton />} key={img._Id}>
                <ImageCard image={img} />
              </Suspense>
            );
          })}
        </div>
      ) : (
        <div>Nic tu nie ma</div>
      )}
    </div>
  );
};

export default ImageDashboardComponent;
