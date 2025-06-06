"use client";

import { logout } from "@/app/actions/auth-actions";
import React from "react";

const LogoutBtn = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <span
      onClick={handleLogout}
      className="inline-block cursor-pointer text-destructive"
    >
      Logout
    </span>
  );
};

export default LogoutBtn;
