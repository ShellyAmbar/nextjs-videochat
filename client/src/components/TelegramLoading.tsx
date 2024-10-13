"use client";

import React from "react";
import loader from "../assets/Telegram.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), {ssr: false});
function TelegramLoading() {
  return <Lottie animationData={loader} loop={true} />;
}

export default TelegramLoading;
