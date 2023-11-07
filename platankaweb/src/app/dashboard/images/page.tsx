import { getImages } from "@/actions/server-actions";
import DashboardComponent from "@/components/DashboardComponent";
import Image from "next/image";
import React from "react";

const Images = async () => {
  const images: Image[] | null = await getImages();
  return (
    <DashboardComponent>
      <div className=" columns-2">
        {images ? (
          images?.map((x) => {
            const imgSrc = `data:image/jpeg;base64,${x.data}`;
            return (
              <div className="flex flex-row gap-2" key={x._Id}>
                <div>{x.description}</div>
                <Image
                  src={imgSrc}
                  alt={x.description}
                  width={400}
                  height={400}
                />
              </div>
            );
          })
        ) : (
          <div>Nic tu ni ma :)</div>
        )}
      </div>
    </DashboardComponent>
  );
};

export default Images;
