import { z, ZodType } from "zod";
import { LoginFormData, SignUpFormData } from ".";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const loginForm: ZodType<LoginFormData> = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signupForm: ZodType<SignUpFormData> = z
  .object({
    name: z.string().trim().min(4),
    username: z.string().trim().min(4).toLowerCase(),
    email: z.string().email().trim().toLowerCase(),
    phoneNumber: z
      .string()
      .refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
    gender: z.string().trim().toLowerCase(),
    profileImage: z
      .instanceof(File)
      .refine((files) => files.size <= 10000000, `Max image size is 10MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
        ".jpg, .jpeg and .png files are accepted."
      ),
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

const messageSchema = z.object({
  message: z.string().min(1),
});

export { loginForm, signupForm, messageSchema };
