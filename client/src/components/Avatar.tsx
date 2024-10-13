"use client";
import {AvatarProps} from "@/types";
import Image from "next/image";
import React, {useEffect, useState} from "react";

function Avatar({avatarId, setAvatarId}: AvatarProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div
      onClick={() => {
        setAvatarId && setAvatarId((Math.random() * 20).toFixed());
      }}
      className="avatar cursor-pointer mx-auto mb-5 tooltip"
      data-tip="Click to regenerate avatar."
    >
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        {isClient && (
          <Image
            src={`https://robohash.org/${avatarId}.png`}
            width={256}
            height={256}
            alt="avatar"
            unoptimized
          />
        )}
      </div>
    </div>
  );
}

export default Avatar;
