import {userProps} from "@/types";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

export async function handleSubmit(e: any, avatarId: string) {
  return new Promise<void>(async (resolve, reject) => {
    e.preventDefault();
    console.log(e.target[1].value);
    try {
      await fetch("/auth", {
        method: "POST",
        body: JSON.stringify({
          name: e.target[0].value,
          email: e.target[1].value,
          isOnline: true,
          imageId: avatarId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            reject();
          }
        })
        .then((res) => {
          console.log("res ---", res);

          resolve(res);
        })
        .catch((e) => {
          console.log("error ----- ", e);
          reject();
        });
    } catch (err) {
      console.log(err);
    }
  });
}

export async function handleLogout({
  email,
  name,
  router,

  socket,
}: {
  email: string;
  name: string;
  router: AppRouterInstance;
  socket: any;
}) {
  try {
    await fetch("/logout", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    socket.emit("logout", `${name}`);

    router.push("/");
  } catch (err) {
    console.log(err);
  }
}

export async function handleUpdateUser({
  email,
  name,
  avatarId,
}: {
  email: string;
  name: string;
  avatarId: string;
}) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await fetch("/updateUser", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          imageId: avatarId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            reject();
          }
        })
        .then((res) => {
          console.log("res ---", res);

          resolve(res);
        })
        .catch((e) => {
          console.log("error ----- ", e);
          reject();
        });
    } catch (err) {
      console.log(err);
    }
  });
}

export async function fetchUser(
  cookie: {user?: any},
  setUser: {(user: any): void; (arg0: any): void}
) {
  const accessToken = cookie.user;
  console.log("accessToken", accessToken);

  const response = await fetch("/user", {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const user = await response.json();
  setUser(user[0]);
}

export async function fetchUsers(mySelf: userProps, setUsers: any) {
  const data = await fetch("/users");
  const myUsers = await data.json();
  setUsers(myUsers.filter((user: any) => user.email !== mySelf?.email));
}

export async function fetchMessages(
  sender: any,
  reciver: any,
  setMessages: any
) {
  if (sender && reciver) {
    try {
      const res = await fetch(
        `/messages?sender=${sender?.email}&reciver=${reciver?.email}`
      );
      const data = await res?.json();
      setMessages(data);
    } catch (err) {
      console.log(err);
      setMessages(null);
    }
  }
}
