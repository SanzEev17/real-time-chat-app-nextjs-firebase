"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import friendService from "@/firebase/friendService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProfileCardButtons = ({ userId }: { userId: string }) => {
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );

  //* Checks if user is a friend
  const isFriend = allFriends.map((friendData) =>
    friendData.uid === userId ? true : false
  );

  const unfriend = async () => {
    if (currentUserId && userId) {
      await friendService.unfriend({
        currentUser: currentUserId,
        friendUser: userId,
      });
    }
  };

  return currentUserId === userId ? (
    <Button asChild>
      <Link href={`/profile/update/${currentUserId}`}>Edit Profile</Link>
    </Button>
  ) : isFriend ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Unfriend</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove this person as your friend.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={unfriend}>
            Yes, Unfriend
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <Button>Add Friend</Button>
  );
};

export default ProfileCardButtons;
