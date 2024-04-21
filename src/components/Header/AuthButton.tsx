"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { DarkModeToggle } from "./DarkModeToggle";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";

export default function AuthButton(): JSX.Element {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const userData = useAppSelector((state) => state.authReducer.userData);
  return isAuthenticated && userData ? (
    <div className="hidden md:flex gap-2 justify-center items-center">
      <Link
        href={`/profile/${userData.uid}`}
        className="flex gap-2 justify-center items-center hover:text-primary"
      >
        <Image
          src={userData.photoURL}
          alt={userData.name}
          height={40}
          width={40}
          quality={70}
          className="rounded-full"
        />
        <span className="font-semibold">{userData.name}</span>
      </Link>
      <DarkModeToggle />
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
