"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import FriendButton from "./Friends/FriendButton";

const ProfileCardButtons = ({ friendId }: { friendId: string }) => {
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );

  return currentUserId === friendId ? (
    <Button asChild>
      <Link href={`/profile/update/${currentUserId}`}>Edit Profile</Link>
    </Button>
  ) : (
    <FriendButton friendId={friendId} />
  );
};

export default ProfileCardButtons;
