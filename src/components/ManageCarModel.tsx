'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import Toast from './Toast';

const ManageCarModel = () => {
   const [brandName, setBrandName] = useState('');
   const [modelName, setModelName] = useState('');
   const [modelId, setModelId] = useState<string | null>(null);
   const [warning, setWarning] = useState(false);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [editMode, setEditMode] = useState(false);
   const { data: carBrandOption } = useSWR('/api/cars/brands', fetcher);
   const { data: carModel } = useSWR(
      `/api/cars/brands/model?brand=${brandName}`,
      fetcher
   );

   const handleDelete = async (id: string) => {
      const response = await fetch(`/api/cars/brands/model/${id}`, {
         method: 'DELETE',
      });

      if (response.ok) {
         mutate(`/api/cars/brands/model?brand=${brandName}`);
      }
   };

   const handleClickEdit = (id: string, value: string) => {
      setModelName(value);
      setModelId(id);
      setEditMode(!editMode);
      if (editMode) {
         setModelName('');
      }
   };

   const handleEdite = async () => {
      try {
         const response = await fetch(`/api/cars/brands/model/${modelId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modelName }),
         });

         if (response.ok) {
            mutate(`/api/cars/brands/model?brand=${brandName}`);
            setModelName('');
            setEditMode(false);
            setModelId(null);
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
      if (modelName === '' || brandName === '') {
         setWarning(true);
         setTimeout(() => {
            setWarning(false);
         }, 3000);
         return;
      }
      try {
         const response = await fetch('/api/cars/brands/model', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               modelName: modelName,
               carBrandName: brandName,
            }),
         });

         if (response.ok) {
            mutate(`/api/cars/brands/model?brand=${brandName}`);
            setModelName('');
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

   return (
      <div className='bg-white p-4 lg:p-7 rounded-lg flex flex-col gap-5'>
         <h2 className='text-lg'>Brand model</h2>
         <div className='flex gap-2 flex-wrap'>
            {(carModel as any[])?.map((item) => (
               <div
                  key={item?.id}
                  className='relative group tooltip tooltip-bottom'
                  data-tip='Click to edit'
               >
                  <button
                     onClick={() => handleDelete(item?.id)}
                     className='absolute -top-2 -right-2 z-10 text-base-100 btn btn-circle btn-xs btn-warning hidden group-hover:block'
                  >
                     x
                  </button>
                  <button
                     onClick={() => {
                        handleClickEdit(item?.id, item?.modelName);
                     }}
                     className={`btn btn-sm ${
                        modelId === item?.id && editMode
                           ? 'btn-info text-base-100'
                           : ''
                     }`}
                  >
                     {item?.modelName}
                  </button>
               </div>
            ))}
         </div>
         <select
            className={`select select-bordered w-full max-w-xs ${
               warning && 'select-error'
            }`}
            name='model'
            id='model'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
         >
            <option value=''>Select brand</option>
            {(carBrandOption as any[])?.map((item) => (
               <option key={item?.id} value={item?.brandName}>
                  {item?.brandName}
               </option>
            ))}
         </select>
         <input
            className='input input-bordered w-full max-w-xs'
            type='text'
            placeholder='Brand Model'
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            onKeyUp={(e) => {
               if (e.key === 'Enter') {
                  editMode ? handleEdite() : handleAddNew();
               }
            }}
         />
         <button
            type='button'
            onClick={editMode ? handleEdite : handleAddNew}
            className={`btn ${
               editMode ? 'btn-secondary' : 'btn-primary'
            } w-min`}
         >
            {editMode ? 'Update' : 'Add'}
         </button>

         <Toast
            show={warning}
            mode='WARNING'
            message='Silahkan pilih merek mobil'
         />
         <Toast show={error} mode='WARNING' message={errorMessage} />
      </div>
   );
};

export default ManageCarModel;
