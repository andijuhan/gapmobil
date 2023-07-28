'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import Toast from './Toast';

const ManageCarModel = () => {
   const [carBrandName, setCarBrandName] = useState('');
   const [modelName, setModelName] = useState('');
   const [warning, setWarning] = useState(false);
   const [editMode, setEditMode] = useState(false);
   const { data: carBrandOption } = useSWR('/api/cars/brands', fetcher);
   const { data: carModel } = useSWR(
      `/api/cars/brands/model?brand=${carBrandName}`,
      fetcher
   );

   console.log(carModel);
   console.log('carBrandNaem:' + carBrandName);

   const handleAddNew = async () => {
      if (modelName === '' || carBrandName === '') {
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
            body: JSON.stringify({ modelName, carBrandName }),
         });

         if (response.ok) {
            mutate(`/api/cars/brands/model?brand=${carBrandName}`);
            setModelName('');
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
                     onClick={() => {}}
                     className='absolute -top-2 -right-2 z-10 text-base-100 btn btn-circle btn-xs btn-warning hidden group-hover:block'
                  >
                     x
                  </button>
                  <button onClick={() => {}} className='btn btn-sm'>
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
            value={carBrandName}
            onChange={(e) => setCarBrandName(e.target.value)}
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
                  editMode ? () => {} : handleAddNew();
               }
            }}
         />
         <button
            type='button'
            onClick={handleAddNew}
            className='btn btn-primary w-min'
         >
            Add
         </button>
         <Toast
            show={warning}
            mode='WARNING'
            message='Silahkan pilih merek mobil'
         />
      </div>
   );
};

export default ManageCarModel;
