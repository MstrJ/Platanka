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
            props.currentPage === props.link ? "text-primary-600" : ""
          } hover:text-primary duration-250 font-medium`}
        >
          {props.name}
        </div>
      </Link>
    </NavbarItem>
  );
};

export default MyNavbarItem;
