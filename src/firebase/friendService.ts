import { app } from "./config";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import userService from "./userService";
import { UserData } from "@/types";

export class FriendService {
  db;
  constructor() {
    this.db = getFirestore(app);
  }
  async getAddFriendList(uid: string) {
    const q = query(collection(this.db, "users"), where("uid", "!=", uid));
    const allUsersSnapshot = await getDocs(q);
    return allUsersSnapshot.docs.map((data) => ({
      ...data.data(),
    })) as UserData[];
  }

  async sendFriendRequest({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }) {
    try {
      const userData = (data: DocumentData) => {
        return {
          uid: data.uid,
          name: data.name,
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          photoUrl: data.photoUrl,
        } as UserData;
      };
      await userService.getUserData(receiverId).then(async (data) => {
        if (data) {
          await setDoc(
            doc(
              this.db,
              "friendRequests",
              senderId,
              "sentRequests",
              receiverId
            ),
            userData(data)
          );
        }
      });
      await userService.getUserData(senderId).then(async (data) => {
        if (data) {
          await setDoc(
            doc(
              this.db,
              "friendRequests",
              receiverId,
              "receivedRequests",
              senderId
            ),
            userData(data)
          );
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async deleteFriendRequest({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }) {
    try {
      await deleteDoc(
        doc(this.db, "friendRequests", senderId, "sentRequests", receiverId)
      );
      await deleteDoc(
        doc(this.db, "friendRequests", receiverId, "receivedRequests", senderId)
      );
    } catch (error: any) {
      console.log("Error deleting friend request", error);
    }
  }

  async getSentRequests(senderId: string) {
    try {
      const collectionRef = collection(
        this.db,
        "friendRequests",
        senderId,
        "sentRequests"
      );
      const collectionSnap = await getDocs(collectionRef);
      return collectionSnap.docs.map((data) => ({
        ...data.data(),
      })) as UserData[];
    } catch (error: any) {
      console.log(error);
    }
  }
  async getReceivedRequests(receiverId: string) {
    try {
      const collectionRef = collection(
        this.db,
        "friendRequests",
        receiverId,
        "receivedRequests"
      );
      const collectionSnap = await getDocs(collectionRef);
      return collectionSnap.docs.map((data) => ({
        ...data.data(),
      })) as UserData[];
    } catch (error: any) {
      console.log(error);
    }
  }

  // async getFriendsList(uid: string) {
  //   try {
  //     await userService.getUserData(uid).then((data) => {
  //       if (data) {
  //         const friendsList = data.friends.list;
  //         return friendsList;
  //       }
  //     });
  //   } catch (error: any) {
  //     console.log("Error getting friends list:", error);
  //     return [];
  //   }
  // }
}

const friendService = new FriendService();
export default friendService;
