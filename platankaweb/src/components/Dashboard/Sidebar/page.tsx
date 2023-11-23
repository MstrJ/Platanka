"use client";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const links = ["posts", "images", "categories", "accounts"];
  const names = ["posty", "zdjęcia", "kategorie", "konta"];

  const pathname = usePathname();

  return (
    <div className=" sidebar pt-12">
      {links.map((x, i) => {
        return (
          <Link as={NextLink} href={`/dashboard/${x}`} key={x}>
            <div
              className={`hover:text-primary/90 duration-300  ${
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

export default Sidebar;
