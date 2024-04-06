"use client";
import Header from "@/components/Header/Header";
import authService from "@/firebase/authService";
import { login, logout } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuthState = async () => {
      return await authService.getCurrentUser((user) => {
        if (user) {
          const { uid, email, displayName } = user;
          dispatch(login({ uid, email, displayName }));
        } else {
          dispatch(logout());
        }
        setLoading(false);
      });
    };
    getAuthState();
    return () => {
      getAuthState();
    };
  }, [dispatch]);

  if (loading) {
    return null;
  }
  return (
    <main className="h-dvh flex flex-col">
      <Header />
      {children}
    </main>
  );
}
