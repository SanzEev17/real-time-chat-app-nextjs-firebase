"use client";
import authService from "@/firebase/authService";
import { login, logout } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//* Component to check if user exists
//* If true fetch user's data from users collection and store in redux userData
const UserData = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuthState = async () => {
      return await authService.getCurrentUser(async (user) => {
        if (user) {
          const { uid, displayName, email, photoURL} = user
          dispatch(login({uid, username:displayName, email, photoURL}));
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

  return loading ? null : children;
};

export default UserData;
