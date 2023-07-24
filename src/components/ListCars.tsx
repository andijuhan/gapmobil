/* eslint-disable @next/next/no-img-element */
'use client';
import { IApiResponse } from '@/app/(admin)/cars/manage-cars/page';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface IListCarsProps {
   apiResponse: IApiResponse[];
}

const ListCars = ({ apiResponse }: IListCarsProps) => {
   const [cars, setCar] = useState<IApiResponse[]>(apiResponse);
   const [carId, setCarId] = useState<String[]>([]);
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('desc');

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
            `/api/cars/sort?sortby=${sort}&&order=${order}`,
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

   console.log(sort, order);
   return (
      <div>
         <div className='flex justify-between items-center mb-[20px]'>
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
               <label className='' htmlFor='harga'>
                  Cari Mobil
               </label>
               <input
                  className='p-3 rounded-md border focus:outline-none text-gray-600 focus:ring-4 focus:ring-violet-300'
                  type='text'
               />
            </div>
         </div>
         <div className='overflow-x-auto'>
            <table className='table'>
               {/* head */}
               <thead>
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
                     <tr key={item.id}>
                        <th>
                           <label>
                              <input
                                 type='checkbox'
                                 checked={carId.includes(item.id)}
                                 onChange={(e) => handleSelectCar(e, item.id)}
                                 className='checkbox'
                              />
                           </label>
                        </th>
                        <td>
                           <div className='flex items-center space-x-3'>
                              <div className='avatar'>
                                 <div className='mask w-20 h-12 rounded-md object-cover'>
                                    <img src={item.images[0]} alt='' />
                                 </div>
                              </div>
                              <div>
                                 <div className='font-bold capitalize'>
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
                           <button className='btn btn-ghost btn-xs'>
                              details
                           </button>
                        </th>
                     </tr>
                  ))}
               </tbody>
               {/* foot */}
               <tfoot>
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
         </div>
      </div>
   );
};

export default ListCars;
