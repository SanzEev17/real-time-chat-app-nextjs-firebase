import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatList from "@/components/ChatList";
import Image from "next/image";
import heroImg from "../../../../../public/images/hero.jpg";
import MessageContainer from "@/components/MessageContainer";
import ChatForm from "@/components/ChatForm";

const DashboardPage = () => {
  return (
    <section className="h-full lg:grid lg:grid-cols-4 overflow-y-auto">
      <ScrollArea className="h-full px-3">
        <div className="py-3 border-b-2 bg-background sticky top-0">
          <h1 className="text-3xl z-10 font-bold">Chats</h1>
        </div>
        <ChatList />
      </ScrollArea>
      <div className="border-x-2 h-full lg:col-span-2 flex flex-col flex-grow overflow-y-auto">
        <div className="py-2 shadow-lg w-full h-fit">
          <div className="px-4 flex gap-3">
            <div className="relative w-11 h-11 overflow-hidden rounded-full">
              <Image
                src={heroImg}
                alt="hero"
                fill
                quality={20}
                sizes="(max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <h1 className="font-bold text-base">Title</h1>
              <p className="text-sm line-clamp-1 text-muted-foreground">
                Active now
              </p>
            </div>
          </div>
        </div>
        <MessageContainer />
        <ChatForm />
      </div>
    </section>
  );
};

export default DashboardPage;
