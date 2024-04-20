import React from "react";
import MessageContainer from "@/components/Messages/MessageContainer";

const ChatsPage = ({ params }: { params: { chatId: string } }) => {
  return <MessageContainer chatId={params.chatId} />;
};

export default ChatsPage;
