import React from "react";
import { Button } from "../ui/button";
import AuthButton from "./AuthButton";

const Header = () => {
  return (
    <div className="fixed w-full px-14 lg:px-36 py-4 flex justify-between items-center bg-accent shadow-md">
      <h1 className="text-2xl font-bold">Guff Gaff</h1>
      <AuthButton />
    </div>
  );
};

export default Header;
