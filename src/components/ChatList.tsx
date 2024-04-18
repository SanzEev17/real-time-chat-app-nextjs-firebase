"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import chatService from "@/firebase/chatService";
import userService from "@/firebase/userService";
import { ChatListItem } from "@/types";
import ChatListCard from "./ChatListCard";

const ChatList = () => {
  const userId = useAppSelector((state) => state.authReducer.userData?.uid);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);

  useEffect(() => {
    const getChatList = async () => {
      if (!userId) return;
      return await chatService.getChatList(userId, async (userChats) => {
        //* Map through each chat to fetch friend data
        const allChats = userChats.map(async (chat) => {
          const friendId = chat.participants.find(
            (user: string) => user !== userId
          );
          const friendData = await userService.getUserData(friendId);
          return { friendData, ...chat };
        });
        const chatList = await Promise.all(allChats);
        //* Update the state with the latest chats when changes occur
        setChatList(chatList);
      });
    };
    const unsubscribe = getChatList();

    //* Clean up the subscription when the component unmounts
    return () => {
      unsubscribe;
    };
  }, [userId]);

  return (
    <div className="lg:col-span-1 h-full flex flex-col gap-2 overflow-y-auto">
      <div className="px-6 py-3 shadow-lg">
        <h1 className="text-3xl z-10 font-bold">Chats</h1>
      </div>
      <ScrollArea className="px-3">
        {chatList && chatList.length > 0 ? (
          chatList.map((chatListData) => (
            // chatListData.messages.length > 0 &&
            <ChatListCard
              key={chatListData.chatId}
              chatListData={chatListData}
            />
          ))
        ) : (
          <div className="px-3">No chats to show...</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
