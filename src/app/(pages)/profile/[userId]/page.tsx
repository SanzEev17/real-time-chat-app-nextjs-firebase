import ProfileCard from "@/components/ProfileCard";
import React from "react";

const Profile = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  return <ProfileCard uid={userId} />;
};

export default Profile;
