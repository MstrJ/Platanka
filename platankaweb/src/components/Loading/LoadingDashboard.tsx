import React from "react";
import DashboardWrapper from "../Dashboard/DashboardWrapper";
import { Spinner } from "@nextui-org/react";

const LoadingDashboard = () => {
  return (
    <DashboardWrapper>
      <Spinner size="lg" color="primary" className="w-screen " />
    </DashboardWrapper>
  );
};

export default LoadingDashboard;
