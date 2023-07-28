'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import Toast from './Toast';

const ManageCarBrands = () => {
   const [brandName, setBrandName] = useState('');
   const [brandId, setBrandId] = useState<string | null>(null);
   const [editMode, setEditMode] = useState(false);
   const [warning, setWarning] = useState(false);
   const { data } = useSWR('/api/cars/brands', fetcher);

   useEffect(() => {
      if (brandName === '') setEditMode(false);
   }, [brandName]);

   const handleDelete = async (id: string) => {
      const response = await fetch(`/api/cars/brands/${id}`, {
         method: 'DELETE',
      });

      if (response.ok) {
         mutate('/api/cars/brands');
      }
   };

   const handleClickEdit = (id: string, value: string) => {
      setBrandName(value);
      setBrandId(id);
      setEditMode(true);
   };

   const handleEdite = async () => {
      try {
         const response = await fetch(`/api/cars/brands/${brandId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brandName }),
         });

         if (response.ok) {
            mutate('/api/cars/brands');
            setBrandName('');
            setEditMode(false);
            setBrandId(null);
         }
      } catch (error) {
         console.log('Gagal mengedit data:' + error);
      }
   };

   const handleAddNew = async () => {
      if (brandName === '') {
         setWarning(true);
         setTimeout(() => {
            setWarning(false);
         }, 3000);
         return;
      }
      try {
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
      } catch (error) {
         console.log('Gagal menambah data:' + error);
      }
   };
   return (
      <div className='bg-white p-4 lg:p-7 rounded-lg flex flex-col gap-5'>
         <h2 className='text-lg'>Merek mobil</h2>
         <div className='flex gap-2 flex-wrap'>
            {(data as any[])?.map((item: any) => (
               <div
                  key={item?.id}
                  className='relative group tooltip tooltip-bottom'
                  data-tip='Click to edit'
               >
                  <button
                     onClick={() => handleDelete(item.id)}
                     className='absolute -top-2 -right-2 z-10 text-base-100 btn btn-circle btn-xs btn-warning hidden group-hover:block'
                  >
                     x
                  </button>
                  <button
                     onClick={() => handleClickEdit(item.id, item.brandName)}
                     className='btn btn-sm'
                  >
                     {item?.brandName}
                  </button>
               </div>
            ))}
         </div>
         <input
            name='brandName'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            onKeyUp={(e) => {
               if (e.key === 'Enter') {
                  editMode ? handleEdite() : handleAddNew();
               }
            }}
            className={`input input-bordered w-full max-w-xs ${
               warning && 'input-error'
            }`}
            type='text'
            placeholder='Merek mobil'
         />
         <button
            onClick={editMode ? handleEdite : handleAddNew}
            type='button'
            className='btn btn-primary w-min'
         >
            {editMode ? 'Update' : 'Add'}
         </button>
         <Toast
            show={warning}
            mode='WARNING'
            message='Silahkan lengkapi data'
         />
      </div>
   );
};

export default ManageCarBrands;
