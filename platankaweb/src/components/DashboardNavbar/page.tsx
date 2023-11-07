"use client";
import { Divider, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardNavbar = () => {
  const links = ["posts", "images", "categories", "accounts"];
  const names = ["posty", "zdjęcia", "kategorie", "konta"];

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-10  h-[90vh] basis-1/12 pt-12 items-left ml-4 border-r-2 border-black ">
      {links.map((x, i) => {
        return (
          <Link as={NextLink} href={`/dashboard/${x}`} key={x}>
            <div
              className={`hover:text-primary/90 duration-300 ${
                pathname === `/dashboard/${x}`
                  ? "border-t-primary border-0-3   font-medium   rounded-xs"
                  : "text-foreground"
              } capitalize text-lg`}
            >
              {names[i]}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardNavbar;
