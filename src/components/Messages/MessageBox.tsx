import React, { useEffect, useState } from "react";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import { useAppSelector } from "@/redux/store";
import { UserMessage } from "@/types";
import chatService from "@/firebase/chatService";

const MessageBox = () => {
  const chatId = useAppSelector((state) => state.chatFriendReducer.chatId);
  const friendData = useAppSelector(
    (state) => state.chatFriendReducer.friendData
  );

  const [chats, setChats] = useState<UserMessage[]>();

  useEffect(() => {
    if (!chatId) return;
    const getChat = async () => {
      return await chatService.getChatWithFriend({ chatId }, (chats) => {
        chats && setChats(chats.messages.reverse());
      });
    };
    const unsubscribe = getChat();

    //* Clean up the subscription when the component unmounts
    return () => {
      unsubscribe;
    };
  }, [chatId]);

  return (
    <div className="h-full w-full flex justify-end overflow-y-auto">
      <div className="w-full flex flex-col-reverse p-4 overflow-y-auto">
        {chats?.map((messageData, index) => {
          return messageData.senderId === friendData?.uid ? (
            <MessageReceived
              key={index}
              messageData={messageData}
              friendPhotoURL={friendData.photoURL}
            />
          ) : (
            <MessageSent key={index} messageData={messageData} />
          );
        })}
      </div>
    </div>
  );
};

export default MessageBox;
