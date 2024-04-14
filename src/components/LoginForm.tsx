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
import { login } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
      const userSession = await authService.loginUserWithEmail(data);
      if (userSession) {
        const { uid, displayName, email, photoURL } = userSession.user;
        dispatch(login({ uid, username: displayName, email, photoURL }));
        router.replace("/dashboard");
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
        <Button className="w-fit" type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
      {error && <div>{error}</div>}
    </Form>
  );
};
export default LoginForm;
