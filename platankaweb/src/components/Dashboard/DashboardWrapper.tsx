import React, { ReactNode } from "react";
import Sidebar from "./Sidebar/page";

const DashboardWrapper = ({ children }: { children?: ReactNode }) => {
  //TODO: change styles!!!
  return (
    <div className="flex flex-row basis-1  ">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardWrapper;
