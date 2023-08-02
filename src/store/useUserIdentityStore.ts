import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
   username: string;
   email: string;
   role: string;
   setUsername: (value: string) => void;
   setEmail: (value: string) => void;
   setRole: (value: string) => void;
}

const useUserIdentityStore = create<UserState>((set) => ({
   username: '',
   email: '',
   role: '',
   setUsername: (value: string) => set({ username: value }),
   setEmail: (value: string) => set({ email: value }),
   setRole: (value: string) => set({ role: value }),
}));

export default useUserIdentityStore;
