import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatList from "@/components/ChatList";

const DashboardPage = () => {
  return (
    <section className="h-full lg:grid lg:grid-cols-4 overflow-y-auto">
      <ScrollArea className="h-full px-3">
        <div className="py-2 border-b-2 bg-background sticky top-0">
          <h1 className="text-3xl z-10 font-bold">Chats</h1>
        </div>
        <ChatList />
      </ScrollArea>
    </section>
  );
};

export default DashboardPage;
