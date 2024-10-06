"use client";
import {fetchMessages} from "@/lib/fetchers";
import {useMessages, useSelectedUser, useUser} from "@/store/userStore";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import React, {useEffect, useRef} from "react";
import {shallow} from "zustand/shallow";
import MessageItem from "./MessageItem";
import {io} from "socket.io-client";

const socket = io("http://localhost:4000");
function MessageList() {
  const sender = useUser((state: any) => state.myUser);
  const reciver = useSelectedUser((state: any) => state.selectedUser);
  const {messages, setMessages} = useMessages((state: any) => ({
    messages: state.messages,
    setMessages: state.setMessages,
  }));
  const messagesEndRef = useRef(null);
  const [parent] = useAutoAnimate();
  //   socket.on("message received", ({from, content}) => {
  //     console.log(`Message from ${from}: ${content}`);
  //     setMessages([...messages, content]);
  //   });
  //   socket.on("message sent", ({to, content}) => {
  //     console.log(`You sent a message to ${to}: ${content}`);
  //     setMessages([...messages, content]);
  //   });

  //   socket.on("refresh", ({reciver, message, sender, time}) => {
  //     if (reciver === sender || sender === sender) {
  //       console.log("refresh", reciver, message, sender, time);
  //       const updatedList = messages?.push({
  //         reciver,
  //         message,
  //         sender,
  //         time,
  //       });
  //       setMessages([...updatedList]);
  //     }
  //   });

  useEffect(() => {
    // socket.on("message received", ({from, content}) => {
    //   console.log(`Message from ${from}: ${content}`);
    //   setMessages([...messages, content]);
    // });
    // socket.on("message sent", ({to, content}) => {
    //   console.log(`You sent a message to ${to}: ${content}`);
    //   setMessages([...messages, content]);
    // });
    socket.on("refresh", ({reciver, message, sender, time}) => {
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

    fetchMessages(sender, reciver, setMessages);
  }, [reciver]);

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
