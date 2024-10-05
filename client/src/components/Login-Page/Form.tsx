"use client";
import React, {useEffect, useState} from "react";
import Avatar from "../Avatar";
import {fetchUser, handleSubmit} from "@/lib/fetchers";
import {useRouter} from "next/navigation";
import {io} from "socket.io-client";
import {useCookies} from "react-cookie";
import {useUser} from "@/store/userStore";

function Form() {
  const [avatarId, setAvatarId] = useState((Math.random() * 20).toFixed());
  const router = useRouter();
  const socket = io("http://localhost:4000");
  const [cookie] = useCookies(["user"]);
  const [errorLogin, setErrorLogin] = useState(false);
  const {myUser, setUser} = useUser((state) => ({
    myUser: state.myUser,
    setUser: state.setUser,
  }));
  useEffect(() => {
    console.log("cookie.user ---", cookie.user);
    if (cookie.user) {
      if (!myUser) {
        fetchUser(cookie, setUser);
      }
      router.push("/chat");
    }
  }, [cookie.user]);
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, avatarId)
          .then((res) => {
            console.log("user res ---", res);

            setUser(res);
            socket.emit("joined", `${res?.name}`);
            router.push("/chat");
          })
          .catch((e) => {
            setErrorLogin(true);
          });
      }}
      className="flex flex-col gap-5"
    >
      {/* AVATAR */}
      <Avatar avatarId={avatarId} setAvatarId={setAvatarId} />
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            required
            onChange={() => {
              setErrorLogin(false);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-lg">Put your email.</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
      {errorLogin && (
        <label className="label">
          <span className="label-text text-lg">Error accured, try again.</span>
        </label>
      )}
      <button className="btn">Login</button>
    </form>
  );
}

export default Form;
