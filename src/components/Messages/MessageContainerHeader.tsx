import React from "react";
import Image from "next/image";
import heroImg from "../../../public/images/hero.jpg";

const MessageContainerHeader = () => {
  return (
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
  );
};

export default MessageContainerHeader;
