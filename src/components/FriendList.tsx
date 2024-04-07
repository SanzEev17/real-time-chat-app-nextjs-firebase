import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import heroImg from "../../public/images/hero.jpg";

const FriendList = () => {
  return (
    <div className="lg:col-span-1 h-full flex flex-col gap-2 overflow-y-auto">
      <div className="px-6 py-3 shadow-lg">
        <h1 className="text-3xl z-10 font-bold">Friends List</h1>
      </div>
      <ScrollArea className="px-3">
        <div className="px-3 py-2 flex items-center gap-4 rounded-md hover:bg-accent">
          <div className="relative rounded-full overflow-hidden w-9 h-9">
            <Image
              src={heroImg}
              alt=""
              layout="fill"
              quality={20}
              sizes="(max-width: 1200px) 50vw, 33vw"
              className=""
            />
          </div>
          <h1 className="font-bold text-base">Title</h1>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendList;
