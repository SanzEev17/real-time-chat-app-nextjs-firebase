"use client";
import { updateProfileSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import FormImage from "./FormElements/FormImage";
import FormInput from "./FormElements/FormInput";
import FormSelect from "./FormElements/FormSelect";
import { Button } from "./ui/button";
import userService from "@/firebase/userService";
import { UserData, UserProfile } from "@/types";
import { DocumentData } from "firebase/firestore";

const UpdateProfile = ({
  userId,
  userData,
}: {
  userId: string;
  userData: UserData | DocumentData;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userData?.name || "",
      username: userData?.username || "",
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      photoURL: undefined,
      gender: userData?.gender,
    },
  });
  const updateProfile: SubmitHandler<UserProfile> = async (
    data: z.infer<typeof updateProfileSchema>
  ) => {
    setError("");
    try {
      setLoading(true);
      await userService.updateUserProfile(userId, data);
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateProfile)}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-center gap-4">
          <FormImage
            photoURL={userData.photoURL}
            control={form.control}
            name="photoURL"
          />
          <div className="w-full flex flex-col justify-center gap-4 items-center">
            <FormInput
              control={form.control}
              name="name"
              placeholder="Full Name"
            />
            <FormInput
              control={form.control}
              name="username"
              placeholder="Username"
            />
          </div>
        </div>
        <FormInput
          control={form.control}
          name="email"
          placeholder="Email Address"
        />
        <div className="flex justify-center gap-4 items-center">
          <FormInput
            control={form.control}
            name="phoneNumber"
            placeholder="Phone Number"
          />
          <FormSelect
            control={form.control}
            name="gender"
            placeholder="Gender"
            selectData={["Male", "Female", "Others"]}
          />
        </div>
        <Button className="w-fit" type="submit">
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default UpdateProfile;
