"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import authService from "@/firebase/authService";
import { useAppSelector } from "@/redux/store";

export default function AuthButton(): JSX.Element {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const handleLogout = async (): Promise<void> => {
    await authService.logout();
  };
  return isAuthenticated ? (
    <div className="hidden md:flex gap-4">
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <div className="flex gap-4">
      <Button asChild>
        <Link href={`/account/signup`}>Signup</Link>
      </Button>
    </div>
  );
}
