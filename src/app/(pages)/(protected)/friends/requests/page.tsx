"use client";
import FriendCard from "@/components/Friends/FriendCard";
import { ReceiverFriendRequestButton as Button } from "@/components/Friends/ReceiverFriendRequestButton";
import { useFriendRequest } from "@/hooks/useFriendRequest";
import React from "react";

const FriendRequestsPage = () => {
  const { loading, userData, receivedFriendRequests } = useFriendRequest();

  return loading ? (
    <div>Loading...</div>
  ) : !userData ? (
    <div>Please log in</div>
  ) : (
    <div className="w-full flex flex-col gap-5">
      <div className="py-3 border-b-2">
        <h1 className="text-3xl font-bold">Friend Requests</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {
          //* Check if there are any friend requests
          receivedFriendRequests.length > 0 ? (
            receivedFriendRequests.map((requestFriendData) => (
              <FriendCard
                key={requestFriendData.uid}
                requestFriendData={requestFriendData}
              >
                <Button
                  currentUserId={userData.uid}
                  requestFriendData={requestFriendData}
                />
              </FriendCard>
            ))
          ) : (
            <div>No friend requests...</div>
          )
        }
      </div>
    </div>
  );
};

export default FriendRequestsPage;
