"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import FriendButton from "./Friends/FriendButton";

const ProfileCardButtons = ({ userId }: { userId: string }) => {
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );

  return currentUserId === userId ? (
    <div className="flex gap-3">
      <Button asChild>
        <Link href={`/profile/update/${currentUserId}`}>Edit Profile</Link>
      </Button>
      <Button className="text-white bg-green-600 hover:bg-green-700" asChild>
        <Link href={`/profile/changepassword/${currentUserId}`}>
          Change Password
        </Link>
      </Button>
    </div>
  ) : (
    <FriendButton friendId={userId} />
  );
};

export default ProfileCardButtons;
