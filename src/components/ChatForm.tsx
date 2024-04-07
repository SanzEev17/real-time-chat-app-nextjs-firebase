"use client"
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

const ChatForm = () => {
  return (
    <div className="px-3 py-2">
      <div className="relative">
        <Input placeholder="Aa" className="rounded-full bg-accent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-3 rounded-full hover:text-primary"
          onClick={() => {
            console.log("abc");
          }}
        >
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default ChatForm;
