"use client"
import Header from "@/components/Header/Header";
import authService from "@/firebase/authService";
import { useEffect } from "react";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Use redux to set global state for user data
  // useEffect(()=>{
  //   async function getUser() {
  //     const currentUser = await authService.getCurrentUser();
  //   }
  //   getUser()
  // }, [])
  return (
    <>
      <Header />
      {children}
    </>
  );
}
