import React from "react";
import ChatList from "@/components/ChatList";
import MessageContainer from "@/components/Messages/MessageContainer";
import FriendList from "@/components/Friends/FriendList";

const DashboardPage = () => {
  return (
    <section className="h-full lg:grid lg:grid-cols-4 overflow-y-auto">
      <ChatList />
      <MessageContainer/>
      <FriendList/>
    </section>
  );
};

export default DashboardPage;
