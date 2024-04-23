"use client";
import FriendButton from "@/components/Friends/FriendButton";
import FriendCard from "@/components/Friends/FriendCard";
import friendService from "@/firebase/friendService";
import { setAllFriendsList } from "@/redux/features/friendsSlice";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllFriends = async () => {
      return (
        currentUserId &&
        (await friendService
          .getFriendsList(currentUserId)
          .then((data) => {
            data && dispatch(setAllFriendsList(data));
          })
          .finally(() => {
            setLoading(false);
          }))
      );
    };
    getAllFriends();
  }, [currentUserId, dispatch]);

  if (!currentUserId) {
    return;
  }

  return loading ? (
    <div>Loading...</div>
  ) : currentUserId ? (
    <div className="w-full flex flex-col gap-5">
      <div className="py-3 border-b-2">
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {
          //* Check if there are any friend requests
          allFriends.length > 0 ? (
            allFriends.map((friendData) => (
              <FriendCard key={friendData.uid} requestFriendData={friendData}>
                <FriendButton friendId={friendData.uid} />
              </FriendCard>
            ))
          ) : (
            <div>No friends...</div>
          )
        }
      </div>
    </div>
  ) : (
    <div>Please Log in</div>
  );
};

export default FriendsPage;
