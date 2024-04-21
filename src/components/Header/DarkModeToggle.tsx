"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  return theme === "light" ? (
    <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
      <Sun className="h-5 w-5 rotate-0" />
    </Button>
  ) : (
    <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
      <Moon className="h-5 w-5" />
    </Button>
  );
}
