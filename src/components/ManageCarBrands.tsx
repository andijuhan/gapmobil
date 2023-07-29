'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import Toast from './Toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Dialog from './Dialog';

const ManageCarBrands = () => {
   const [brandName, setBrandName] = useState('');
   const [brandId, setBrandId] = useState<string | null>(null);
   const [editMode, setEditMode] = useState(false);
   const [warning, setWarning] = useState(false);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const { data, isLoading } = useSWR('/api/cars/brands', fetcher);
   const [dialog, setDialog] = useState(false);

   const handleDelete = async () => {
      const response = await fetch(`/api/cars/brands/${brandId}`, {
         method: 'DELETE',
      });

      if (response.ok) {
         mutate('/api/cars/brands');
         mutate(`/api/cars/brands/model?brand=${brandName}`);
         setBrandName('');
         setBrandId(null);
      }
   };

   const handleClickEdit = (id: string, value: string) => {
      setBrandName(value);
      setBrandId(id);
      setEditMode(!editMode);
      if (editMode) {
         setBrandName('');
      }
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
         if (response.status === 409) {
            const data = await response.json();
            setErrorMessage(data.message);
            setError(true);
            setTimeout(() => {
               setError(false);
            }, 3000);
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
         if (response.status === 409) {
            const data = await response.json();
            setErrorMessage(data.message);
            setError(true);
            setTimeout(() => {
               setError(false);
            }, 3000);
         }
      } catch (error) {
         console.log('Gagal menambah data:' + error);
      }
   };

   const confirmDelete = (id: string, brandNameToDelete: string) => {
      setDialog(true);
      setBrandId(id);
      setBrandName(brandNameToDelete);
   };

   return (
      <div className='bg-white p-4 lg:p-7 rounded-lg flex flex-col gap-5'>
         <h2 className='text-lg'>Merek mobil</h2>
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
                     onClick={() => confirmDelete(item?.id, item?.brandName)}
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
            className={`btn ${
               editMode ? 'btn-secondary' : 'btn-primary'
            } w-min`}
         >
            {editMode ? 'Update' : 'Add'}
         </button>
         <Toast
            show={warning}
            mode='WARNING'
            message='Silahkan lengkapi data'
         />
         <Toast show={error} mode='WARNING' message={errorMessage} />
         <Dialog
            show={dialog}
            setShow={setDialog}
            title={`Hapus merek ${brandName} ?`}
            message={`Menghapus ${brandName} akan menghapus semua model mobil ${brandName}`}
            callback={handleDelete}
         />
      </div>
   );
};

export default ManageCarBrands;
