import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import heroImg from "../../public/images/hero.jpg";
import { AspectRatio } from "./ui/aspect-ratio";

const Hero = () => {
  return (
    <div className="h-dvh px-14 lg:px-36 py-10 flex justify-between items-center">
      <div className="lg:w-1/2 flex flex-col justify-between gap-10 lg:gap-16">
        <h1 className="py-2 text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
          Hang out anytime, anywhere
        </h1>
        <div className="lg:w-2/3">
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:block max-w-[45%] min-w-[45%] rounded-lg shadow-md overflow-hidden">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={heroImg}
            alt="Guff-Gaf"
            layout=""
            quality={50}
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50%"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default Hero;
