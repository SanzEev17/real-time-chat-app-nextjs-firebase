import { UserMessage } from "@/types";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

const MessageSent = ({
  messageData,
  friendPhotoURL,
  lastSeenMessage,
}: {
  messageData: UserMessage;
  friendPhotoURL: string;
  lastSeenMessage: UserMessage;
}) => {
  return (
    <div className="w-full flex flex-col justify-end items-end gap-1">
      <div className="flex items-center justify-end gap-3">
        <div className="flex flex-col border rounded-3xl bg-primary text-white">
          {messageData.message && (
            <span className="px-3 py-2 text-center">{messageData.message}</span>
          )}
          {messageData.photoURL && (
            <div className="w-full md:w-48 relative">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={messageData.photoURL}
                  alt={messageData.message}
                  fill
                  sizes="(max-width: 768px) 30vw, (min-width: 768px) 40%"
                  quality={40}
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </div>
      {lastSeenMessage === messageData && (
        <Image
          src={friendPhotoURL}
          alt="seen"
          width={15}
          height={15}
          sizes="(max-width: 768px) 15px, (min-width: 768px) 15px"
          quality={30}
          className="rounded-full"
        />
      )}{" "}
    </div>
  );
};

export default MessageSent;
