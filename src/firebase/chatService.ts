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
  updateDoc,
  arrayUnion,
  getDocs,
  or,
  getDoc,
} from "firebase/firestore";

export class ChatService {
  db;
  constructor() {
    this.db = getFirestore(app);
  }

  async getChatId(participant1: string, participant2: string) {
    let chatId = "";
    const q = query(
      collection(this.db, "chats"),
      or(
        where("participants", "==", [participant1, participant2]),
        where("participants", "==", [participant2, participant1])
      )
    );
    const chatIdSnapshot = await getDocs(q);
    chatIdSnapshot.forEach((doc) => {
      chatId = doc.id;
    });
    return chatId;
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

  async sendMessage({
    chatId,
    senderId,
    message,
  }: {
    chatId: string;
    senderId: string;
    message: string;
  }): Promise<void> {
    const chatRef = doc(this.db, "chats", chatId);
    return await updateDoc(chatRef, {
      messages: arrayUnion({
        message,
        senderId,
        timestamp: Date.now(),
        messageSeen: false,
      }),
    });
  }

  async setMessageSeen(chatId: string, senderId: string) {
    try {
      const chatDocRef = doc(this.db, "chats", chatId);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        const currentMessages = chatDocSnapshot.data()?.messages || [];

        //* Update the messages array to set messageSeen to true for messages where it is false
        const updatedMessages = currentMessages.map((message: any) => {
          if (message.senderId === senderId && message.messageSeen === false) {
            return { ...message, messageSeen: true };
          }
          return message;
        });

        await updateDoc(chatDocRef, { messages: updatedMessages });
      } else {
        console.log("Chat document does not exist.");
      }
    } catch (error) {
      console.error("Error updating messageSeen:", error);
    }
  }
}

const chatService = new ChatService();
export default chatService;
