"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signupForm } from "@/types/userZod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormElements/FormInput";
import { useRouter } from "next/navigation";
import { SignUpFormData } from "@/types";
import authService from "@/firebase/authService";
import FormSelect from "./FormElements/FormSelect";
import FormImage from "./FormElements/FormImage";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupForm>>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phoneNumber: "",
      profileImage: new File([], ""),
      gender: "",
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
      await authService
        .createUserWithEmail(data)
        .then(() => router.push("/dashboard"));
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
        <div className="flex justify-center gap-4">
          <FormImage control={form.control} name="profileImage" />
          <div className="w-full flex flex-col justify-center gap-4 items-center">
            <FormInput
              control={form.control}
              name="name"
              placeholder="Full Name"
            />
            <FormInput
              control={form.control}
              name="username"
              placeholder="Username"
            />
          </div>
        </div>
        <FormInput
          control={form.control}
          name="email"
          placeholder="Email Address"
        />
        <div className="flex justify-center gap-4 items-center">
          <FormInput
            control={form.control}
            name="phoneNumber"
            placeholder="Phone Number"
          />
          <FormSelect
            control={form.control}
            name="gender"
            placeholder="Gender"
            selectData={["Male", "Female", "Others"]}
          />
        </div>
        <div className="flex justify-center gap-4 items-center">
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
        </div>
        <Button className="w-fit" type="submit">
          {loading ? "Loading..." : "Signup"}
        </Button>
      </form>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default SignupForm;
