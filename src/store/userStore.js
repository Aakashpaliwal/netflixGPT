import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userName: null,
      userImageUrl: null,
      setUserName: (name) => {
        set({ userName: name });
      },
      setUserImageUrl: (url) => {
        set({ userImageUrl: url });
      },
    }),
    {
      naame: "user-storage",
    }
  )
);

export default useUserStore;
