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
          photoURL: data.photoURL,
        } as UserData;
      };
      await userService.getUserData(receiverId).then(async (data) => {
        if (data) {
          await setDoc(
            doc(this.db, "friendData", senderId, "sentRequests", receiverId),
            userData(data)
          );
        }
      });
      await userService.getUserData(senderId).then(async (data) => {
        if (data) {
          await setDoc(
            doc(
              this.db,
              "friendData",
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
        doc(this.db, "friendData", senderId, "sentRequests", receiverId)
      );
      await deleteDoc(
        doc(this.db, "friendData", receiverId, "receivedRequests", senderId)
      );
    } catch (error: any) {
      console.log("Error deleting friend request", error);
    }
  }

  async acceptFriendRequest({
    acceptedOf,
    acceptedBy,
  }: {
    acceptedOf: string;
    acceptedBy: string;
  }) {
    try {
      const createFriendDoc = async (friend1: string, friend2: string) => {
        await userService.getUserData(acceptedOf).then(async (data) => {
          if (data) {
            await setDoc(
              doc(this.db, "friendData", friend1, "friends", friend2),
              {
                uid: data.uid,
                name: data.name,
                username: data.username,
                email: data.email,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                photoURL: data.photoURL,
              } as UserData
            );
          }
        });
      };
      createFriendDoc(acceptedBy, acceptedOf);
      createFriendDoc(acceptedOf, acceptedBy);
      this.deleteFriendRequest({
        senderId: acceptedOf,
        receiverId: acceptedBy,
      });
    } catch (error: any) {
      console.error("Failed to accept request", error);
    }
  }

  async getSentRequests(senderId: string) {
    try {
      const collectionRef = collection(
        this.db,
        "friendData",
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
        "friendData",
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
}

const friendService = new FriendService();
export default friendService;
