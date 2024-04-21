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
import Link from "next/link";

const ProfileCard = async ({ userId }: { userId: string }) => {
  const profileData = await userService.getUserData(userId);

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
              <span className="font-bold">{profileData.username}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-semibold text-2xl border-b-2">About</div>
          <div className="py-2 flex flex-col gap-1.5">
            <div>
              Email Address:&nbsp;
              <Link
                href={`mailto:${profileData.email}`}
                className="font-semibold hover:text-primary cursor-pointer"
              >
                {profileData.email}
              </Link>
            </div>
            <div>
              Phone Number:&nbsp;
              <Link
                href={`tel:${profileData.phoneNumber}`}
                className="font-semibold hover:text-primary cursor-pointer"
              >
                {profileData.phoneNumber}
              </Link>
            </div>
            <div>
              Gender:&nbsp;
              <span className="font-semibold capitalize">
                {profileData.gender}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ProfileCardButtons userId={userId} />
        </CardFooter>
      </Card>
    )
  );
};

export default ProfileCard;
