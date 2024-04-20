import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import chatFriendReducer from "./features/chatFriendSlice";
import friendsReducer from "./features/friendsSlice";

const store = configureStore({
  reducer: {
    authReducer,
    chatFriendReducer,
    friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export default store;
