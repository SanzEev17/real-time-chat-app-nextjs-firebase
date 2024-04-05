import React from "react";
import AuthButton from "./AuthButton";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed w-full px-14 lg:px-36 py-4 flex justify-between items-center bg-primary-foreground shadow-md">
      <Link href="/" className="text-2xl font-bold">Guff Gaff</Link>
      <AuthButton />
    </div>
  );
};

export default Header;
