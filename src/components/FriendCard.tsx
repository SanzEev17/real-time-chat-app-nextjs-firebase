import React, { useEffect, useMemo, useState } from "react";
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
import { Button } from "./ui/button";
import { UserData } from "@/types";
import friendService from "@/firebase/friendService";

const FriendCard = ({
  requestFriendData,
  sentRequests,
  currentUserId,
}: {
  requestFriendData: UserData;
  sentRequests?: UserData[];
  currentUserId: string;
}) => {
  const [isRequestSent, setIsRequestSent] = useState(false);

  //* Check if the key of object i.e. uid is equal to the requestFriendData uid
  useEffect(() => {
    if (sentRequests) {
      sentRequests.map((friendRequest: UserData) => {
        friendRequest.uid === requestFriendData.uid && setIsRequestSent(true);
      });
    }
  }, [sentRequests, requestFriendData.uid]);

  //* Handler to send friend request
  const sendFriendRequest = async () => {
    await friendService.sendFriendRequest({
      senderId: currentUserId,
      receiverId: requestFriendData.uid,
    });
    setIsRequestSent(true);
  };

  //* Handler to cancel or reject friend request
  const deleteFriendRequest = async () => {
    await friendService.deleteFriendRequest({
      senderId: currentUserId,
      receiverId: requestFriendData.uid,
    });
    setIsRequestSent(false);
  };

  return (
    <Card className="w-76">
      <CardHeader>
        <div className="w-full h-full max-w-72 rounded-md overflow-hidden relative">
          <Link href="">
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
        <CardDescription>Some bio</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-3">
        {isRequestSent ? (
          <Button variant="destructive" onClick={deleteFriendRequest}>
            Cancel
          </Button>
        ) : (
          <Button onClick={sendFriendRequest}>Add Friend</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FriendCard;
