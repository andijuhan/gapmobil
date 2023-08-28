import { create } from 'zustand';

interface UserState {
   id: string;
   username: string;
   email: string;
   role: string;
   setId: (value: string) => void;
   setUsername: (value: string) => void;
   setEmail: (value: string) => void;
   setRole: (value: string) => void;
}

const useUserIdentityStore = create<UserState>((set) => ({
   id: '',
   username: '',
   email: '',
   role: '',
   setId: (value: string) => set({ id: value }),
   setUsername: (value: string) => set({ username: value }),
   setEmail: (value: string) => set({ email: value }),
   setRole: (value: string) => set({ role: value }),
}));

export default useUserIdentityStore;
