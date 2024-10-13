"use client";
import Messages from "@/components/ChatThreads/Messages";
import SettingsBar from "@/components/SettingsBar/settingsBar";
import Chatbar from "@/components/ChatBar/Chatbar";
import React, {useState} from "react";
import UserSettings from "@/components/UserSettings/userSettings";
import ChatSettings from "@/components/ChatSettings/chatSettings";
import {Layouts} from "@/types";
import IncomingCall from "@/components/IncomingCall/incomingCall";
import {io} from "socket.io-client";
import {useUser} from "@/store/userStore";

function Page() {
  const [layout, setLayout] = useState(Layouts.CHAT);
  const socket = io("http://localhost:4000");
  const myUser = useUser((state: any) => state.myUser);
  const [isShowIncomingCall, setIsShowIncomingCall] = useState(false);
  const [sender, setSender] = useState("");
  socket.on("refresh", ({reciver, message, sender, time, isVideoCall}) => {
    console.log(reciver, message, sender, time, isVideoCall, myUser.email);

    if (isVideoCall && reciver === myUser?.email) {
      setSender(sender);
      setIsShowIncomingCall(true);
    }
  });

  const onPressAccept = () => {
    setIsShowIncomingCall(false);
  };
  const onPressDecline = () => {
    setIsShowIncomingCall(false);
  };
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        {/* SIDEBAR */}
        <SettingsBar setLayout={setLayout} />

        {layout === Layouts.PROFILE && <UserSettings />}
        {layout === Layouts.SETTINGS && <ChatSettings />}

        {layout === Layouts.CHAT && <Chatbar />}
        <Messages />
        {isShowIncomingCall && (
          <IncomingCall
            onPressAccept={onPressAccept}
            onPressDecline={onPressDecline}
            name={sender}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
