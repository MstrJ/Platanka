"use server";

import { revalidatePath } from "next/cache";

export const getImages = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/Images`,
      {
        method: "GET",
        cache: "no-cache",
        next: {
          tags: ["images"],
        },
      }
    );
    revalidatePath("/dashboard/images");

    if (!res.ok) return null;
    const json = (await res.json()) as Image[];

    return json;
  } catch (e: any) {
    return null;
  }
};
