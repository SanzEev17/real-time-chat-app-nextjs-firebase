"use client";
import UpdateProfile from "@/components/UpdateProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import userService from "@/firebase/userService";
import { useAppSelector } from "@/redux/store";
import { UserData } from "@/types";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UpdateProfilePage = ({ params }: { params: { userId: string } }) => {
  const [userData, setUserData] = useState<DocumentData | UserData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await userService.getUserData(params.userId);
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [params.userId]);

  //* Shows this if user tries to update another user's profile through url
  if (currentUserId !== params.userId) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl text-destructive">
          You can&apos;t edit someone else&apos;s profile!!
        </h1>
        <Link href="/chats" className="text-xl hover:text-primary">
          Click here to go back
        </Link>
      </div>
    );
  }

  return error || !userData ? (
    <div>{error}</div>
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-full flex justify-center items-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="text-3xl lg:text-5xl font-bold">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateProfile userId={params.userId} userData={userData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfilePage;
