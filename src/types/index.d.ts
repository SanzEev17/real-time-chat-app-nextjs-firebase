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
  profileImage: File;
  confirmPassword: string;
}

interface FormData {
  control: Control<any>;
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
}
interface FormInputData extends FormData {
  type?: string;
}

interface FormSelectData extends FormData {
  selectData: string[];
}
interface FormImageData extends FormData {}

interface AuthUserData{
  uid: string;
  username: string;
  email: string;
  photoURL: string;
}
interface UserData extends AuthUserData {
  name: string;
  phoneNumber: string;
  gender: string;
}

export {
  AuthData,
  LoginFormData,
  SignUpFormData,
  FormInputData,
  FormSelectData,
  FormImageData,
  UserData
};
