"use client";
import p1 from "public/images/kieliszek.jpeg";
import p2 from "public/images/zegar.jpeg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="">
      <Image src={p1.src} alt={"p1"} height={200} width={200} />
      <Image src={p2.src} alt={"p2"} height={200} width={200} />
    </div>
  );
}
