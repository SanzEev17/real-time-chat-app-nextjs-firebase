import { UserProfile } from "@/types";
import { app } from "./config";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { v4 as uuid } from "uuid";

export class UserService {
  db;
  storage;
  constructor() {
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }

  async getUserData(uid: string) {
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
  async updateUserProfile(
    userId: string,
    { name, username, email, phoneNumber, gender, photoURL }: UserProfile
  ) {
    try {
      const profileRef = doc(this.db, "users", userId);

      if (photoURL) {
        //* Reference for storage in firestore
        const storageRef = ref(
          this.storage,
          `profileImages/${username}/${uuid()}`
        );

        //* Upload the image
        const snapshot = await uploadBytes(storageRef, photoURL);

        //* Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        return await updateDoc(profileRef, {
          name,
          username,
          email,
          phoneNumber,
          gender,
          photoURL: downloadURL,
        });
      }
      return await updateDoc(profileRef, {
        name,
        username,
        email,
        phoneNumber,
        gender,
      });
    } catch (error: any) {
      console.log("Failed to update profile", error);
    }
  }
}

const userService = new UserService();
export default userService;
