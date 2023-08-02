'use client';
import useUserIdentityStore from '@/store/useUserIdentityStore';

export const useUser = () => useUserIdentityStore((state) => state);
