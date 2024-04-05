"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import authService from "@/firebase/authService";
import { User } from "firebase/auth";

export default function AuthButton(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  //TODO: Use redux to fetch if user is logged in
  useEffect(() => {
    async function getUser() {
      return await authService.getCurrentUser((user) => {
        user && setCurrentUser(user);
      });
    }
    getUser();
  }, []);
  const handleLogout = async (): Promise<void> => {
    await authService.logout();
  };
  return currentUser ? (
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
