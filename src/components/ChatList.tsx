import Image from "next/image";
import React from "react";
import heroImg from "../../public/images/hero.jpg";
import { ScrollArea } from "./ui/scroll-area";

const ChatList = () => {
  return (
    <div className="lg:col-span-1 h-full flex flex-col gap-2 overflow-y-auto">
      <div className="px-6 py-3 shadow-lg">
        <h1 className="text-3xl z-10 font-bold">Chats</h1>
      </div>
      <ScrollArea className="px-3">
        <div className="px-3 py-2 flex items-center gap-4 rounded-md hover:bg-accent">
          <div className="relative rounded-full overflow-hidden min-w-11 min-h-11">
            <Image
              src={heroImg}
              alt=""
              layout="fill"
              quality={20}
              sizes="(max-width: 1200px) 50vw, 33vw"
              className=""
            />
          </div>
          <div>
            <h1 className="font-bold text-base">Title</h1>
            <p className="text-sm line-clamp-1">
              Lorem ipsum dolor sit amet hoeeerhhs adipisicing elit. Ab atque
              dolores dignissimos rerum quas, id numquam inventore nobis
              assumenda, quaerat molestias est ratione accusantium reprehenderit
              voluptatem iste eveniet velit sequi voluptates facere, impedit
              sit?
            </p>
          </div>{" "}
        </div>
      </ScrollArea>
    </div>
    // <div className="py-4 flex items-center gap-4">
    //   <div className="relative rounded-full overflow-hidden min-w-14 min-h-14">
    //     <Image
    //       src={heroImg}
    //       alt=""
    //       layout="fill"
    //       quality={20}
    //       sizes="(max-width: 1200px) 50vw, 33vw"
    //       className="-z-10"
    //     />
    //   </div>
    // <div>
    //   <h1 className="font-bold text-base">Title</h1>
    //   <p className="text-sm line-clamp-1">
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab atque
    //     dolores dignissimos rerum quas, id numquam inventore nobis assumenda,
    //     quaerat molestias est ratione accusantium reprehenderit voluptatem
    //     iste eveniet velit sequi voluptates facere, impedit sit?
    //   </p>
    // </div>
    // </div>
  );
};

export default ChatList;
