import { create } from 'zustand';

interface GeneralSettingState {
   title: string;
   description: string;
   setTitle: (value: string) => void;
   setDescription: (value: string) => void;
}

const useGeneralSettingStore = create<GeneralSettingState>((set) => ({
   title: '',
   description: '',
   setTitle: (value: string) => set({ title: value }),
   setDescription: (value: string) => set({ description: value }),
}));

export default useGeneralSettingStore;
