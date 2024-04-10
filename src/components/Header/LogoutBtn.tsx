import React from "react";
import { Button } from "../ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import authService from "@/firebase/authService";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    await authService.logout();
  };
  return (
    <div className="flex gap-4">
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
      <DarkModeToggle />
    </div>
  );
};

export default LogoutBtn;
