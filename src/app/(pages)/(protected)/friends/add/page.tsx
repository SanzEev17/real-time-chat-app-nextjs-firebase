"use client";
import FriendCard from "@/components/FriendCard";
import friendService from "@/firebase/friendService";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/types";
import React, { useEffect, useState } from "react";

const AddFriendsPage = () => {
  const { userData } = useAuth();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [sentFriendRequests, setSentFriendRequests] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllUsers = async () => {
      return (
        userData &&
        //* getAddUserList returns a promise. Set the response data to state allUsers
        (await friendService
          .getAddFriendList(userData.uid)
          .then((data) => {
            setAllUsers(data);
          })

          //* Fetch data of all users whom current user has sent friend request to
          .then(async () => {
            await friendService.sentRequests(userData.uid).then((data) => {
              data && setSentFriendRequests(data);
            });
          })
          .finally(() => {
            setLoading(false);
          }))
      );
    };
    getAllUsers();
    return () => {
      getAllUsers();
    };
  }, [userData]);

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
        {allUsers.map((requestFriendData) => (
          <FriendCard
            key={requestFriendData.uid}
            currentUserId={userData.uid}
            requestFriendData={requestFriendData}
            sentFriendRequests={sentFriendRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default AddFriendsPage;
