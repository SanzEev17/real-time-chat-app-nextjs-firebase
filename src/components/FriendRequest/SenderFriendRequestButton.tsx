import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserData } from "@/types";
import friendService from "@/firebase/friendService";

const SenderFriendRequestButton = ({
  sentRequests,
  requestFriendData,
  currentUserId,
}: {
  sentRequests: UserData[];
  requestFriendData: UserData;
  currentUserId: string;
}) => {
  const [isRequestSent, setIsRequestSent] = useState(false);

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

  return isRequestSent ? (
    <Button variant="destructive" onClick={deleteFriendRequest}>
      Cancel
    </Button>
  ) : (
    <Button onClick={sendFriendRequest}>Add Friend</Button>
  );
};

export { SenderFriendRequestButton };
