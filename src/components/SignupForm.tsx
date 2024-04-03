"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signupForm } from "@/types/userZod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import { SignUpFormData } from "@/types";
import authService from "@/firebase/authService";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupForm>>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const createUser: SubmitHandler<SignUpFormData> = async (
    data: z.infer<typeof signupForm>
  ) => {
    setError("");
    try {
      setLoading(true);
      const newUser = await authService.createUserWithEmail(data);
      if (newUser) {
        router.replace("/account/login");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createUser)}
        className="flex flex-col gap-4"
      >
        <FormInput control={form.control} name="name" placeholder="Full Name" />
        <FormInput
          control={form.control}
          name="email"
          placeholder="Email Address"
        />
        <FormInput
          control={form.control}
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormInput
          control={form.control}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <Button className="w-fit" type="submit">
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
