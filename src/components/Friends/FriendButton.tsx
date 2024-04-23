"use client";
import React, { useEffect, useState } from "react";
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
import { Button } from "../ui/button";
import friendService from "@/firebase/friendService";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";

const FriendButton = ({ friendId }: { friendId: string }) => {
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );
  const [isFriend, setIsFriend] = useState(false);
  const [chatId, setChatId] = useState("");

  //* Checks if user is a friend
  useEffect(() => {
    if (allFriends) {
      allFriends.map((friendData) => {
        if (friendData.uid === friendId) {
          setIsFriend(true);
          setChatId(friendData.chatId);
        }
      });
    }
  }, [allFriends, friendId]);

  const unfriend = async () => {
    if (currentUserId && friendId) {
      await friendService.unfriend({
        currentUser: currentUserId,
        friendUser: friendId,
      });
      setIsFriend(false)
    }
  };

  return isFriend ? (
    <div className="flex gap-3">
      <Button asChild>
        <Link href={`/chats/${chatId}`}>Message</Link>
      </Button>
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
    </div>
  ) : (
    <Button>Add Friend</Button>
  );
};

export default FriendButton;
