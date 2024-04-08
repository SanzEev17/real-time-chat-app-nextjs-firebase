"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { DarkModeToggle } from "./DarkModeToggle";
import LogoutBtn from "./LogoutBtn";

export default function AuthButton(): JSX.Element {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  return isAuthenticated ? (
    <div className="hidden md:block">
      <LogoutBtn />
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
