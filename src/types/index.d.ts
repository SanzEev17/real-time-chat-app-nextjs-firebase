import { Control } from "react-hook-form";

interface AuthData {
  email: string;
  password: string;
}
interface LoginFormData extends AuthData {}

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

export { AuthData, LoginFormData, SignUpFormData, FormInputData };
