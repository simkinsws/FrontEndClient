import create from "zustand";

const useUserStore = create((set) => ({
  userDetails: null, // Extra details for the user
  posts: [], // Posts created by the user

  setUserDetails: (details) => set(() => ({ userDetails: details })),
  setPosts: (posts) => set(() => ({ posts })),
}));

export default useUserStore;
