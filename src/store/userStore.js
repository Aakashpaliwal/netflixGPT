import { create } from "zustand";
import {persist} from "zustand/middleware"

const useUserStore = create(
  persist(
    (set) => ({
      userName: null,
      setUserName: (name) => {
        console.log(name), set({ userName: name });
      },
    }),
    {
      naame: "user-storage",
    }
  )
);

export default useUserStore;
