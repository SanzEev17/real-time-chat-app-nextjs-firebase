import { setCurrentChatFriend } from "@/redux/features/chatFriendSlice";
import { useAppSelector } from "@/redux/store";
import { ChatListItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ChatListCard = ({ chatListData }: { chatListData: ChatListItem }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const chatId = useAppSelector((state) => state.chatFriendReducer.chatId);

  useEffect(() => {
    //* Set chatId based on chatId in url and chatListData.chatId
    setIsActive(chatId === chatListData.chatId);
  }, [chatId, chatListData.chatId]);

  useEffect(() => {
    //* If this is active card store friendData to redux state
    isActive && dispatch(setCurrentChatFriend(chatListData.friendData));
  }, [dispatch, isActive, chatListData.friendData]);

  //* Gets the last sent message's data
  const lastMessageData = chatListData.messages.slice(-1)[0];

  return (
    <Link
      href={`/chats/${chatListData.chatId}`}
      className={`${
        isActive && "bg-accent"
      } px-3 py-3 my-1 flex items-center gap-4 rounded-md hover:bg-accent`}
    >
      <div className="relative rounded-full overflow-hidden min-w-11 min-h-11">
        <Image
          src={chatListData.friendData.photoURL}
          alt={chatListData.friendData.name}
          fill
          quality={20}
          sizes="(max-width: 1200px) 50vw, 33vw"
          className=""
        />
      </div>
      <div>
        <h1 className="font-bold text-base">{chatListData.friendData.name}</h1>
        <p className="text-sm line-clamp-1 text-muted-foreground font-semibold">
          <span>
            {lastMessageData.senderId !== chatListData.friendData.uid &&
              "You: "}
          </span>
          <span>
            {chatListData.messages.length > 0 && lastMessageData.message}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ChatListCard;
