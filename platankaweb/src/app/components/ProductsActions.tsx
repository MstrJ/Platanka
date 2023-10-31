"use client";
import { Button, cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ProductsActions = ({ className }: { className?: any }) => {
  return (
    <div className={`mt-auto ${cn(className)}`}>
      <Button
        color="warning"
        variant="flat"
        className="w-32"
        as={Link}
        href="/dashboard/posts"
      >
        Zarzadaj Postami
      </Button>
    </div>
  );
};

export default ProductsActions;
