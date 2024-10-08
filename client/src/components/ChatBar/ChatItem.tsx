"use client";
import {useSelectedUser} from "@/store/userStore";
import {userProps} from "@/types";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";

function ChatItem({user}: {user: userProps}) {
  const {setSelectedUser, selectedUser} = useSelectedUser((state) => state);
  function handleClick(e: any) {
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");
    e.currentTarget.classList.add("selected-user");
    setSelectedUser(user);
  }

  return (
    <>
      <li
        onClick={handleClick}
        className={`flex gap-3 cursor-pointer  hover:bg-slate-600 p-5 rounded-lg`}
      >
        <div className="avatar">
          {user?.imageId && user.imageId.length > 0 && (
            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={`https://robohash.org/${user.imageId}.png`}
                width={256}
                height={256}
                alt="avatar"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-white text-lg">{user?.name}</h3>
          <p className="text-[#707991]">user has joined</p>
        </div>
      </li>
      <div className="divider my-0"></div>
    </>
  );
}

export default ChatItem;
