import {
  setChatId,
  setCurrentChatFriend,
} from "@/redux/features/chatFriendSlice";
import { ChatListItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ChatListCard = ({ chatListData }: { chatListData: ChatListItem }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setChatId(chatListData.chatId));
    dispatch(setCurrentChatFriend(chatListData.friendData));
  };

  return (
    <Link
      href={`/chats/${chatListData.friendData.uid}`}
      onClick={handleClick}
      className="px-3 py-2 flex items-center gap-4 rounded-md hover:bg-accent"
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
        <p className="text-sm line-clamp-1">
          {chatListData.messages.length > 0 &&
            chatListData.messages.slice(-1)[0].message}
        </p>
      </div>
    </Link>
  );
};

export default ChatListCard;
