import React, { ReactNode } from "react";
import DashboardNavbar from "./DashboardNavbar/page";

const DashboardComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-row ">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardComponent;
