"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal, Image as ImageIcon } from "lucide-react";

const MessageFormInput = () => {
  return (
    <div className="px-3 py-2 flex items-center gap-3">
      <Button variant="ghost" size="icon" className="text-primary hover:text-primary">
        <ImageIcon />
      </Button>
      <div className="relative w-full">
        <Input placeholder="Aa" className="rounded-full bg-accent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-3 rounded-full hover:text-primary"
          onClick={() => {
            
          }}
        >
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default MessageFormInput;
