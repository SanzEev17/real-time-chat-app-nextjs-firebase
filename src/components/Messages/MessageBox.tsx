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
  const [lastSeenMessage, setLastSeenMessage] = useState<UserMessage>();

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

  //* When in view set messageSeen to true
  useEffect(() => {
    if (!chatId || !friendData) return;
    const setMessageSeen = async () => {
      await chatService.setMessageSeen(chatId, friendData.uid);
    };
    setMessageSeen();
  }, [chatId, friendData]);

  //* Stores the data of the last message opposite user saw in state
  useEffect(() => {
    if (chats) {
      const newChats = [...chats].reverse();
      newChats.map((chat) => {
        if (chat.messageSeen) {
          setLastSeenMessage(chat);
          return;
        }
      });
    }
  }, [chats]);

  return (
    <div className="h-full w-full flex justify-end overflow-y-auto">
      <div className="w-full flex flex-col-reverse gap-1.5 p-4 overflow-y-auto">
        {chats?.map((messageData, index) => {
          if (lastSeenMessage) {
            return messageData.senderId === friendData?.uid ? (
              <MessageReceived
                key={index}
                messageData={messageData}
                friendPhotoURL={friendData.photoURL}
                lastSeenMessage={lastSeenMessage}
              />
            ) : (
              <MessageSent
                key={index}
                messageData={messageData}
                friendPhotoURL={friendData ? friendData.photoURL : ""}
                lastSeenMessage={lastSeenMessage}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default MessageBox;
