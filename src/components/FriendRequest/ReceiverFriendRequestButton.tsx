import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserData } from "@/types";
import friendService from "@/firebase/friendService";

const ReceiverFriendRequestButton = ({
  requestFriendData,
  currentUserId,
}: {
  requestFriendData: UserData;
  currentUserId: string;
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  //* Handler to send friend request
  const acceptFriendRequest = async () => {
    await friendService.sendFriendRequest({
      senderId: currentUserId,
      receiverId: requestFriendData.uid,
    });
    setIsAccepted(true);
  };

  //* Handler to cancel or reject friend request
  const deleteFriendRequest = async () => {
    await friendService.deleteFriendRequest({
      senderId: requestFriendData.uid,
      receiverId: currentUserId,
    });
    setIsDeleted(true);
  };

  return isAccepted ? (
    <Button className="w-full">Accepted</Button>
  ) : isDeleted ? (
    <Button className="w-full">Deleted</Button>
  ) : (
    <>
      <Button onClick={acceptFriendRequest} className="w-full">
        Accept
      </Button>
      <Button
        variant="destructive"
        onClick={deleteFriendRequest}
        className="w-full"
      >
        Delete
      </Button>
    </>
  );
};

export { ReceiverFriendRequestButton };
