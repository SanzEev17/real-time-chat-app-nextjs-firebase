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
interface FormImageData extends FormData {
  photoURL?: string;
}

interface UserProfile {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photoURL?: File;
}

interface AuthUserData {
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

interface UserMessage {
  message: string;
  senderId: string;
  timestamp: number;
  photoURL?: string;
}

interface ChatDataType {
  chatId: string;
  participants: string[];
  messages: UserMessage[];
}

interface ChatListItem extends ChatDataType {
  friendData: UserData;
}

export {
  AuthData,
  LoginFormData,
  SignUpFormData,
  FormInputData,
  FormSelectData,
  FormImageData,
  UserData,
  UserMessage,
  ChatDataType,
  ChatListItem,
  UserProfile,
};
