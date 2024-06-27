import { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

interface UserState {
  userData: UserCredential | null;
  setUserData: (data: UserCredential) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userData: null,
  setUserData: (data: UserCredential) => set({ userData: data }),
}));
