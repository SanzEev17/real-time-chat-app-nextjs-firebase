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

interface UserData {
  uid: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photoUrl: string;
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
