"use client";
import {useUser} from "@/store/userStore";
import React from "react";
import {shallow} from "zustand/shallow";
import Image from "next/image";
import {Layouts} from "@/types";
function SettingsBar({setLayout}: {setLayout: (type: Layouts) => void}) {
  const {myUser, setUser} = useUser(
    (state) => ({myUser: state.myUser, setUser: state.setUser}),
    shallow
  );
  return (
    <div className="w-20 bg-gray-800 flex flex-col items-center py-6 space-y-6">
      <button
        onClick={() => setLayout(Layouts.CHAT)}
        className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
      >
        <span role="img" aria-label="Chat" className="text-xl">
          💬
        </span>
      </button>
      <button
        onClick={() => setLayout(Layouts.SETTINGS)}
        className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
      >
        <span role="img" aria-label="Settings" className="text-xl">
          ⚙️
        </span>
      </button>
      <button
        onClick={() => setLayout(Layouts.PROFILE)}
        className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
      >
        <span role="img" aria-label="Profile" className="text-xl">
          {myUser?.imageId && (
            <Image
              src={`https://robohash.org/${myUser.imageId}.png`}
              width={40}
              height={40}
              alt="avatar"
            />
          )}
        </span>
      </button>
    </div>
  );
}

export default SettingsBar;
