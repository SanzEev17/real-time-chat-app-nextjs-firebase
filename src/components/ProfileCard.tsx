import React from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import heroImg from "../../public/images/hero.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileCard = () => {
  return (
    <Card className="w-96">
      <CardHeader className="flex flex-row items-center gap-5">
        {/* Profile Image  */}
        <div className="w-full md:w-40 rounded-xl overflow-hidden relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={heroImg}
              alt="Name"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 40%"
              quality={40}
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-4">
          <CardTitle className="text-3xl font-bold">Name</CardTitle>
          <CardDescription>
            <div>Works in</div>
            <div>Date of birth</div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>Bio</p>
      </CardContent>
      <CardFooter className="flex gap-3 justify-center items-center">
      <Button>Add Friend</Button>
          <Button variant="destructive">Unfriend</Button>
          <Button>Message</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
