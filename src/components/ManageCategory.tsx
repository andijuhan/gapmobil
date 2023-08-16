'use client';
import { createSlug, fetcher } from '@/utils';
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useSWR, { mutate } from 'swr';

const ManageCategory = () => {
   const [categoryName, setCategoryName] = useState<string>('');
   const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
   const [editMode, setEditMode] = useState<boolean>(false);
   const { data, isLoading } = useSWR('/api/posts/category', fetcher);

   const handleAddCategory = async () => {
      const slug = createSlug(categoryName);
      const response = await fetch('/api/posts/category', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ categoryName, slug }),
      });

      const data = await response.json();

      if (response.ok) {
         mutate('/api/posts/category');
         setCategoryName('');
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
         });
      }
   };

   const handleUpdateCategory = async () => {
      const response = await fetch(
         `/api/posts/category/${selectedCategoryId}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName }),
         }
      );
      const data = await response.json();

      if (response.ok) {
         mutate('/api/posts/category');
         setCategoryName('');
         setEditMode(false);
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
         });
      }
   };

   const handleDelete = async (id: string, categoryName: string) => {
      Swal.fire({
         title: `Hapus ${categoryName}?`,
         text: `Kategori ${categoryName} akan di hapus secara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch(`/api/posts/category/${id}`, {
               method: 'DELETE',
            });
            if (response.ok) {
               mutate('/api/posts/category');
               Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
         }
      });
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg text-sm'>
         <h2 className='text-lg mb-5'>
            {!editMode ? 'Add New Category' : 'Edit Category'}
         </h2>
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
                     onClick={() => {
                        handleDelete(item?.id, item?.categoryName);
                     }}
                     className='absolute -top-2 -right-2 z-10 text-base-100 btn btn-circle btn-xs btn-warning hidden group-hover:block'
                  >
                     x
                  </button>
                  <button
                     onClick={() => {
                        setEditMode(true);
                        setSelectedCategoryId(item?.id);
                        setCategoryName(item?.categoryName);
                     }}
                     className={`btn btn-sm `}
                  >
                     {item?.categoryName}
                  </button>
               </div>
            ))}
         </div>
         <div className='form-control gap-5 mt-5'>
            <div className='flex gap-5 items-center'>
               <input
                  className={`input input-bordered w-full max-w-xs`}
                  type='text'
                  name='categoryName'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        editMode ? () => {} : handleAddCategory();
                     }
                  }}
               />
            </div>
         </div>
         <div className='flex items-center mt-5 gap-5'>
            <button
               type='button'
               onClick={editMode ? handleUpdateCategory : handleAddCategory}
               className={`btn ${
                  editMode ? 'btn-secondary' : 'btn-primary'
               } w-max`}
            >
               {editMode ? 'Update Category' : 'Add Category'}
            </button>
            {editMode && (
               <button
                  onClick={() => {
                     setEditMode(false);
                     setCategoryName('');
                  }}
                  className='btn'
               >
                  Cancel
               </button>
            )}
         </div>
      </div>
   );
};

export default ManageCategory;
