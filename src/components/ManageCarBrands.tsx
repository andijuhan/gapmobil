'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useGeneralSetting } from '@/hooks/useStore';

const ManageCarBrands = () => {
   const [brandName, setBrandName] = useState('');
   const [selectedBrandName, setSelectedBrandName] = useState('');
   const [brandId, setBrandId] = useState<string | null>(null);
   const [editMode, setEditMode] = useState(false);
   //const [warning, setWarning] = useState(false);
   const [warningMessage, setWarningMessage] = useState('');
   const { data, isLoading } = useSWR('/api/cars/brands', fetcher);
   const { title } = useGeneralSetting();

   useEffect(() => {
      document.title = 'Kelola Merek Mobil - ' + title;
   }, [title]);

   const handleDelete = async (brandId: string, title: string) => {
      Swal.fire({
         title: 'Hapus merek?',
         text: `Merek ${title} akan di hapus secara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Hapus',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch(`/api/cars/brands/${brandId}`, {
               method: 'DELETE',
            });
            if (response.ok) {
               mutate('/api/cars/brands');
               mutate(`/api/cars/brands/model?brand=${selectedBrandName}`);
               setBrandName('');
               setBrandId(null);
            }
         }
      });
   };

   const handleClickEdit = (id: string, value: string) => {
      setSelectedBrandName(value);
      setBrandName(value);
      setBrandId(id);
      setEditMode(true);
   };

   const handleEdite = async () => {
      const response = await fetch(`/api/cars/brands/${brandId}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ brandName }),
      });

      if (response.ok) {
         mutate('/api/cars/brands');
         setEditMode(false);
         setBrandId(null);
      }
      if (response.status === 409) {
         const data = await response.json();
         setWarningMessage(data.message);
      }
   };

   const handleAddNew = async () => {
      if (brandName === '') {
         setWarningMessage('Kolom merek mobil tidak boleh kosong');

         return;
      }
      const response = await fetch('/api/cars/brands', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ brandName }),
      });

      if (response.ok) {
         mutate('/api/cars/brands');
         setBrandName('');
      }
      if (response.status === 409) {
         const data = await response.json();
         setWarningMessage(data.message);
      }
   };

   useEffect(() => {
      if (warningMessage !== '') {
         Swal.fire({
            icon: 'error',
            title: 'Peringatan!',
            text: warningMessage,
         });
         setWarningMessage('');
      }
   }, [warningMessage, setWarningMessage]);

   return (
      <div className='bg-white p-4 lg:p-7 rounded-lg flex flex-col gap-5'>
         <h2 className='text'>Daftar merek mobil</h2>
         <div className='flex gap-2 flex-wrap'>
            {isLoading && (
               <div className='flex w-full justify-center items-center py-5'>
                  <AiOutlineLoading3Quarters
                     className='animate-spin'
                     size={30}
                  />
               </div>
            )}
            {(data as any[])?.map((item: any) => (
               <div
                  key={item?.id}
                  className='relative group tooltip tooltip-bottom'
                  data-tip='Click to edit'
               >
                  <button
                     onClick={() => handleDelete(item?.id, item?.brandName)}
                     className='absolute -top-2 -right-2 z-10 text-base-100 btn btn-circle btn-xs btn-warning hidden group-hover:block'
                  >
                     x
                  </button>
                  <button
                     onClick={() => handleClickEdit(item.id, item?.brandName)}
                     className={`btn btn-sm ${
                        brandId === item?.id && editMode
                           ? 'btn-info text-base-100'
                           : ''
                     }`}
                  >
                     {item?.brandName}
                  </button>
               </div>
            ))}
         </div>
         {editMode ? (
            <label htmlFor='brandName'>
               Rubah merek {selectedBrandName} ke {brandName}
            </label>
         ) : (
            <label>Tambah merek mobil</label>
         )}
         <input
            id='brandName'
            name='brandName'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            onKeyUp={(e) => {
               if (e.key === 'Enter') {
                  editMode ? handleEdite() : handleAddNew();
               }
            }}
            className='input input-bordered w-full max-w-xs'
            type='search'
            placeholder='Merek mobil'
         />
         <div className='flex gap-2'>
            <button
               onClick={editMode ? handleEdite : handleAddNew}
               type='button'
               className={`btn ${
                  editMode ? 'btn-secondary' : 'btn-primary'
               } w-min`}
            >
               {editMode ? 'Perbarui' : 'Tambah'}
            </button>
            <button
               onClick={() => setEditMode(false)}
               className={`${!editMode && 'hidden'} btn w-min`}
            >
               Batal
            </button>
         </div>
      </div>
   );
};

export default ManageCarBrands;
