"use client";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  if (!isAuthenticated) {
    router.replace("/account/login");
    return null;
  }
  return { children };
}
