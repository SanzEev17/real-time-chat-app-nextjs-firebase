import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { UserData } from "@/types";

const FriendCard = ({
  children,
  requestFriendData,
}: {
  children: React.ReactNode;
  requestFriendData: UserData;
}) => {
  return (
    <Card className="w-76">
      <CardHeader>
        <div className="w-full h-full max-w-72 rounded-md overflow-hidden relative">
          <Link href={`/profile/${requestFriendData.uid}`}>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={requestFriendData.photoURL}
                alt={requestFriendData.name}
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 20rem"
                quality={50}
              />
              <div className="darker-shade"></div>
            </AspectRatio>
          </Link>
        </div>
        <CardTitle className="pt-2 text-lg">{requestFriendData.name}</CardTitle>
      </CardHeader>
      <CardFooter className="w-full flex gap-3">{children}</CardFooter>
    </Card>
  );
};

export default FriendCard;
