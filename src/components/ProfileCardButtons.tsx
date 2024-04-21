"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";

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
    <Button asChild>
      <Link href={`/profile/update/${currentUserId}`}>Edit Profile</Link>
    </Button>
  ) : isFriend ? (
    <Button variant="destructive">Unfriend</Button>
  ) : (
    <Button>Add Friend</Button>
  );
};

export default ProfileCardButtons;
