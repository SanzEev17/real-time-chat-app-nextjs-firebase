import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "../../public/images/hero.jpg";

const FriendCard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Card className="w-76">
      <CardHeader>
        <div className="w-full h-full max-w-72 rounded-md overflow-hidden relative">
          <Link href="">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={heroImg}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 20rem"
                quality={30}
              />
              <div className="darker-shade"></div>
            </AspectRatio>
          </Link>
        </div>
        <CardTitle className="pt-2 text-lg">Name</CardTitle>
        <CardDescription>Some bio</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-3">{children}</CardFooter>
    </Card>
  );
};

export default FriendCard;
