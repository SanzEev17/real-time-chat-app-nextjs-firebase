"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import authService from "@/firebase/authService";
import { useAppSelector } from "@/redux/store";
import { DarkModeToggle } from "./DarkModeToggle";

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
      <DarkModeToggle />
    </div>
  ) : (
    <div className="flex gap-4">
      <Button variant={"outline"} asChild>
        <Link href={`/account/signup`}>Signup</Link>
      </Button>
      <DarkModeToggle />
    </div>
  );
}
