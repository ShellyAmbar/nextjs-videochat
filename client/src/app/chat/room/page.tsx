"use client";

import {useEffect, useState} from "react";

import {useUser} from "@/store/userStore";

export default function Page() {
  // TODO: get user input for room and name
  const myUser = useUser((state) => state.myUser);

  const room = "quickstart-room";
  const name = myUser?.name;
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return <></>;
}
