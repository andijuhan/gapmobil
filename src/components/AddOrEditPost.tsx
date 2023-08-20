/* eslint-disable @next/next/no-img-element */
'use client';
import { createSlug, fetcher } from '@/utils';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import CloudinaryMediaLiblaryWidget from './CloudinaryMediaLiblaryWidget';
import Swal from 'sweetalert2';
import { useUser } from '@/hooks/useStore';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { ICategoryData, IPostData } from '@/types';
import { BiImageAdd } from 'react-icons/bi';
import Select from 'react-dropdown-select';

interface IAddOrEditPostProps {
   mode: 'ADD_NEW' | 'UPDATE';
   postId?: string;
}

const AddOrEditPost = ({ mode, postId }: IAddOrEditPostProps) => {
   const [title, setTitle] = useState<string>('');
   const [content, setContent] = useState<string | undefined>('');
   const [selectedCategories, setSelectedCategories] = useState<
      ICategoryData[]
   >([]);
   const [image, setImage] = useState<string[]>([]);
   const { username } = useUser();
   const [warningMessage, setWarningMessage] = useState<string>('');
   const router = useRouter();
   const [isLoading, setIsloading] = useState<boolean>(
      mode === 'ADD_NEW' ? false : true
   );
   const { data: dataCategories } = useSWR('/api/posts/category', fetcher);
   const [categories, setCategories] = useState<ICategoryData[]>([]);
   const [categoryName, setCategoryName] = useState<string>('');

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
         setSelectedCategories((prevSelectedCategories) => [
            ...prevSelectedCategories,
            data,
         ]);
      } else {
         setWarningMessage(data.message);
      }
   };

   useEffect(() => {
      const getPostById = async () => {
         try {
            const response = await fetch(`/api/posts/${postId}`);
            if (response.ok) {
               setIsloading(false);
            } else {
               router.push('/posts/manage-posts');
            }

            const data: IPostData = await response.json();
            if (response.ok) {
               setIsloading(false);
               setTitle(data?.title);
               setContent(data?.content);
               setImage([data?.image]);
               setSelectedCategories(data?.categories);
            }
         } catch (error) {
            console.log(error);
            setIsloading(false);
         }
      };
      if (mode === 'UPDATE') getPostById();
   }, [postId]);

   useEffect(() => {
      setCategories(dataCategories);
   }, [dataCategories]);

   const resetInput = () => {
      setTitle('');
      setContent('');
      setSelectedCategories([]);
      setImage([]);
   };

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
         setIsloading(true);
         const selectedCategoryIds = selectedCategories.map((item: any) => {
            return item.id;
         });
         const slug = createSlug(title);
         const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               slug,
               published,
               title,
               content,
               categoryIds: selectedCategoryIds,
               image: image[0],
               username,
            }),
         });

         const data = await response.json();
         const message = published
            ? 'Post berhasil di publish!'
            : 'Post disimpan sebagai draft';

         if (response.ok) {
            setIsloading(false);
            Swal.fire('Sukses!', message, 'success');
            resetInput();
         } else {
            setIsloading(false);
            console.log(data.message);
         }
      }
   };

   const updateHandle = async (published: boolean) => {
      const isInputValidated = validateInput();
      const selectedCategoryIds = selectedCategories.map((item: any) => {
         return item.id;
      });

      if (isInputValidated) {
         setIsloading(true);
         const response = await fetch(`/api/posts/${postId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               published,
               title,
               content,
               categoryIds: selectedCategoryIds,
               image: image[0],
            }),
         });

         const message = published
            ? 'Post berhasil diupdate!'
            : 'Post disimpan sebagai draft!';

         if (response.ok) {
            setIsloading(false);
            Swal.fire('Sukses!', message, 'success');
         } else {
            setIsloading(false);
         }
      }
   };

   return (
      <div className='p-2 lg:p-7 rounded-lg mt-5 text-sm'>
         <h1 className='text-xl font-medium mb-7'>
            {mode === 'ADD_NEW' ? 'Tambah Artikel' : 'Perbarui Artikel'}
         </h1>
         <div className='flex gap-5 font-medium'>
            <div className='w-[70%] px-4 py-8 lg-p-7 bg-white rounded-lg flex flex-col gap-5'>
               <div className='w-full flex flex-col gap-3'>
                  <CloudinaryMediaLiblaryWidget
                     images={image}
                     setImages={() => {}}
                  >
                     {(handleGalery) => (
                        <button
                           onClick={handleGalery}
                           className='btn normal-case'
                        >
                           Kelola gambar
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
               </div>

               <div className='w-full flex flex-col gap-3 mt-4'>
                  <label htmlFor='title'>Judul</label>
                  <input
                     name='title'
                     id='title'
                     type='text'
                     placeholder='Title'
                     className='input input-bordered'
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     disabled={isLoading}
                  />
               </div>
               <div className='w-full flex flex-col gap-3'>
                  <label htmlFor='content'>Konten</label>
                  <div
                     data-color-mode='light'
                     className='font-normal rounded-md focus:outline-none'
                  >
                     <MDEditor
                        height={500}
                        preview='edit'
                        value={content}
                        onChange={setContent}
                     />
                  </div>
               </div>
            </div>
            <div className='w-[30%] p-4 lg-p-7 bg-white rounded-lg flex flex-col gap-5'>
               <div className='w-full flex flex-col gap-3'>
                  <label htmlFor='category'>Kategori</label>
                  <Select
                     name='select'
                     disabled={isLoading}
                     options={categories}
                     labelField='categoryName'
                     valueField='id'
                     multi
                     onChange={(values: any) => setSelectedCategories(values)}
                     values={selectedCategories}
                     placeholder='Pilih kategori'
                     style={{
                        borderRadius: '8px',
                        padding: '14px',
                        fontSize: '16px',
                     }}
                  />
               </div>
               <div className='flex flex-col gap-5'>
                  <label htmlFor='category'>Tambah kategori</label>
                  <div className='flex gap-3'>
                     <input
                        className={`input input-bordered w-full max-w-xs`}
                        type='text'
                        name='categoryName'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        onKeyUp={(e) => {
                           if (e.key === 'Enter') {
                              handleAddCategory();
                           }
                        }}
                     />
                     <button
                        type='button'
                        onClick={handleAddCategory}
                        className='btn btn-primary'
                     >
                        Tambah
                     </button>
                  </div>
               </div>
               <div className='flex flex-col gap-5 items-center justify-center p-[50px] rounded-lg border'>
                  {image.length === 0 ? (
                     <div className='flex flex-col items-center gap-2'>
                        <CloudinaryMediaLiblaryWidget
                           images={image}
                           setImages={setImage}
                        >
                           {(handleGalery) => (
                              <button onClick={handleGalery} className='btn'>
                                 <BiImageAdd size={30} />
                              </button>
                           )}
                        </CloudinaryMediaLiblaryWidget>
                        <span>Gambar unggulan</span>
                     </div>
                  ) : null}

                  <div className='relative'>
                     {image.length === 0 ? null : (
                        <>
                           <button
                              onClick={removeFeaturedImage}
                              className='absolute w-7 h-7 -top-1 -right-1 rounded-sm p-1 bg-red-500 text-white'
                           >
                              X
                           </button>
                           <img
                              className='rounded-sm w-full'
                              src={image[0]}
                              alt=''
                           />
                        </>
                     )}
                  </div>
               </div>
               <div className='flex gap-3'>
                  <button
                     onClick={
                        mode === 'ADD_NEW'
                           ? () => publishHandle(true)
                           : () => updateHandle(true)
                     }
                     type='button'
                     className='btn btn-primary'
                     disabled={isLoading}
                  >
                     {mode === 'ADD_NEW' ? 'Publis' : 'Perbarui'}
                  </button>
                  <button
                     onClick={
                        mode === 'ADD_NEW'
                           ? () => publishHandle(false)
                           : () => updateHandle(false)
                     }
                     type='button'
                     className='btn'
                     disabled={isLoading}
                  >
                     Draf
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddOrEditPost;
