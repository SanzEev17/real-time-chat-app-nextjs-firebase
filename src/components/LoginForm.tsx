"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { loginForm } from "@/types/userZod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import { LoginFormData } from "@/types";
import authService from "@/firebase/authService";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser: SubmitHandler<LoginFormData> = async (
    data: z.infer<typeof loginForm>
  ) => {
    setError("");
    try {
      setLoading(true);
      await authService.loginUserWithEmail(data);
      router.replace("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>Loading Form</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(loginUser)}
        className="flex flex-col gap-4"
      >
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
        <Button variant="outline" className="w-fit" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
