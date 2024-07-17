import React from "react";
import UserItem from "./components/UserItem";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../store/adminSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.users);

  // Get Users Data for Admin
  useQuery(["getUsersForAdmin"], () => axiosInstance.get("/users"), {
    onSuccess: (res) => dispatch(adminActions.addUsers(res.data.data)),
    onError: (err) => console.log(err),
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchOnWindowFocus: false,
  });

  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium ">Users</h1>
      <ul className=" flex flex-wrap justify-between">
        {users?.map((user) => (
          <UserItem key={user?._id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
