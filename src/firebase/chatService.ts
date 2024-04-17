import { User } from "firebase/auth";
import { app } from "./config";
import {
  doc,
  getFirestore,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import userService from "./userService";
import { ChatListItem } from "@/types";

export class ChatService {
  db;
  constructor() {
    this.db = getFirestore(app);
  }

  async getChatList(userId: string, callback: (chats: any[]) => void) {
    const q = query(
      collection(this.db, "chats"),
      where("participants", "array-contains", userId)
    );
    // Set up a real-time listener for changes in the chats collection where the user is a participant
    return await onSnapshot(q, (snapshot) => {
      // When there are changes, map the snapshot data to an array of chat objects
      const userChats = snapshot.docs.map((doc) => {
        return {
          chatId: doc.id,
          ...doc.data(),
        };
      });
      // Call the callback function with the updated chats array
      callback(userChats);
    });
  }

  async createUserChatData({
    currentUser,
    friendUser,
  }: {
    currentUser: string;
    friendUser: string;
  }) {
    //* This creates a document which stores the chat data
    //* And is initialized when user accepts friend request
    const chatRef = collection(this.db, "chats");
    return await addDoc(chatRef, {
      messages: [],
      participants: [currentUser, friendUser],
    });
  }
}

const chatService = new ChatService();
export default chatService;
