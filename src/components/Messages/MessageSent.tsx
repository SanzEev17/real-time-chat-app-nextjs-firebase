import { UserMessage } from "@/types";
import React from "react";

const MessageSent = ({ messageData }: { messageData: UserMessage }) => {
  return (
    <div className="py-1.5 flex items-center justify-end gap-3">
      <div className="w-fit px-3 py-2 border rounded-full bg-primary text-white">
        {messageData.message}
      </div>
    </div>
  );
};

export default MessageSent;
