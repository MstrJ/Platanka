import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const MyNavbarItem = (props: {
  currentPage: string;
  link: string;
  name: string;
}) => {
  return (
    <NavbarItem className="lg:flex" isActive={props.currentPage === props.link}>
      <Link href={props.link}>
        <div
          className={`${
            props.currentPage === props.link ? "text-fuchsia-400" : ""
          }`}
        >
          {props.name}
        </div>
      </Link>
    </NavbarItem>
  );
};

export default MyNavbarItem;
