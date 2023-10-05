"use client";
import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeSwitch } from "../ThemeSwitcher";
import MyNavbarItem from "./MyNavbarItem";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const currentPage = usePathname();
  const menuItems = ["Home", "Posts", "Dashboard", "Log In"];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <div className="font-platanka text-2xl">PlątAnka</div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <MyNavbarItem currentPage={currentPage} link="/" name="Home" />
        <MyNavbarItem currentPage={currentPage} link="/posts" name="Posts" />
        <MyNavbarItem
          currentPage={currentPage}
          link="/dashboard"
          name="Dashboard"
        />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="sm:flex flex-row gap-2">
          <ThemeSwitch />
          <div className="hidden sm:flex">
            <Button as={Link} color="primary" href="#" variant="flat">
              Log In
            </Button>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
