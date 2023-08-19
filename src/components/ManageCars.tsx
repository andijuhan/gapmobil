/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
   AiFillDelete,
   AiFillEye,
   AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils';
import { ICarData } from '@/types';
import { mutate } from 'swr';
import Swal from 'sweetalert2';

interface IManageCarProps {
   apiResponse: ICarData[];
   totalPage: number;
   loading: boolean;
}

const ManageCars = ({ apiResponse, totalPage, loading }: IManageCarProps) => {
   const [cars, setCar] = useState<ICarData[]>([]);
   const [carId, setCarId] = useState<String[]>([]);
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('desc');
   const [searchKeyword, setSearchKeyword] = useState<string>('');
   const debounceSearch: string = useDebounce(searchKeyword, 1000);
   const searchParam = useSearchParams();
   const router = useRouter();
   const [take, setTake] = useState<number>(10);

   let page = Number(searchParam.get('page')) || 1;

   useEffect(() => {
      if (!loading) {
         setCar(apiResponse);
      }
   }, [apiResponse]);

   const handleSelectCar = (
      event: React.ChangeEvent<HTMLInputElement>,
      productId: string
   ) => {
      const isChecked = event.target.checked;

      if (isChecked) {
         setCarId((prevCarId) => [...prevCarId, productId]);
      } else {
         setCarId((prevCarId) => prevCarId.filter((id) => id !== productId));
      }
   };

   const handleSelectAllCar = (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      if (isChecked) {
         const getAllCarId = cars.map((item) => {
            return item.id;
         });
         setCarId(getAllCarId);
      } else {
         setCarId([]);
      }
   };

   useEffect(() => {
      const handleSortAndOrder = async () => {
         const response = await fetch(
            `/api/cars/?sortby=${sort}&&order=${order}`,
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();
         setCar(data.cars);
      };
      if (sort !== '') handleSortAndOrder();
   }, [sort, setSort, order, setOrder]);

   useEffect(() => {
      const handleSearch = async () => {
         if (debounceSearch !== '') {
            const response = await fetch(
               `/api/cars/?search=${debounceSearch}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            );

            const data = await response.json();
            setCar(data.cars);
         }
      };
      if (debounceSearch !== '' && debounceSearch.length > 2) {
         handleSearch();
      } else {
         setCar(apiResponse);
      }
   }, [debounceSearch]);

   useEffect(() => {
      const handlePagination = async () => {
         const response = await fetch(
            `/api/cars/?sortby=${sort}&&order=${order}&&page=${page}&&take=${take}`,
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         const data = await response.json();
         setCar(data.cars);
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
            router.push('/cars/manage-cars');
            setCar(apiResponse);
         }
      }
   };

   const handleDelete = async (carId: string, title: string) => {
      Swal.fire({
         title: 'Hapus mobil?',
         text: `Mobil ${title} akan di hapus secara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Hapus',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch(`/api/cars/${carId}`, {
               method: 'DELETE',
            });
         }
      });
   };

   const handleMultipleDelete = async () => {
      Swal.fire({
         title: 'Hapus mobil?',
         text: `Mobil yang di pilih akan di hapus seara permanen!`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Hapus',
      }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await fetch('/api/cars', {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ carId }),
            });
            if (response.ok) {
               mutate('/api/cars');
            }
         }
      });
   };

   return (
      <div>
         <div className='flex flex-col lg:flex-row justify-between items-center mb-[20px] gap-5 font-medium'>
            <div className='flex gap-5 items-center'>
               <select
                  className='select select-bordered'
                  name='sort'
                  id='sort'
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
               >
                  <option value=''>Urut berdasarkan</option>
                  <option value='merek'>Merek mobil</option>
                  <option value='status'>Status</option>
                  <option value='updateAt'>Pembaruan terakhir</option>
                  <option value='harga'>Harga</option>
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
                  disabled={carId.length === 0}
                  className='btn capitalize'
                  onClick={handleMultipleDelete}
               >
                  Hapus {carId.length !== 0 && carId.length}
               </button>
            </div>
            <div className='flex items-center gap-5'>
               <input
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className='input input-bordered'
                  type='search'
                  placeholder='Cari mobil'
               />
            </div>
         </div>
         {cars?.length === 0 && !loading ? (
            <div className='flex flex-col gap-2 p-5 justify-center items-center'>
               <h2 className='text-lg font-medium text-gray-500'>
                  Tidak tersedia
               </h2>
               <Link href='/cars/add-new-car'>
                  <button className='btn'>Tambah mobil baru</button>
               </Link>
            </div>
         ) : null}
         {loading ? (
            <div className='flex justify-center items-center'>
               <AiOutlineLoading3Quarters className='animate-spin' size={30} />
            </div>
         ) : null}
         <div className='overflow-x-auto font-medium'>
            {cars?.length !== 0 && !loading ? (
               <table className='table'>
                  {/* head */}
                  <thead className='text-base text-gray-800'>
                     <tr>
                        <th>
                           <label>
                              <input
                                 type='checkbox'
                                 onChange={(e) => handleSelectAllCar(e)}
                                 className='checkbox'
                              />
                           </label>
                        </th>
                        <th>Mobil</th>
                        <th>Status</th>
                        <th>Pembaruan terakhir</th>
                        <th>Harga</th>
                        <th>Pengguna</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* row 1 */}
                     {cars?.map((item) => (
                        <tr
                           className={`hover:bg-gray-50 ${
                              carId.includes(item.id) && 'bg-gray-100'
                           }`}
                           key={item.id}
                        >
                           <th>
                              <label>
                                 <input
                                    type='checkbox'
                                    checked={carId.includes(item.id)}
                                    onChange={(e) =>
                                       handleSelectCar(e, item.id)
                                    }
                                    className='checkbox'
                                 />
                              </label>
                           </th>
                           <td className='group'>
                              <Link href={`/cars/edit-car/${item.id}`}>
                                 <div className='flex items-center space-x-3'>
                                    <div className='avatar'>
                                       <div className='mask w-20 h-12 rounded-sm object-cover'>
                                          <img src={item.images[0]} alt='' />
                                       </div>
                                    </div>
                                    <div>
                                       <div className='flex gap-1'>
                                          <span className='capitalize'>
                                             {item.merek}
                                          </span>
                                          <span className='uppercase'>
                                             {item.model_}
                                          </span>
                                          <span>{item.tahun}</span>
                                       </div>
                                    </div>
                                    <button className='opacity-0 group-hover:opacity-100 btn btn-xs normal-case text-white btn-info'>
                                       Klik untuk mengedit
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
                                 <button className='btn btn-xs btn-warning'>
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
                           <td>{formatPrice(item.harga)}</td>
                           <td>{item.username}</td>

                           <th>
                              <div className='opacity-50 hover:opacity-40 cursor-pointer flex gap-3'>
                                 <AiFillEye size={22} />
                                 <AiFillDelete
                                    onClick={() =>
                                       handleDelete(
                                          item.id,
                                          `${item.merek} ${item.model_} ${item.tahun}`
                                       )
                                    }
                                    size={20}
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
                        <th>Mobil</th>
                        <th>Status</th>
                        <th>Pembaruan terakhir</th>
                        <th>Harga</th>
                        <th>Pengguna</th>
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
                  {page === 0 ? 'Page 1' : `Halaman ${page}`}
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

export default ManageCars;
