import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const ChangePasswordPage = ({ params }: { params: { userId: string } }) => {
  return (
    <Card className="max-w-[29rem]">
      <CardHeader>
        <CardTitle className="text-4xl lg:text-[2.5rem] font-bold">
          Change Password
        </CardTitle>
        <CardDescription>
          Enter your old password and new password to change.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm userId={params.userId} />
      </CardContent>
    </Card>
  );
};

export default ChangePasswordPage;
