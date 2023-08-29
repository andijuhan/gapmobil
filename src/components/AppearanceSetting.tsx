/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import CloudinaryMediaLiblaryWidget from './CloudinaryMediaLiblaryWidget';
import { AiOutlineClose } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useSwr from 'swr';
import { fetcher } from '@/utils';
import { useGeneralSetting } from '@/hooks/useStore';

const AppearanceSetting = () => {
   const [images, setImages] = useState<string[]>([]);
   const { data } = useSwr('/api/settings/appearance', fetcher);
   const { title: siteTitle } = useGeneralSetting();

   useEffect(() => {
      document.title = 'Pengaturan Tampilan - ' + siteTitle;
   }, [siteTitle]);

   useEffect(() => {
      if (data) {
         setImages(data[0]?.imageSlider);
      }
   }, [data]);

   const handleRemoveImages = (imgUrl: string) => {
      // Filter out the elements that don't match the value to remove
      const updatedArray = images.filter((element) => element !== imgUrl);

      // Update the state with the new array
      setImages(updatedArray);
   };

   const handleSave = async () => {
      const response = await fetch('/api/settings/appearance', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ images }),
      });
      if (response.ok) {
         Swal.fire('Sukses!', `Pengaturan berhasil di simpan!`, 'success');
      } else {
         Swal.fire('Error!', `Pengaturan gagal di simpan!`, 'error');
      }
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg text-sm'>
         <h2 className='text-lg mb-5 font-medium'>Gambar slider</h2>
         <div className='flex flex-col gap-5'>
            <CloudinaryMediaLiblaryWidget images={images} setImages={setImages}>
               {(handleGalery) => (
                  <button onClick={handleGalery} className='btn'>
                     Pilih gambar
                  </button>
               )}
            </CloudinaryMediaLiblaryWidget>
            {images.length > 0 ? (
               <div className='grid grid-rows-1 grid-cols-4 gap-2 group py-3'>
                  {images.slice(0, 8).map((item, index) => (
                     <div className='relative' key={index}>
                        <img
                           className='h-32 object-cover object-center rounded-sm'
                           src={item}
                           alt=''
                        />
                        <div
                           className='hidden group-hover:block absolute -top-1 -right-1 bg-red-500 text-base-100 rounded-sm p-1 cursor-pointer'
                           onClick={() => handleRemoveImages(item)}
                        >
                           <AiOutlineClose />
                        </div>
                     </div>
                  ))}
               </div>
            ) : null}

            <button
               type='button'
               onClick={handleSave}
               className='btn btn-primary w-min mt-5'
            >
               Simpan
            </button>
         </div>
      </div>
   );
};

export default AppearanceSetting;
