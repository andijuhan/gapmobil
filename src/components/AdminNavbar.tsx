'use client';
import { useGeneralSetting, useUser } from '@/hooks/useStore';
import { IUserData } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { useDetectClickOutside } from 'react-detect-click-outside';
import useSWR from 'swr';
import { fetcher } from '@/utils';

const AdminNavbar = ({ data }: { data: IUserData }) => {
   const router = useRouter();
   const [showDropDown, setShowDropDown] = useState(false);
   const { setId, setUsername, setEmail, setRole } = useUser();
   const { setTitle } = useGeneralSetting();
   const { data: dataGeneralSettings } = useSWR(
      '/api/settings/general',
      fetcher
   );

   const dropDownRef = useDetectClickOutside({
      onTriggered: () => setShowDropDown(false),
   });

   useEffect(() => {
      if (dataGeneralSettings) {
         setTitle(dataGeneralSettings[0]?.title);
      }
   }, [dataGeneralSettings]);

   useEffect(() => {
      setId(data.id);
      setUsername(data.username);
      setEmail(data.email);
      setRole(data.role);
   }, [data]);

   const handleLougout = async () => {
      const response = await fetch('/api/auth/logout');
      if (response.ok) {
         router.push('/auth');
      }
   };

   return (
      <div className='navbar bg-violet-700 text-gray-100 shadow-lg fixed z-20'>
         <div className='flex-1'>
            <a className='btn btn-ghost text-lg'>Dina motor</a>
         </div>
         <div className='flex-none relative text-sm mr-4'>
            <button
               onClick={() => setShowDropDown(!showDropDown)}
               className='btn btn-ghost font-medium dropdown lowercase flex items-center gap-2 text-base'
            >
               <FaUser size={20} />
            </button>
            <div
               className={`flex absolute top-10 right-5 bg-base-100 text-neutral px-10 py-4 rounded-sm shadow-sm ${
                  showDropDown ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
               } transition-all duration-200`}
               ref={dropDownRef}
            >
               <button
                  className='flex items-center gap-2'
                  onClick={handleLougout}
               >
                  Logout <MdLogout />
               </button>
            </div>
         </div>
      </div>
   );
};

export default AdminNavbar;
