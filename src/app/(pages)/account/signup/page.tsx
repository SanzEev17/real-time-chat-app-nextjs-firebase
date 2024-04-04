import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

const SignUpPage = () => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-4xl lg:text-5xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Join us to continue chatting in real-time with friends and colleagues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <Link
          href="/account/login"
          className="text-sm text-center w-full hover:text-blue-500"
        >
          Already have an account? Login here
        </Link>
      </CardFooter>
    </Card>
  )
}

export default SignUpPage