import { UserData } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFriendsList: [] as UserData[],
};

const friendsSlice = createSlice({
  name: "allFriends",
  initialState,
  reducers: {
    setAllFriendsList: (state, action: PayloadAction<UserData[]>) => {
      state.allFriendsList = action.payload;
    },
  },
});

export const { setAllFriendsList } = friendsSlice.actions;
export default friendsSlice.reducer;
