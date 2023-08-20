/* eslint-disable @next/next/no-img-element */
import { IPostData } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
   AiFillDelete,
   AiFillEye,
   AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { format } from 'date-fns';
import useDebounce from '@/hooks/useDebounce';
import { mutate } from 'swr';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import { BiSolidEditAlt } from 'react-icons/bi';

interface IManagePostProps {
   apiResponse: IPostData[];
   loading: boolean;
   totalPage: number;
}

const ManagePosts = ({ apiResponse, loading, totalPage }: IManagePostProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(loading);
   const [posts, setPosts] = useState<IPostData[]>([]);
   const [postId, setPostId] = useState<String[]>([]);
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('desc');
   const [searchKeyword, setSearchKeyword] = useState<string>('');
   const debounceSearch: string = useDebounce(searchKeyword, 1000);
   const searchParam = useSearchParams();
   const router = useRouter();
   const [take, setTake] = useState<number>(10);
   let page = Number(searchParam.get('page')) || 1;

   useEffect(() => {
      setIsLoading(loading);
      if (!loading) {
         setPosts(apiResponse);
      }
   }, [apiResponse, loading]);

   useEffect(() => {
      const handleSortAndOrder = async () => {
         const response = await fetch(
            `/api/posts/?sortby=${sort}&&order=${order}`,
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();

         setPosts(data?.posts);
      };
      if (sort !== '') handleSortAndOrder();
   }, [sort, setSort, order, setOrder]);

   useEffect(() => {
      const handleSearch = async () => {
         if (debounceSearch !== '') {
            const response = await fetch(
               `/api/posts/?search=${debounceSearch}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            );

            const data = await response.json();
            setPosts(data?.posts);
         }
      };
      if (debounceSearch !== '' && debounceSearch.length > 2) {
         handleSearch();
      } else {
         setPosts(apiResponse);
      }
   }, [debounceSearch]);

   const handleSelectPost = (
      event: React.ChangeEvent<HTMLInputElement>,
      postId: string
   ) => {
      const isChecked = event.target.checked;

      if (isChecked) {
         setPostId((prevPostId) => [...prevPostId, postId]);
      } else {
         setPostId((prevPostId) => prevPostId.filter((id) => id !== postId));
      }
   };

   const handleSelectAllPost = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      if (isChecked) {
         const getAllPostId = posts.map((item) => {
            return item.id;
         });
         setPostId(getAllPostId);
      } else {
         setPostId([]);
      }
   };

   const handleDelete = (postId: string, title: string) => {
      Swal.fire({
         title: 'Hapus artikel?',
         text: `Artikel ${title} akan di hapus secara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Hapus',
      }).then(async (result) => {
         if (result.isConfirmed) {
            await fetch(`/api/posts/${postId}`, {
               method: 'DELETE',
            });
         }
      });
   };

   const handleMultipleDelete = async () => {
      Swal.fire({
         title: 'Apakah Anda yakin?',
         text: `Hapus semua post yang di centang!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch('/api/posts', {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ postId }),
            });
            if (response.ok) {
               mutate('/api/posts');
               Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
         }
      });
   };

   useEffect(() => {
      const handlePagination = async () => {
         setIsLoading(true);
         const response = await fetch(
            `/api/posts/?sortby=${sort}&&order=${order}&&page=${page}&&take=${take}`,
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();
         if (response.ok) {
            setIsLoading(false);
            setPosts(data.posts);
         } else {
            setIsLoading(false);
         }
      };
      if (page > 1) handlePagination();
   }, [page]);

   const handleNextNavigation = () => {
      router.push(`?page=${page + 1}`);
   };
   const handlePrevNavigation = () => {
      if (page > 1) {
         router.push(`?page=${page - 1}`);
         if (page === 2) {
            router.push('/posts/manage-posts');
            setPosts(apiResponse);
         }
      }
   };

   return (
      <div>
         <div className='flex flex-col lg:flex-row justify-between items-center mb-[20px] gap-5 font-medium'>
            <div className='flex gap-5 items-center'>
               <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className='select select-bordered'
                  name='sort'
                  id='sort'
               >
                  <option value=''>Urut berdasarkan</option>
                  <option value='title'>Judul</option>
                  <option value='status'>Status</option>
                  <option value='updateAt'>Pembaruan terakhir</option>
               </select>
               <select
                  className='select select-bordered'
                  name='order'
                  id='order'
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
               >
                  <option value='asc'>Naik</option>
                  <option value='desc'>Menurun</option>
               </select>
               <button
                  disabled={postId.length === 0}
                  className='btn capitalize'
                  onClick={handleMultipleDelete}
               >
                  Hapus {postId.length !== 0 && postId.length}
               </button>
            </div>
            <div className='flex items-center gap-5'>
               <input
                  className='input input-bordered'
                  type='search'
                  placeholder='Cari artikel'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
               />
            </div>
         </div>
         {posts?.length === 0 && !isLoading ? (
            <div className='flex flex-col gap-2 p-5 justify-center items-center'>
               <h2 className='text-lg font-medium text-gray-500'>
                  Tidak tersedia
               </h2>
               <Link href='/cars/add-new-car'>
                  <button className='btn'>Tambah artikel baru</button>
               </Link>
            </div>
         ) : null}
         {isLoading ? (
            <div className='flex justify-center items-center'>
               <AiOutlineLoading3Quarters className='animate-spin' size={30} />
            </div>
         ) : null}
         <div className='overflow-x-auto font-medium'>
            {posts?.length !== 0 && !isLoading ? (
               <table className='table'>
                  {/* head */}
                  <thead className='text-base text-gray-800'>
                     <tr>
                        <th>
                           <label>
                              <input
                                 type='checkbox'
                                 className='checkbox'
                                 onChange={(e) => handleSelectAllPost(e)}
                              />
                           </label>
                        </th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Tanggal Update</th>
                        <th>Kategori</th>
                        <th>User</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* row 1 */}
                     {posts?.map((item) => (
                        <tr
                           className={`hover:bg-gray-50 ${
                              postId.includes(item.id) && 'bg-gray-100'
                           }`}
                           key={item.id}
                        >
                           <th>
                              <label>
                                 <input
                                    type='checkbox'
                                    checked={postId.includes(item.id)}
                                    className='checkbox'
                                    onChange={(e) =>
                                       handleSelectPost(e, item.id)
                                    }
                                 />
                              </label>
                           </th>
                           <td className='group'>
                              <Link href={`/posts/edit-post/${item.id}`}>
                                 <div className='flex items-center space-x-3'>
                                    <div className='avatar'>
                                       <div className='mask w-20 h-12 rounded-sm object-cover'>
                                          <img src={item.image} alt='' />
                                       </div>
                                    </div>
                                    <div>
                                       <div className='capitalize'>
                                          {item.title}
                                       </div>
                                    </div>
                                    <button className='opacity-0 group-hover:opacity-100 btn btn-xs'>
                                       <BiSolidEditAlt size={20} />
                                    </button>
                                 </div>
                              </Link>
                           </td>
                           <td>
                              {item.published ? (
                                 <button className='btn btn-xs btn-success text-white'>
                                    Published
                                 </button>
                              ) : (
                                 <button className='btn btn-xs btn-error text-white'>
                                    Draft
                                 </button>
                              )}
                           </td>
                           <td>
                              {format(
                                 new Date(item.updateAt),
                                 'd MMMM yyyy HH:mm'
                              )}
                           </td>
                           <td>
                              <div className='flex gap-1'>
                                 {item.categories.length === 0 ? (
                                    <button className='btn btn-xs'>
                                       Tanpa kategori
                                    </button>
                                 ) : null}
                                 {item.categories
                                    .slice(0, 2)
                                    .map((category) => (
                                       <button
                                          className='btn btn-xs'
                                          key={category.id}
                                       >
                                          {category.categoryName}
                                       </button>
                                    ))}
                              </div>
                           </td>
                           <td>{item.username}</td>

                           <th>
                              <div className='opacity-50 hover:opacity-40 cursor-pointer flex gap-3'>
                                 <AiFillEye size={22} />
                                 <AiFillDelete
                                    size={20}
                                    onClick={() =>
                                       handleDelete(item.id, item.title)
                                    }
                                 />
                              </div>
                           </th>
                        </tr>
                     ))}
                  </tbody>
                  {/* foot */}
                  <tfoot className='text-base text-gray-800 font-medium'>
                     <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Tanggal Update</th>
                        <th>Kategori</th>
                        <th>User</th>
                        <th></th>
                     </tr>
                  </tfoot>
               </table>
            ) : null}

            <div className='join flex justify-center mt-[40px]'>
               <button
                  disabled={page === 1}
                  onClick={handlePrevNavigation}
                  className='join-item btn'
               >
                  «
               </button>
               <button className='join-item btn'>
                  {page === 0 ? 'Halaman 1' : `Halaman ${page}`}
               </button>
               <button
                  disabled={page === totalPage}
                  onClick={handleNextNavigation}
                  className='join-item btn'
               >
                  »
               </button>
            </div>
         </div>
      </div>
   );
};

export default ManagePosts;
