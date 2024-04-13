import { app } from "./config";
import { doc, getFirestore, getDoc } from "firebase/firestore";

export class UserService {
  db;
  constructor() {
    this.db = getFirestore(app);
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
}

const userService = new UserService();
export default userService;
