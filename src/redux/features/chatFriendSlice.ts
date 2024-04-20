import { UserData } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ChatFriendData {
  chatId: string;
  friendData: UserData | null;
}

const initialState: ChatFriendData = {
  chatId: "",
  friendData: null,
};

const chatFriendSlice = createSlice({
  name: "chatFriendData",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setCurrentChatFriend: (state, action: PayloadAction<UserData | null>) => {
      state.friendData = action.payload;
    },
  },
});

export const { setChatId, setCurrentChatFriend } = chatFriendSlice.actions;
export default chatFriendSlice.reducer;
