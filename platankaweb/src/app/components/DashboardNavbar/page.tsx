"use client";
import { Divider, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const DashboardNavbar = () => {
  const links = ["posts", "images", "categories", "accounts"];
  const names = ["posty", "zdjęcia", "kategorie", "konta"];

  const pathname = usePathname();
  return (
    <div className="flex flex-col  gap-10 h-full basis-1/12 pt-12 items-left  ml-4 ">
      {links.map((x, i) => {
        return (
          <div key={x} className="flex flex-col gap-8">
            {/* {i != 0 && <Divider />} */}
            <Link
              className={`${
                pathname === `/dashboard/${x}` ? "" : "text-foreground"
              } capitalize text-2xl`}
              as={NextLink}
              href={`/dashboard/${x}`}
            >
              {names[i]}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardNavbar;
