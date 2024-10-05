"use client";
import Messages from "@/components/Chat-Threads/Messages";
import SettingsBar from "@/components/SettingsBar/settingsBar";
import Chatbar from "@/components/ChatBar/Chatbar";
import React, {useState} from "react";
import UserSettings from "@/components/UserSettings/userSettings";
import ChatSettings from "@/components/ChatSettings/chatSettings";
import {Layouts} from "@/types";

function Page() {
  const [layout, setLayout] = useState(Layouts.CHAT);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        {/* SIDEBAR */}
        <SettingsBar setLayout={setLayout} />

        {layout === Layouts.PROFILE && <UserSettings />}
        {layout === Layouts.SETTINGS && <ChatSettings />}

        {layout === Layouts.CHAT && <Chatbar />}
        <Messages />
      </div>
    </div>
  );
}

export default Page;
