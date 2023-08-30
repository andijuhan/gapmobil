'use client';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import { AiFillDelete, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { useRouter, useSearchParams } from 'next/navigation';
import { IUserData } from '@/types';
import { useUser } from '@/hooks/useStore';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const CreateUser = () => {
   const { data } = useSWR('/api/users', fetcher);
   const [dataUser, setDataUser] = useState<IUserData[]>([]);
   const [totalPage, setTotalPage] = useState<number>(0);
   const router = useRouter();
   const { username } = useUser();
   const [searchKeyword, setSearchKeyword] = useState<string>('');
   const debounceSearch: string = useDebounce(searchKeyword, 1000);
   const searchParam = useSearchParams();
   const [take, setTake] = useState<number>(10);
   let page = Number(searchParam.get('page')) || 1;
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      setDataUser(data?.dataUser);
      setTotalPage(data?.totalPage);
      setIsLoading(false);
   }, [data]);

   useEffect(() => {
      const handleSearch = async () => {
         if (debounceSearch !== '') {
            const response = await fetch(
               `/api/users/?search=${debounceSearch}`
            );

            const data = await response.json();
            setDataUser(data?.dataUser);
         }
      };
      if (debounceSearch !== '' && debounceSearch.length > 2) {
         handleSearch();
      } else {
         setDataUser(data?.dataUser);
      }
   }, [debounceSearch]);

   const handleDelete = async (userId: string, title: string) => {
      Swal.fire({
         title: 'Hapus pengguna?',
         text: `Pengguna ${title} akan di hapus secara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Hapus',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch(`/api/users/${userId}`, {
               method: 'DELETE',
            });

            if (response.ok) {
               mutate('/api/users');
            }
         }
      });
   };

   const handleEdit = (id: string) => {
      router.push(`/admin/users/manage-users?id=${id}`);
   };

   useEffect(() => {
      const handlePagination = async () => {
         setIsLoading(true);
         const response = await fetch(`/api/users/?page=${page}&&take=${take}`);

         const data = await response.json();
         if (response.ok) {
            setIsLoading(false);
            setDataUser(data.dataUser);
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
            router.push('/users/manage-users');
            setDataUser(data.dataUser);
         }
      }
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg'>
         <h2 className='text mb-5 font-medium'>Kelola pengguna</h2>
         <div className='w-full flex justify-end mb-5'>
            <input
               className='input input-bordered w-full max-w-xs'
               placeholder='Cari pengguna'
               type='text'
               value={searchKeyword}
               onChange={(e) => setSearchKeyword(e.target.value)}
            />
         </div>
         {isLoading ? (
            <div className='flex justify-center items-center'>
               <AiOutlineLoading3Quarters className='animate-spin' size={30} />
            </div>
         ) : (
            <div className='flex flex-col gap-3'>
               <div className='overflow-x-auto'>
                  <table className='table'>
                     {/* head */}
                     <thead className='text-neutral'>
                        <tr>
                           <th>Pengguna</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Role</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {dataUser?.map((item, index) => (
                           <tr className='hover:bg-base-200' key={index}>
                              <td>{item.username}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>
                                 <span className='lowercase'>{item.role}</span>
                              </td>
                              <td>
                                 <div className='flex gap-5 opacity-50 hover:opacity-40'>
                                    {item.username !== username && (
                                       <>
                                          <button
                                             onClick={() =>
                                                handleDelete(
                                                   item.id,
                                                   item.username
                                                )
                                             }
                                          >
                                             <AiFillDelete size={20} />
                                          </button>
                                          <button
                                             onClick={() => handleEdit(item.id)}
                                          >
                                             <BiSolidEditAlt size={20} />
                                          </button>
                                       </>
                                    )}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}

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
   );
};

export default CreateUser;
