import React from "react";
import Image from "next/image";
import { UserMessage } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";

const MessageReceived = ({
  messageData,
  friendPhotoURL,
  lastSeenMessage,
}: {
  messageData: UserMessage;
  friendPhotoURL: string;
  lastSeenMessage: UserMessage;
}) => {
  return (
    <div className="w-full flex justify-between items-end">
      <div className="w-2/3 py-1.5 flex items-center gap-3">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <Image
            src={friendPhotoURL}
            alt={friendPhotoURL}
            fill
            quality={20}
            sizes="(max-width: 1200px) 10vw"
          />
        </div>
        <div className="flex flex-col border rounded-3xl bg-secondary overflow-hidden">
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
      )}
    </div>
  );
};

export default MessageReceived;
