"use client";
import React, { useState } from "react";
import { Form } from "./ui/form";
import FormInput from "./FormElements/FormInput";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import authService from "@/firebase/authService";

const ForgotPasswordForm = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPassword: SubmitHandler<{ email: string }> = async (
    data: z.infer<typeof forgotPasswordSchema>
  ) => {
    setError("");
    try {
      setLoading(true);
      await authService.forgotPassword(data);
      setIsEmailSent(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(resetPassword)}
        className="flex flex-col gap-4"
      >
        <FormInput
          label="Email Address"
          control={form.control}
          name="email"
          placeholder="Enter your email address"
        />
        <Button className="w-fit" type="submit">
          {loading
            ? "Loading..."
            : isEmailSent
            ? "Resend Email"
            : "Reset Password"}
        </Button>
        {isEmailSent && (
          <div className="text-sm text-center">
            Password reset link sent. Please check your email.
          </div>
        )}
      </form>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default ForgotPasswordForm;
