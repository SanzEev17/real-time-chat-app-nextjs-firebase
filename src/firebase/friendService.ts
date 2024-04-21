import { app } from "./config";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import userService from "./userService";
import { UserData } from "@/types";
import chatService from "./chatService";

export class FriendService {
  db;
  constructor() {
    this.db = getFirestore(app);
  }

  async getFriendsList(userId: string) {
    const allFriendsSnap = await getDocs(
      collection(this.db, "friendData", userId, "friends")
    );
    return allFriendsSnap.docs.map((data) => ({
      ...data.data(),
    })) as UserData[];
  }

  async getAddFriendList(uid: string) {
    const allFriends = await this.getFriendsList(uid);
    const q = query(collection(this.db, "users"), where("uid", "!=", uid));
    const allUsersSnapshot = await getDocs(q);

    return allUsersSnapshot.docs
      .filter((user) => {
        //* Filter out if user is in friend's list
        return !allFriends.some((friend) => friend.uid === user.data().uid);
      })
      .map((user) => ({
        ...user.data(),
      })) as UserData[];
  }

  async unfriend({
    currentUser,
    friendUser,
  }: {
    currentUser: string;
    friendUser: string;
  }) {
    try {
      const batch = writeBatch(this.db);
      const currentUserDocRef = doc(
        this.db,
        "friendData",
        currentUser,
        "friends",
        friendUser
      );
      const friendUserDocRef = doc(
        this.db,
        "friendData",
        friendUser,
        "friends",
        currentUser
      );
      batch.delete(currentUserDocRef);
      batch.delete(friendUserDocRef);
      await batch.commit();
    } catch (error: any) {
      console.log("Failed to unfriend!", error);
    }
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

      const senderDataPromise = userService.getUserData(senderId);
      const receiverDataPromise = userService.getUserData(receiverId);

      const [senderData, receiverData] = await Promise.all([
        senderDataPromise,
        receiverDataPromise,
      ]);
      if (senderData && receiverData) {
        const batch = writeBatch(this.db);
        const senderDocRef = doc(
          this.db,
          "friendData",
          senderId,
          "sentRequests",
          receiverId
        );
        const receiverDocRef = doc(
          this.db,
          "friendData",
          receiverId,
          "receivedRequests",
          senderId
        );
        batch.set(senderDocRef, userData(receiverData));
        batch.set(receiverDocRef, userData(senderData));

        await batch.commit();
      }
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
      const batch = writeBatch(this.db);
      //* Method to create document to store friend's data
      const addFriendData = async (friend1: string, friend2: string) => {
        const data = await userService.getUserData(friend2);
        if (data) {
          const userDocRef = doc(
            this.db,
            "friendData",
            friend1,
            "friends",
            friend2
          );
          batch.set(userDocRef, {
            uid: data.uid,
            name: data.name,
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            photoURL: data.photoURL,
          } as UserData);
        }
      };
      await Promise.all([
        addFriendData(acceptedBy, acceptedOf),
        addFriendData(acceptedOf, acceptedBy),
      ]);

      await batch.commit();

      this.deleteFriendRequest({
        senderId: acceptedOf,
        receiverId: acceptedBy,
      });

      await chatService.createUserChatData({
        currentUser: acceptedBy,
        friendUser: acceptedOf,
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
