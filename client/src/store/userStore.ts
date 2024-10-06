import {selectedUserState, userState} from "@/types";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
export const useUser = create(
  persist(
    (set) => ({
      myUser: undefined,
      setUser: (user) => set({myUser: user}),
    }),
    {
      name: "User-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useAllUsers = create(
  persist(
    (set) => ({
      users: undefined,
      setUsers: (users: any) => set({users}),
    }),
    {
      name: "AllUsers-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useSelectedUser = create(
  persist(
    (set) => ({
      selectedUser: undefined,
      setSelectedUser: (user) => set({selectedUser: user}),
    }),
    {
      name: "SelectedUser-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useMessages = create(
  persist(
    (set) => ({
      messages: [],
      setMessages: (messages: any) => set({messages}),
    }),
    {
      name: "Messages-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
