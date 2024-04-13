import { useState, useEffect } from "react";
import authService from "@/firebase/authService";
import userService from "@/firebase/userService";
import { login, logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

export function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userData } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    const getAuthState = async () => {
      return await authService.getCurrentUser(async (user) => {
        if (user) {
          const userData = await userService.getUserData(user.uid);
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
        setLoading(false);
      });
    };
    getAuthState();
    return () => {
      getAuthState();
    };
  }, [dispatch]);

  return { loading, isAuthenticated, userData };
}
