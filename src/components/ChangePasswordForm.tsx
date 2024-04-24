"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormElements/FormInput";
import { Button } from "./ui/button";
import { changePasswordSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "./ui/form";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import authService from "@/firebase/authService";
import Link from "next/link";

const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  if (currentUserId !== userId) {
    router.replace(`/chats`);
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const changePassword = async (data: z.infer<typeof changePasswordSchema>) => {
    setError("");
    try {
      setLoading(true);
      const { oldPassword, password } = data;
      await authService
        .changePassword({ oldPassword, newPassword: password })
        .then(() => {
          setIsPasswordChanged(true);
        });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(changePassword)}
        className="flex flex-col gap-4"
      >
        <FormInput
          label="Old Password"
          control={form.control}
          name="oldPassword"
          placeholder="Enter your old password"
        />
        <div className="flex gap-2">
          <FormInput
            label="New Password"
            control={form.control}
            name="password"
            placeholder="Enter your new password"
          />
          <FormInput
            label="Confirm Password"
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <Button className="w-fit" type="submit">
          {loading ? "Loading..." : "Change Password"}
        </Button>
        {isPasswordChanged && (
          <div className="text-sm text-center">
            Password changed. Go back to profile from&nbsp;
            <Link href={`/profile/${userId}`} className="text-primary underline">here</Link>
          </div>
        )}
      </form>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default ChangePasswordForm;
