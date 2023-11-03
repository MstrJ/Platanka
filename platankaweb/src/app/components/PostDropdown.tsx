import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const PostDropdown = ({ className }: { className: string }) => {
  return (
    <div className={twMerge(className)}>
      <Dropdown>
        <DropdownTrigger>
          <FontAwesomeIcon icon={faBars} />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => alert(key)}
        >
          <DropdownItem key="copy">Kopiuj link</DropdownItem>
          <DropdownItem key="edit">Edytuj Produkt</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Usuń produkt
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PostDropdown;
