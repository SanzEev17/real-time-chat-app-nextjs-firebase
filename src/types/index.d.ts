import { Control } from "react-hook-form";

interface AuthData {
  email: string;
  password: string;
}
interface LoginFormData extends AuthData {}

interface SignUpFormData extends LoginFormData {
  name: string;
  username: string;
  phoneNumber: string;
  gender: string;
  confirmPassword: string;
}

interface FormData {
  control: Control<any>;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}
interface FormInputData extends FormData {
  type?: string;
}

interface FormSelectData extends FormData {
  selectData: string[];
}

export {
  AuthData,
  LoginFormData,
  SignUpFormData,
  FormInputData,
  FormSelectData,
};
