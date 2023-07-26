/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AiOutlineEye } from 'react-icons/ai';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface IApiResponse {
   id: string;
   published: boolean;
   slug: string;
   title: string;
   harga: number;
   jarakTempuh: number;
   tipeRegistrasi: string;
   transmisi: string;
   garansi: boolean;
   bahanBakar: string;
   tanganKe: number;
   tempatDuduk: number;
   warna: string;
   tglReg: string;
   masaBerlakuStnk: string;
   statusOdo: string;
   images: string[];
   detailModifikasi: string;
   createAt: string;
   updateAt: string;
}

interface IListCarsProps {
   apiResponse: IApiResponse[];
}

const ListCars = ({ apiResponse }: IListCarsProps) => {
   const [cars, setCar] = useState<IApiResponse[]>(apiResponse);
   const [carId, setCarId] = useState<String[]>([]);
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('desc');
   const [searchKeyword, setSearchKeyword] = useState<string>('');
   const debounceSearch: string = useDebounce(searchKeyword, 1000);
   const searchParam = useSearchParams();
   const router = useRouter();
   const [take, setTake] = useState<number>(10);

   let page = Number(searchParam.get('page')) || 0;

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
         setCar(data);
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
            setCar(data);
         }
      };
      if (debounceSearch !== '' && debounceSearch.length > 3) {
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
         setCar(data);
      };
      if (page > 1) handlePagination();
   }, [page]);

   const handleNextNavigation = () => {
      if (page === 0) {
         page += 1;
      }
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

   return (
      <div>
         <div className='flex flex-col lg:flex-row justify-between items-center mb-[20px] gap-5 font-medium'>
            <div className='flex gap-5 items-center'>
               <select
                  className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
                  name='sort'
                  id='sort'
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
               >
                  <option value=''>Sort by</option>
                  <option value='title'>Title</option>
                  <option value='status'>Status</option>
                  <option value='updateAt'>Last Update</option>
                  <option value='harga'>Price</option>
               </select>
               <select
                  className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
                  name='order'
                  id='order'
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
               >
                  <option value='asc'>ASC</option>
                  <option value='desc'>DESC</option>
               </select>
            </div>
            <div className='flex items-center gap-5'>
               <input
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className='p-3 lg:w-[480px] rounded-md border focus:outline-none text-gray-600 focus:ring-4 focus:ring-violet-300'
                  type='search'
                  placeholder='Search Car'
               />
            </div>
         </div>
         {cars.length === 0 ? (
            <div className='flex flex-col gap-2 p-5 justify-center items-center'>
               <h2 className='text-lg font-medium text-gray-500'>
                  Not available
               </h2>
               <Link href='/cars/add-new-car'>
                  <button className='py-1 px-2 rounded-md text-white bg-gray-800'>
                     Add new car
                  </button>
               </Link>
            </div>
         ) : null}
         <div className='overflow-x-auto font-medium'>
            {cars.length !== 0 ? (
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
                        <th>Title</th>
                        <th>Status</th>
                        <th>Last Update</th>
                        <th>Price</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* row 1 */}
                     {cars.map((item) => (
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
                           <td>
                              <div className='flex items-center space-x-3'>
                                 <div className='avatar'>
                                    <div className='mask w-20 h-12 rounded-sm object-cover'>
                                       <img src={item.images[0]} alt='' />
                                    </div>
                                 </div>
                                 <div>
                                    <div className='capitalize'>
                                       {item.title}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td>
                              {item.published ? (
                                 <span>Published</span>
                              ) : (
                                 <span>Draft</span>
                              )}
                           </td>
                           <td>
                              {format(
                                 new Date(item.updateAt),
                                 'd MMMM yyyy HH:mm'
                              )}
                           </td>
                           <td>Rp {item.harga}</td>

                           <th>
                              <div className='opacity-30 hover:opacity-40 cursor-pointer'>
                                 <AiOutlineEye size={30} />
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
                        <th>Last Update</th>
                        <th>Price</th>
                        <th></th>
                     </tr>
                  </tfoot>
               </table>
            ) : null}

            <div className='join flex justify-center mt-[40px]'>
               <button onClick={handlePrevNavigation} className='join-item btn'>
                  «
               </button>
               <button className='join-item btn'>
                  {page === 0 ? 'Page 1' : `Page ${page}`}
               </button>
               <button onClick={handleNextNavigation} className='join-item btn'>
                  »
               </button>
            </div>
         </div>
      </div>
   );
};

export default ListCars;
