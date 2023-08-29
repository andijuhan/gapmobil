'use client';
import { fetcher } from '@/utils';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import Swal from 'sweetalert2';
import { useGeneralSetting } from '@/hooks/useStore';

const GeneralSetting = () => {
   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const { data, isLoading } = useSWR('/api/settings/general', fetcher);
   const { title: siteTitle } = useGeneralSetting();

   useEffect(() => {
      document.title = 'Pengaturan Umum - ' + siteTitle;
   }, [siteTitle]);

   useEffect(() => {
      if ((data as any[])?.length > 0) {
         setTitle(data[0]?.title);
         setDescription(data[0]?.description);
      }
   }, [data]);

   console.log(data);

   const handleUpdate = async () => {
      const response = await fetch('/api/settings/general', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
         mutate('/api/settings/general');
         Swal.fire(
            'Sukses!',
            'Berhasil memperbarui pengaturan umum',
            'success'
         );
      }
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg text-sm'>
         <div className='form-control gap-5'>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='nama_website'>
                  Nama website
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='text'
                  disabled={isLoading}
                  name='nama_website'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='deskripsi_website'>
                  Deskripsi website
               </label>
               <input
                  disabled={isLoading}
                  className='input input-bordered w-full max-w-xs'
                  type='text'
                  name='deskripsi_website'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
            </div>
            <button
               onClick={handleUpdate}
               type='button'
               className='btn btn-primary w-min mt-5'
            >
               Simpan
            </button>
         </div>
      </div>
   );
};

export default GeneralSetting;
