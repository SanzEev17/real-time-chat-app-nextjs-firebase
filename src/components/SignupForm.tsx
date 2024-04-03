"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupForm } from "@/types/userZod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupForm>>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof signupForm>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
