import FriendCard from "@/components/FriendCard";
import { Button } from "@/components/ui/button";
import React from "react";

const FriendRequestsPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="py-3 border-b-2">
        <h1 className="text-3xl font-bold">Friend Requests</h1>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <FriendCard>
          <Button>Accept</Button>
          <Button variant="destructive">Decline</Button>
        </FriendCard>
      </div>
    </div>
  );
};

export default FriendRequestsPage;
