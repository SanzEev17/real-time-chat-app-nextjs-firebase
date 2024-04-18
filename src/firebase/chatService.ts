import { ChatDataType } from "@/types";
import { app } from "./config";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  addDoc,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";

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

    //* Set up a real-time listener for changes in the chats collection where the user is a participant
    return await onSnapshot(q, (snapshot) => {
      //* When there are changes, map the snapshot data to an array of chat objects
      const userChats = snapshot.docs.map((doc) => ({
        chatId: doc.id,
        ...doc.data(),
      }));

      // Call the callback function with the updated chats array
      callback(userChats);
    });
  }

  async getChatWithFriend(
    { chatId }: { chatId: string },
    callback: (chatData: ChatDataType | null) => void
  ): Promise<() => void> {
    const chatRef = doc(this.db, "chats", chatId);

    //* Listen for real-time updates to the chat document
    return onSnapshot(chatRef, (snapshot: DocumentSnapshot) => {
      if (snapshot.exists()) {
        const chatData = {
          chatId: snapshot.id,
          ...snapshot.data(),
        } as ChatDataType;

        //* Call the callback function with the chat data
        callback(chatData);
      } else {
        callback(null);
      }
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
