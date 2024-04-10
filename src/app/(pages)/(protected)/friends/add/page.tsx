import FriendCard from "@/components/FriendCard";
import { Button } from "@/components/ui/button";
import React from "react";

const AddFriendsPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="py-3 border-b-2">
        <h1 className="text-3xl font-bold">Add Friends</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <FriendCard>
          <Button>
            Add Friend
          </Button>
        </FriendCard>
      </div>
    </div>
  );
};

export default AddFriendsPage;
