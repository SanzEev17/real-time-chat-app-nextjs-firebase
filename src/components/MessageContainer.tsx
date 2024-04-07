import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";

const MessageContainer = () => {
  return (
    <ScrollArea className="p-4 h-full overflow-y-auto">
      <MessageReceived />
      <MessageReceived />
      <MessageSent />
      <MessageSent />
      <MessageReceived />
      <MessageSent />
    </ScrollArea>
  );
};

export default MessageContainer;
