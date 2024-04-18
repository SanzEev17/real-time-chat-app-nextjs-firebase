import React from "react";
import Image from "next/image";
import heroImg from "../../../public/images/hero.jpg";
import { UserMessage } from "@/types";

const MessageReceived = ({
  messageData,
  friendPhotoURL,
}: {
  messageData: UserMessage;
  friendPhotoURL: string;
}) => {
  return (
    <div className="py-1.5 flex items-center gap-3">
      <div className="relative w-10 h-10 overflow-hidden rounded-full">
        <Image
          src={friendPhotoURL}
          alt={friendPhotoURL}
          fill
          quality={20}
          sizes="(max-width: 1200px) 10vw"
        />
      </div>
      <div className="px-3 py-2 border rounded-full bg-secondary">
        {messageData.message}
      </div>
    </div>
  );
};

export default MessageReceived;
