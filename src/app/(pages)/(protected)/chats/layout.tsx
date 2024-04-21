import React from "react";
import ChatList from "@/components/ChatList/ChatList";
import FriendList from "@/components/Friends/FriendList";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full lg:grid lg:grid-cols-4 overflow-y-auto">
      <ChatList />
      {children}
      <FriendList />
    </section>
  );
}
