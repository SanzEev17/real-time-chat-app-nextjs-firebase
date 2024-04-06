import Image from "next/image";
import React from "react";
import heroImg from "../../public/images/hero.jpg";

const ChatList = () => {
  return (
    <div className="py-4 flex items-center gap-4">
      <div className="relative rounded-full overflow-hidden min-w-14 min-h-14">
        <Image src={heroImg} alt="" layout="fill" quality={20} className="-z-10" />
      </div>
      <div>
        <h1 className="font-bold text-base">Title</h1>
        <p className="text-sm line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab atque
          dolores dignissimos rerum quas, id numquam inventore nobis assumenda,
          quaerat molestias est ratione accusantium reprehenderit voluptatem
          iste eveniet velit sequi voluptates facere, impedit sit?
        </p>
      </div>
    </div>
  );
};

export default ChatList;
