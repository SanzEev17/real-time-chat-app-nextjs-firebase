"use client";
import FriendCard from "@/components/Friends/FriendCard";
import { SenderFriendRequestButton as Button } from "@/components/Friends/SenderFriendRequestButton";
import { useFriendRequest } from "@/hooks/useFriendRequest";
import React from "react";

const AddFriendsPage = () => {
  const {
    loading,
    userData,
    allUsers,
    receivedFriendRequests,
    sentFriendRequests,
  } = useFriendRequest();

  return loading ? (
    <div>Loading...</div>
  ) : !userData ? (
    <div>Please log in</div>
  ) : (
    <div className="w-full flex flex-col gap-5">
      <div className="py-3 border-b-2">
        <h1 className="text-3xl font-bold">Add Friends</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {allUsers.length > 0 ? (
          allUsers
            .filter((requestFriendData) => {
              //* Filter out users who have already sent friend requests to the current user
              return !receivedFriendRequests.some(
                (data) => data.uid === requestFriendData.uid
              );
            })
            .map((requestFriendData) => (
              <FriendCard
                key={requestFriendData.uid}
                requestFriendData={requestFriendData}
              >
                <Button
                  currentUserId={userData.uid}
                  requestFriendData={requestFriendData}
                  sentRequests={sentFriendRequests}
                />
              </FriendCard>
            ))
        ) : (
          <div>No other users to add friend...</div>
        )}
      </div>
    </div>
  );
};

export default AddFriendsPage;
