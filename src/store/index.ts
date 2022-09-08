import create from "zustand";
import { persist } from "zustand/middleware";

const createCommonStateSlice = (set: any, get: any) => ({
  logined: "1212",
  setLogined: (newLogined: any) => {
    set({ logined: newLogined });
  },
});

const useStore = create(
  persist(
    (set, get) => ({
      ...createCommonStateSlice(set, get),
    }),
    {
      name: "useStore",
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export { useStore };
