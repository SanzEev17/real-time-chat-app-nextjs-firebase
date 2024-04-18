import React from "react";
import MessageContainer from "@/components/Messages/MessageContainer";

const ChatsPage = ({ params }: { params: { friendId: string } }) => {
  return <MessageContainer />;
};

export default ChatsPage;
