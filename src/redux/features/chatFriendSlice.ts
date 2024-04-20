import { UserData } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ChatFriendData {
  friendId: string;
  chatId: string;
  friendData: UserData | null;
}

const initialState: ChatFriendData = {
  friendId: "",
  chatId: "",
  friendData: null,
};

const chatFriendSlice = createSlice({
  name: "friendData",
  initialState,
  reducers: {
    setFriendId: (state, action: PayloadAction<string>) => {
      state.friendId = action.payload;
    },
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setCurrentChatFriend: (state, action: PayloadAction<UserData | null>) => {
      state.friendData = action.payload;
    },
  },
});

export const { setFriendId, setChatId, setCurrentChatFriend } =
  chatFriendSlice.actions;
export default chatFriendSlice.reducer;
