import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <Card className="max-w-[29rem]">
      <CardHeader>
        <CardTitle className="text-4xl lg:text-5xl font-bold">
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your email address below to receive a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter>
        <Link
          href="/account/login"
          className="text-sm text-center w-full hover:text-blue-500"
        >
          Go back to login page
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;
