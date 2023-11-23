import React, { ReactNode } from "react";
import accountBackground from "public/images/flowers2.png";

const AccountTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="text-foreground flex flex-row bg-cover justify-center items-center bg-size bg-center bg-no-repeat w-screen h-screen light"
      style={{ backgroundImage: `url(${accountBackground.src})` }}
    >
      {children}
    </div>
  );
};

export default AccountTemplate;
