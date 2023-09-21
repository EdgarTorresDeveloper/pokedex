"use client";
import React from "react";
import { Sidebar } from "./global/sidebar/Sidebar";
import { NavbarUser } from "./global/navbar/Navbar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="component-layout">
      <Sidebar
        user={"ASHK123"}
        level={1}
        descripcion="Work hard on your test"
      />
      <NavbarUser />
      <div className="content">
        {children}
      </div>
    </div>
  );
}
