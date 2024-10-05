import {handleSubmit, handleUpdateUser} from "@/lib/fetchers";
import React, {useEffect, useState} from "react";
import Avatar from "../Avatar";
import {useUser} from "@/store/userStore";

function UserSettings() {
  const {myUser, setUser} = useUser((state) => ({
    myUser: state.myUser,
    setUser: state.setUser,
  }));
  const [updatedName, setUpdatedName] = useState(myUser.name);
  const [updatedEmail, setUpdatedEmail] = useState(myUser.email);
  const [avatarId, setAvatarId] = useState(
    myUser?.imageId ? myUser?.imageId : 0
  );

  const [errorLogin, setErrorLogin] = useState(false);
  useEffect(() => {
    console.log("user ---- ", myUser);
  }, []);

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-gray-700 h-screen">
      <form
        onSubmit={(e) => {
          handleUpdateUser({
            name: e.target[0].value,
            email: e.target[1].value,
            avatarId,
          })
            .then(() => {
              alert("Updated!");
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
              placeholder={myUser.name}
              className="input input-bordered w-full"
              required
              value={updatedName}
              onChange={(e) => {
                setUpdatedName(e.target.value);
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
              placeholder={myUser.email}
              value={updatedEmail}
              onChange={(e) => {
                setUpdatedEmail(e.target.value);
                setErrorLogin(false);
              }}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        {errorLogin && (
          <label className="label">
            <span className="label-text text-lg">
              Error accured, try again.
            </span>
          </label>
        )}
        <button className="btn">Update</button>
      </form>
    </div>
  );
}

export default UserSettings;
