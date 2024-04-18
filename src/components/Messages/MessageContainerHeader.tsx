import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";

const MessageContainerHeader = () => {
  const friendData = useAppSelector(
    (state) => state.chatFriendReducer.friendData
  );
  return (
    friendData && (
      <div className="py-2 shadow-lg w-full h-fit">
        <div className="px-4 flex gap-3">
          <div className="relative w-11 h-11 overflow-hidden rounded-full">
            <Image
              src={friendData?.photoURL}
              alt={friendData?.name}
              fill
              quality={20}
              sizes="(max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div>
            <h1 className="font-bold text-base">{friendData?.name}</h1>
            <p className="text-sm line-clamp-1 text-muted-foreground">
              Active now
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default MessageContainerHeader;
