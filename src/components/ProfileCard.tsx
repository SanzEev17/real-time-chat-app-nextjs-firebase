import React from "react";
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
import userService from "@/firebase/userService";
import ProfileCardButtons from "./ProfileCardButtons";

const ProfileCard = async ({ userId }: { userId: string }) => {
  const profileData = await userService.getUserData(userId);
  //TODO: Replace uid with username and make username unique

  return (
    profileData && (
      <Card className="min-w-96">
        <CardHeader className="flex flex-row items-center gap-5">
          {/* Profile Image  */}
          <div className="w-full md:w-40 rounded-xl overflow-hidden relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={profileData.photoURL ? profileData.photoURL : ""}
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
        <CardFooter>
          <ProfileCardButtons userId={userId} />
        </CardFooter>
      </Card>
    )
  );
};

export default ProfileCard;
