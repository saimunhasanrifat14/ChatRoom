import React from "react";
import Navber from "./Navber";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
};

export default RootLayout;
