"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import heroImg from "../../public/images/hero.jpg";
import { ScrollArea } from "./ui/scroll-area";
import { useAppSelector } from "@/redux/store";
import chatService from "@/firebase/chatService";
import userService from "@/firebase/userService";
import { ChatListItem, UserData } from "@/types";

const ChatList = () => {
  const userId = useAppSelector((state) => state.authReducer.userData?.uid);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);

  useEffect(() => {
    // Subscribe to real-time updates for chats associated with the current user
    const getChatList = async () => {
      return (
        userId &&
        (await chatService.getChatList(userId, (userChats) => {
          // Update the state with the latest chats when changes occur
          setChatList(userChats);
        }))
      );
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
          chatList.map(
            (chatListData) =>
              chatListData.messages.length > 0 && (
                <div
                  key={chatListData.chatId}
                  className="px-3 py-2 flex items-center gap-4 rounded-md hover:bg-accent"
                >
                  <div className="relative rounded-full overflow-hidden min-w-11 min-h-11">
                    <Image
                      src={heroImg}
                      alt=""
                      fill
                      quality={20}
                      sizes="(max-width: 1200px) 50vw, 33vw"
                      className=""
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-base">
                      {chatListData.participants.find(
                        (user) => user !== userId
                      )}
                    </h1>
                    <p className="text-sm line-clamp-1">
                      {chatListData.messages.slice(-1)[0].message}
                    </p>
                  </div>{" "}
                </div>
              )
          )
        ) : (
          <div className="px-3">No chats to show...</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
