import React from "react";
import Image from "next/image";
import heroImg from "../../../public/images/hero.jpg";
import { UserMessage } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";

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
  );
};

export default MessageReceived;
