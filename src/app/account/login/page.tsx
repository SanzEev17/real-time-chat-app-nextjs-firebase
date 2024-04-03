import LoginForm from "@/components/LoginForm";
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

const LoginPage = () => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-4xl lg:text-5xl font-bold">Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Link href="/account/signup" className="text-sm text-center w-full hover:text-blue-500">
          Don&apos;t have an account? Signup here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
