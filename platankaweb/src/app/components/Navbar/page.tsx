"use client";
import React, { useEffect } from "react";
import {
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
import AccountBtn from "./accountBtn";
import { useSession } from "next-auth/react";
import { FaBeer, FaFacebook, FaFacebookSquare } from "react-icons/fa";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const currentPage = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    "O Mnie",
    "Dostępne Produkty",
    `${session?.user.permission.role == "admin" ? "Dashboard" : ""}`,
    `${session ? "Wyloguj" : "Zaloguj"}`,
  ];

  const menuItemsHref = ["/omnie", "/produkty", "/dashboard", "/btn"];

  const notShowPages = [
    "/account/login",
    "/account/register",
    "/account/confirmation",
    "/account/reset",
  ];

  for (let i = 0; i < notShowPages.length; i++) {
    if (currentPage == notShowPages[i]) return <></>;
  }

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
          "data-[active=true]:after:h-[3px]",
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
            <div className="font-platanka text-primary-500 text-2xl hover:text-primary-600 duration-250">
              PlątAnka
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <MyNavbarItem currentPage={currentPage} link="/omnie" name="O Mnie" />
        <MyNavbarItem
          currentPage={currentPage}
          link="/produkty"
          name="Dostępne Produkty"
        />
        {session?.user.permission.role == "admin" && (
          <MyNavbarItem
            currentPage={currentPage}
            link="/dashboard"
            name="Dashboard"
          />
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="sm:flex flex-row gap-4">
          <Link
            className="text-2xl mr-0.5 hover:cursor-pointer"
            href="https://www.facebook.com/platanka"
          >
            <FaFacebookSquare />
          </Link>
          <ThemeSwitch />
          <div className="hidden sm:flex">
            <AccountBtn />
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {menuItemsHref[index] !== "/btn" ? (
              <Link className="w-full" href={menuItemsHref[index]}>
                <div
                  className={`${
                    currentPage.startsWith(menuItemsHref[index])
                      ? "text-primary"
                      : ""
                  }`}
                >
                  {item}
                </div>
              </Link>
            ) : (
              <AccountBtn />
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
