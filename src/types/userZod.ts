import { z, ZodType } from "zod";
import { LoginFormData, SignUpFormData } from ".";

const loginForm: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signupForm: ZodType<SignUpFormData> = z
  .object({
    name: z.string().trim().min(4),
    email: z.string().email().trim().toLowerCase(),
    password: z.string().trim().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().trim().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { loginForm, signupForm };
