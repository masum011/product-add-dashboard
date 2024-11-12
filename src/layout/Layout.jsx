import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import SideBar from "./SideBar";
function Layout() {
  return (
    <div className="root-layout">
      <div className="layout">
          <SideBar />
        <main>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Outlet />
        </Suspense>
        </main>
      </div>
    </div>
  );
}

export default Layout;