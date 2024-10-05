import {handleLogout} from "@/lib/fetchers";
import {useUser} from "@/store/userStore";
import {useRouter} from "next/navigation";
import React from "react";
import {useCookies} from "react-cookie";
import {io} from "socket.io-client";

function ChatSettings() {
  const router = useRouter();
  const socket = io("http://localhost:4000");
  const [cookie, setCookie] = useCookies(["user"]);
  const {myUser, setUser} = useUser((state) => ({
    myUser: state.myUser,
    setUser: state.setUser,
  }));

  const SidebarOptions = [
    {
      name: "Notification Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2a9 9 0 00-9 9v4a9 9 0 0018 0v-4a9 9 0 00-9-9zm-1 18h2a2 2 0 11-2 0z"
          />
        </svg>
      ),
      action: () => alert("Navigating to Notification Settings"),
    },
    {
      name: "Privacy Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.122 4.122a2 2 0 00-2.828 0l-4 4a2 2 0 000 2.828l4 4a2 2 0 002.828 0l4-4a2 2 0 000-2.828l-4-4zM4 12h1.5a2 2 0 110 4H4a2 2 0 110-4z"
          />
        </svg>
      ),
      action: () => alert("Navigating to Privacy Settings"),
    },
    {
      name: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="red"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      ),
      action: () => {
        setCookie("user", null);
        handleLogout({
          name: myUser.name,
          email: myUser.email,
          router: router,
          socket: socket,
        });
      },
    },
  ];
  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-gray-700 h-screen">
      <ul className="space-y-4">
        {SidebarOptions.map((option) => (
          <li key={option.name}>
            <button
              onClick={option.action}
              className="flex items-center text-white hover:bg-gray-600 rounded p-2 w-full"
            >
              {option.icon}
              <span className="ml-3">{option.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatSettings;
