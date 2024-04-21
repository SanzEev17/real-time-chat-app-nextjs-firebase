"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import chatService from "@/firebase/chatService";
import userService from "@/firebase/userService";
import { ChatListItem } from "@/types";
import ChatListCard from "./ChatListCard";
import { Input } from "../ui/input";

const sortByLatestTimestamp = (chatA: ChatListItem, chatB: ChatListItem) => {
  //* Get the latest timestamps from each chat
  const latestTimestampA =
    chatA.messages.length > 0
      ? chatA.messages[chatA.messages.length - 1].timestamp
      : 0;
  const latestTimestampB =
    chatB.messages.length > 0
      ? chatB.messages[chatB.messages.length - 1].timestamp
      : 0;

  //* Sort in descending order based on the latest timestamp
  return latestTimestampB - latestTimestampA;
};

const ChatList = () => {
  const userId = useAppSelector((state) => state.authReducer.userData?.uid);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredChats, setFilteredChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);

  //* Listens to changes in search bar
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

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
        const sortedChatList = chatList.sort(sortByLatestTimestamp);
        //* Update the state with the latest chats when changes occur
        setChatList(sortedChatList);
        setLoading(false);
      });
    };
    const unsubscribe = getChatList();

    //* Clean up the subscription when the component unmounts
    return () => {
      unsubscribe;
    };
  }, [userId]);

  useEffect(() => {
    //* Filter allChats based on search input
    const filtered = chatList.filter((chat) =>
      chat.friendData.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [chatList, searchInput]);

  return (
    <div className="lg:col-span-1 h-full flex flex-col gap-2 overflow-y-auto">
      <div className="px-6 py-3 shadow-lg">
        <h1 className="text-3xl z-10 font-bold">Chats</h1>
      </div>

      {/* //* Chat Search */}
      <div className="px-3">
        <Input
          onChange={handleInputChange}
          placeholder="Search"
          className="rounded-full bg-primary-foreground"
        />
      </div>

      <ScrollArea className="px-3">
        {loading ? (
          <div>Loading chats...</div>
        ) : filteredChats && filteredChats.length > 0 ? (
          filteredChats.map((chatListData) => (
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
