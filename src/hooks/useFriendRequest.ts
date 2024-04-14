import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { UserData } from "@/types";
import friendService from "@/firebase/friendService";

export function useFriendRequest() {
  const { userData } = useAuth();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [sentFriendRequests, setSentFriendRequests] = useState<UserData[]>([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState<
    UserData[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllUsers = async () => {
      return (
        userData &&
        //* getAddUserList returns a promise. Set the response data to state allUsers
        (await friendService
          .getAddFriendList(userData.uid)
          .then((data) => {
            setAllUsers(data);
          })
          //* Fetch data of all users whom current user has sent friend request to
          .then(async () => {
            await friendService.getSentRequests(userData.uid).then((data) => {
              data && setSentFriendRequests(data);
            });
          })
          //* Fetch data of all users whom current user has sent friend request to
          .then(async () => {
            await friendService
              .getReceivedRequests(userData.uid)
              .then((data) => {
                data && setReceivedFriendRequests(data);
              });
          })
          .finally(() => {
            setLoading(false);
          }))
      );
    };
    getAllUsers();
    return () => {
      getAllUsers();
    };
  }, [userData]);

  return { loading, userData, allUsers, sentFriendRequests, receivedFriendRequests };
}
