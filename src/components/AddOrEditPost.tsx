/* eslint-disable @next/next/no-img-element */
'use client';
import { convertISOdateToStandar, createSlug } from '@/utils';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import CloudinaryMediaLiblaryWidget from './CloudinaryMediaLiblaryWidget';
import Swal from 'sweetalert2';
import { useUser } from '@/hooks/useStore';
import useSWR from 'swr';

interface IAddOrEditPostProps {
   mode: 'ADD_NEW' | 'UPDATE';
   postId?: string;
}

const AddOrEditPost = ({ mode }: IAddOrEditPostProps) => {
   const [title, setTitle] = useState<string>('');
   const [content, setContent] = useState<string | undefined>('');
   const [category, setCategory] = useState<string>('');
   const [image, setImage] = useState<string[]>([]);
   const { username } = useUser();
   const [warningMessage, setWarningMessage] = useState<string>('');

   const removeFeaturedImage = () => {
      const newArray = [...image];
      newArray.splice(0, 1);
      setImage(newArray);
   };

   const validateInput = () => {
      if (title === '') {
         setWarningMessage('Judul post tidak boleh kosong');
         return false;
      } else if (content === '') {
         setWarningMessage('Konten post tidak boleh kosong');
         return false;
      } else if (image.length === 0) {
         setWarningMessage('Pilih gambar post');
         return false;
      } else {
         setWarningMessage('');
         return true;
      }
   };

   useEffect(() => {
      if (warningMessage !== '') {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: warningMessage,
         });
         setWarningMessage('');
      }
   }, [warningMessage, setWarningMessage]);

   const publishHandle = async (published: boolean) => {
      const isInputValidated = validateInput();

      if (isInputValidated) {
         const slug = createSlug(title);
         const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               slug,
               status: published,
               title,
               content,
               category,
               image: image[0],
               username,
            }),
         });

         const data = await response.json();

         if (response.ok) {
            Swal.fire('Good job!', 'Post berhasil di publish!', 'success');
         } else {
            console.log(data.message);
         }
      }
   };

   return (
      <div className='p-2 lg:p-7 rounded-lg h-full mt-5 text-sm'>
         <h1 className='text-xl font-medium mb-7'>
            {mode === 'ADD_NEW' ? 'Tambah post' : 'Update post'}
         </h1>
         <div className='flex gap-5 font-medium'>
            <div className='w-[70%] px-4 py-8 lg-p-7 bg-white rounded-lg flex flex-col gap-5'>
               <div className='w-full flex items-center mt-4'>
                  <label className='w-[10%]' htmlFor='title'>
                     Gambar
                  </label>
                  <CloudinaryMediaLiblaryWidget
                     images={image}
                     setImages={() => {}}
                  >
                     {(handleGalery) => (
                        <button onClick={handleGalery} className='btn'>
                           Gambar Post
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
               </div>

               <div className='w-full flex items-center mt-4'>
                  <label className='w-[10%]' htmlFor='title'>
                     Judul
                  </label>
                  <input
                     name='title'
                     id='title'
                     type='text'
                     placeholder='Title'
                     className='input input-bordered w-[90%]'
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className='w-full flex'>
                  <label className='w-[10%]' htmlFor='content'>
                     Konten
                  </label>
                  <div
                     data-color-mode='light'
                     className='font-normal rounded-md focus:outline-none w-[90%]'
                  >
                     <MDEditor
                        height={500}
                        preview='edit'
                        value={content}
                        onChange={setContent}
                     />
                  </div>
               </div>
               <div className='w-full flex items-center'>
                  <label className='w-[10%]' htmlFor='category'>
                     Kategori
                  </label>
                  <select
                     name='category'
                     id='category'
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className='select select-bordered w-[30%]'
                  ></select>
               </div>
            </div>
            <div className='w-[30%] p-4 lg-p-7 bg-white rounded-lg'>
               <div className='flex flex-col gap-5 items-center justify-center p-[50px] rounded-lg border'>
                  <CloudinaryMediaLiblaryWidget
                     images={image}
                     setImages={setImage}
                  >
                     {(handleGalery) => (
                        <button onClick={handleGalery} className='btn'>
                           Featured Image
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
                  <div className='relative'>
                     {image.length === 0 ? null : (
                        <>
                           <button
                              onClick={removeFeaturedImage}
                              className='absolute w-7 h-7 -top-1 -right-1 rounded-full p-1 bg-red-500 text-white'
                           >
                              X
                           </button>
                           <img
                              className='rounded-lg w-40'
                              src={image[0]}
                              alt=''
                           />
                        </>
                     )}
                  </div>
               </div>
               <div className='flex gap-3 mt-5'>
                  <button
                     onClick={() => publishHandle(true)}
                     type='button'
                     className='btn btn-primary'
                  >
                     Publish
                  </button>
                  <button type='button' className='btn'>
                     Draft
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddOrEditPost;
