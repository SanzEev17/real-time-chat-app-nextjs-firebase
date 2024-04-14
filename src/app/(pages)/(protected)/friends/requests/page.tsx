"use client";
import FriendCard from "@/components/FriendCard";
import { useFriendRequest } from "@/hooks/useFriendRequest";
import React from "react";

const FriendRequestsPage = () => {
  const { loading, userData, receivedFriendRequests, sentFriendRequests } =
    useFriendRequest();

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
        {receivedFriendRequests.map((requestFriendData) => (
          <FriendCard
            key={requestFriendData.uid}
            currentUserId={userData.uid}
            requestFriendData={requestFriendData}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequestsPage;
