"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutBtn from "./LogoutBtn";
import { Menu } from "lucide-react";

const NavItems = () => {
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navItems = [
    { title: "My Profile", slug: "profile" },
    { title: "Add Friends", slug: "friends/add" },
    { title: "Friend Requests", slug: "friends/requests" },
  ];
  return (
    isAuthenticated && (
      <>
        {/* Desktop View */}
        <div className="hidden p-1 border rounded-md md:flex flex-row justify-center items-center gap-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item.slug}`}
              className={`${
                pathname === `/${item.slug}` && "bg-accent"
              } hover:bg-accent text-sm font-semibold px-3 py-1.5 rounded-md`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        {/* Mobile View  */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {navItems.map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${item.slug}`}
                      className={`${
                        pathname === `/${item.slug}` && "text-active"
                      } w-full`}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
              ))}
              <DropdownMenuItem className="flex justify-between">
                <LogoutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    )
  );
};

export default NavItems;
