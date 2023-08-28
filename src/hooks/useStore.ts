'use client';
import useGeneralSettingStore from '@/store/useGeneralSettingStore';
import useUserIdentityStore from '@/store/useUserIdentityStore';

export const useUser = () => useUserIdentityStore((state) => state);
export const useGeneralSetting = () => useGeneralSettingStore((state) => state);
