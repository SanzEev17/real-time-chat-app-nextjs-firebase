"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DocumentData } from "firebase/firestore";
import { useAppSelector } from "@/redux/store";
import userService from "@/firebase/userService";

const ProfileCard = ({ uid }: { uid: string }) => {
  //TODO: Replace uid with username and make username unique

  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const [profileData, setProfileData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const data = await userService.getUserData(uid);
        data && setProfileData(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to fetch blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [uid]);

  return error ? (
    <div>Error: {error}</div>
  ) : loading || !profileData ? (
    <div>Loading...</div>
  ) : (
    <Card className="min-w-96">
      <CardHeader className="flex flex-row items-center gap-5">
        {/* Profile Image  */}
        <div className="w-full md:w-40 rounded-xl overflow-hidden relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={profileData.photoUrl ? profileData.photoUrl : ""}
              alt={profileData.name}
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 40%"
              quality={40}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-4">
          <CardTitle className="text-3xl font-bold">
            {profileData.name}
          </CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <span>Works in</span>
            <span>Date of birth</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>Bio</p>
      </CardContent>
      {/* Do not render render if viewer is the user itself */}
      {currentUserId !== profileData.uid && (
        <CardFooter className="flex gap-3 justify-center items-center">
          <Button>Add Friend</Button>
          <Button variant="destructive">Unfriend</Button>
          <Button>Message</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileCard;
