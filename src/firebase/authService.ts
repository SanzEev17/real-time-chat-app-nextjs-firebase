import { app } from "./config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthData } from "@/types";

export class AuthService {
  auth;
  constructor() {
    this.auth = getAuth(app);
  }

  async createUserWithEmail({ email, password }: AuthData) {
    try {
      const newUser = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (newUser) {
        return this.loginUserWithEmail({ email, password });
      } else {
        return newUser;
      }
    } catch (error: any) {
      throw error;
    }
  }
  async loginUserWithEmail({ email, password }: AuthData) {
    try {
      return signInWithEmailAndPassword(this.auth, email, password);
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
