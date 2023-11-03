import { cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const PlatankaLink = ({ className }: { className?: any }) => {
  return (
    <div className="mt-8">
      <Link
        href="/"
        className={`text-primary-400 font-platanka text-[28px] ${cn(
          className
        )}`}
      >
        PlątAnka
      </Link>
    </div>
  );
};

export default PlatankaLink;
