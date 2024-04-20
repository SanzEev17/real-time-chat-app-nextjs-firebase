"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import FriendListCard from "./FriendListCard";
import friendService from "@/firebase/friendService";
import { useAppSelector } from "@/redux/store";
import { UserData } from "@/types";
import { useDispatch } from "react-redux";
import { setAllFriendsList } from "@/redux/features/friendsSlice";

const FriendList = () => {
  const dispatch = useDispatch();
  const userId = useAppSelector((state) => state.authReducer.userData?.uid);
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );

  useEffect(() => {
    const getAllFriends = async () => {
      return (
        userId &&
        (await friendService.getFriendsList(userId).then((data) => {
          data && dispatch(setAllFriendsList(data));
        }))
      );
    };
    getAllFriends();
  }, [userId, dispatch]);

  
  return (
    <div className="lg:col-span-1 h-full flex flex-col gap-2 overflow-y-auto">
      <div className="px-6 py-3 shadow-lg">
        <h1 className="text-3xl z-10 font-bold">Friends List</h1>
      </div>
      <ScrollArea className="px-3">
        {allFriends && userId ? (
          allFriends.map((friend) => (
            <FriendListCard
              key={friend.uid}
              currentUser={userId}
              uid={friend.uid}
              name={friend.name}
              photoURL={friend.photoURL}
            />
          ))
        ) : (
          <div>No friends</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FriendList;
