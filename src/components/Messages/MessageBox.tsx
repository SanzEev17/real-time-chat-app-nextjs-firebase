import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
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
        chats && setChats(chats.messages);
      });
    };
    const unsubscribe = getChat();

    //* Clean up the subscription when the component unmounts
    return () => {
      unsubscribe;
    };
  }, [chatId]);

  return (
    <ScrollArea className="p-4 h-full overflow-y-auto">
      {chats?.map((messageData) => {
        return messageData.senderId === friendData?.uid ? (
          <MessageReceived
            messageData={messageData}
            friendPhotoURL={friendData.photoURL}
          />
        ) : (
          <MessageSent messageData={messageData} />
        );
      })}
    </ScrollArea>
  );
};

export default MessageBox;
