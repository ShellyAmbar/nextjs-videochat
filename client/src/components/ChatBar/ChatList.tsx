"use client";
import {fetchUsers} from "@/lib/fetchers";
import {useAllUsers} from "@/store/userStore";
import {userProps} from "@/types";
import React, {useEffect, useState} from "react";
import {shallow} from "zustand/shallow";
import ChatItem from "./ChatItem";
import {io} from "socket.io-client";

function ChatList({mySelf, filter = ""}: {mySelf: userProps; filter?: string}) {
  const {users, setUsers} = useAllUsers(
    (state: any) => ({users: state.users, setUsers: state.setUsers}),
    shallow
  );
  const [filteredUsers, setfilteredUsers] = useState(users);
  const socket = io("http://localhost:4000");
  useEffect(() => {
    socket.on("new-user", () => {
      fetchUsers(mySelf, setUsers);
    });
  }, []);

  useEffect(() => {
    fetchUsers(mySelf, setUsers);
  }, []);

  useEffect(() => {
    if (users?.length > 0) {
      const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(filter.toLowerCase())
      );
      setfilteredUsers(filteredUsers);
    }
  }, [users, filter]);

  return (
    <ul className="my-5 flex flex-col max-h-full overflow-y-auto no-scrollbar">
      {/* ChatItem */}
      {filteredUsers ? (
        filteredUsers
          ?.reverse()
          ?.map((user: any) => <ChatItem key={user._id} user={user} />)
      ) : (
        <span className="loading loading-ring w-16"></span>
      )}
    </ul>
  );
}

export default ChatList;
