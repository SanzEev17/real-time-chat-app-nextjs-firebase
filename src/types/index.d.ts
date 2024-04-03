import { Control } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData extends LoginFormData {
  name: string;
    confirmPassword: string;
}

interface FormInputData {
  control: Control<any>;
  label?: string;
  name: "name" | "email" | "password" | "confirmPassword";
  type?: string;
  placeholder?: string;
}

export { LoginFormData, SignUpFormData, FormInputData };
