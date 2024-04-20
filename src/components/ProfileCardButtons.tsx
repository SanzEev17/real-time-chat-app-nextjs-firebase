"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/store";

const ProfileCardButtons = ({ userId }: { userId: string }) => {
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );
  const isFriend = allFriends.map((friendData) =>
    friendData.uid === userId ? true : false
  );

  return currentUserId === userId ? (
    <Button>Edit Profile</Button>
  ) : isFriend ? (
      <Button variant="destructive">Unfriend</Button>
  ) : (
    <Button>Add Friend</Button>
  );
};

export default ProfileCardButtons;
