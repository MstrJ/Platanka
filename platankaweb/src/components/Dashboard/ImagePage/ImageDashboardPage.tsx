import React from "react";
import { getImages } from "@/actions/server-actions";
import ImageDashboardComponent from "./ImageDashboardComponent";
const ImageDashboardPage = async () => {
  const images: Image[] | null = await getImages();

  return <ImageDashboardComponent images={images} />;
};

export default ImageDashboardPage;
