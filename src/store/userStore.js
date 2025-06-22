import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isUserLoggednIn: 0,
      userName: null,
      userImageUrl: null,
      setUserName: (name) => {
        set({ userName: name });
      },
      setUserImageUrl: (url) => {
        console.log(url)
        set({ userImageUrl: url });
      },
      setIsUserLoggedIn: (value) => {
        set({ isUserLoggednIn : value})
      }
    }),
    {
      naame: "user-storage",
    }
  )
);

export default useUserStore;
