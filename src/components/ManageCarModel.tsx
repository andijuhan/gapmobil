'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import Swal from 'sweetalert2';

const ManageCarModel = () => {
   const [brandName, setBrandName] = useState('');
   const [modelName, setModelName] = useState('');
   const [selectedModelName, setSelectedModelName] = useState('');
   const [modelId, setModelId] = useState<string | null>(null);
   const [warningMessage, setWarningMessage] = useState('');
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
      setSelectedModelName(value);
      setModelName(value);
      setModelId(id);
      setEditMode(true);
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
         if (response.status === 409 || response.status === 500) {
            const data = await response.json();
            setWarningMessage(data.message);
         }
      } catch (error: any) {
         console.log('Gagal menambah data:' + error);
      }
   };

   const handleAddNew = async () => {
      if (brandName === '') {
         setWarningMessage('Silahkan pilih merek mobil');

         return;
      } else if (modelName === '') {
         setWarningMessage('Kolom model mobil tidak boleh kosong');

         return;
      }
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
      } else {
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
         <h2 className='text'>Model mobil</h2>
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
            className='select select-bordered w-full max-w-xs'
            name='model'
            id='model'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
         >
            <option value=''>Pilih merek mobil</option>
            {(carBrandOption as any[])?.map((item) => (
               <option
                  className='uppercase'
                  key={item?.id}
                  value={item?.brandName}
               >
                  {item?.brandName}
               </option>
            ))}
         </select>
         {editMode ? (
            <label htmlFor='brandName'>
               Rubah model {selectedModelName} ke {modelName}
            </label>
         ) : (
            <label>Tambah model mobil</label>
         )}
         <input
            className='input input-bordered w-full max-w-xs'
            type='search'
            placeholder='Model mobil'
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            onKeyUp={(e) => {
               if (e.key === 'Enter') {
                  editMode ? handleEdite() : handleAddNew();
               }
            }}
         />
         <div className='flex gap-2'>
            <button
               type='button'
               onClick={editMode ? handleEdite : handleAddNew}
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

export default ManageCarModel;
