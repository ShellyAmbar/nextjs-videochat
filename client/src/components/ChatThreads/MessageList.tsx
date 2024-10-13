"use client";
import {fetchMessages} from "@/lib/fetchers";
import {useMessages, useSelectedUser, useUser} from "@/store/userStore";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import React, {useEffect, useRef} from "react";
import {shallow} from "zustand/shallow";
import MessageItem from "./MessageItem";
import {io} from "socket.io-client";
import {useCookies} from "react-cookie";

const socket = io("http://localhost:4000");
function MessageList() {
  const sender = useUser((state: any) => state.myUser);
  const reciver = useSelectedUser((state: any) => state.selectedUser);
  const {messages, setMessages} = useMessages((state: any) => ({
    messages: state.messages,
    setMessages: state.setMessages,
  }));

  const [parent] = useAutoAnimate();
  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    console.log("messagelist ---", cookie);

    if (cookie.user?.length > 0) {
      socket.on("refresh", ({reciver, message, sender, time, isVideoCall}) => {
        if (reciver === sender || sender === sender) {
          console.log("refresh", reciver, message, sender, time);
          messages.push({
            reciver,
            message,
            sender,
            time,
          });

          setMessages(messages);
        }
      });

      fetchMessages(sender, reciver, setMessages, cookie.user);
    }
  }, [reciver, cookie.user]);

  useEffect(() => {}, [messages]);

  return (
    <div
      ref={parent}
      className="w-full  flex flex-col max-h-[75vh] overflow-y-auto no-scrollbar"
    >
      {messages && messages?.length > 0
        ? messages.map((item: any, i: number) => (
            // Message Item
            <MessageItem
              key={item.time}
              user={sender.email == item.sender ? true : false}
              message={item.message}
            />
          ))
        : ""}
    </div>
  );
}

export default MessageList;
