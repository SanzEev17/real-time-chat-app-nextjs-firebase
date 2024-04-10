import { app } from "./config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { LoginFormData, SignUpFormData } from "@/types";

export class AuthService {
  auth;
  db;
  storage;
  constructor() {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }

  async createUserWithEmail({
    name,
    username,
    email,
    phoneNumber,
    gender,
    password,
  }: SignUpFormData) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password).then(
        (data) => {
          updateProfile(data.user, {
            displayName: username,
          });
          setDoc(doc(this.db, "users", data.user.uid), {
            uid: data.user.uid,
            name,
            username,
            email,
            phoneNumber,
            gender,
          });
        }
      );
    } catch (error: any) {
      throw error;
    }
  }

  async loginUserWithEmail({ email, password }: LoginFormData) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw error;
    }
  }
  async getCurrentUser(callback: (user: User | null) => void) {
    try {
      return await onAuthStateChanged(this.auth, callback);
    } catch (error: any) {
      throw error;
    }
  }
  async logout() {
    try {
      return await signOut(this.auth);
    } catch (error: any) {
      console.log("logout error: ", error);
    }
  }
}

const authService = new AuthService();
export default authService;
