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
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { LoginFormData, SignUpFormData } from "@/types";
import { v4 as uuidv4 } from "uuid";

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
    profileImage,
  }: SignUpFormData) {
    try {
      const userData = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      //* Reference for storage in firestore
      const storageRef = ref(
        this.storage,
        `profileImages/${username}/${uuidv4()}`
      );

      //* Upload the image
      const snapshot = await uploadBytes(storageRef, profileImage);

      //* Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      //* Update user profile with username and photoURL
      await updateProfile(userData.user, {
        displayName: username,
        photoURL: downloadURL,
      });

      //* Creates a document to store all info about user
      setDoc(doc(this.db, "users", userData.user.uid), {
        uid: userData.user.uid,
        name,
        username,
        email,
        phoneNumber,
        gender,
        photoUrl: downloadURL,
      });
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

  async getUserData(uid) {
    try {
      const docRef = doc(this.db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (error: any) {
      console.log("Failed to get user data", error);
    }
  }
}

const authService = new AuthService();
export default authService;
