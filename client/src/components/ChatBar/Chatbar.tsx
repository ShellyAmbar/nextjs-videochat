"use client";
import {fetchUser} from "@/lib/fetchers";
import {useUser} from "@/store/userStore";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {shallow} from "zustand/shallow";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";

function Sidebar() {
  const {myUser, setUser} = useUser(
    (state) => ({myUser: state.myUser, setUser: state.setUser}),
    shallow
  );
  const [filter, setFilter] = useState("");

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-gray-700 h-screen">
      {/* SEARCHBAR */}
      <SearchBar user={myUser} onFilterChange={setFilter} />
      {/* CHATLIST */}
      {myUser && <ChatList mySelf={myUser} filter={filter} />}
    </div>
  );
}

export default Sidebar;
