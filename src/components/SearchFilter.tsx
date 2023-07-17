'use client';
import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchFilter = () => {
   const [toggle, setToggle] = useState(true);

   return (
      <div className='max-w-6xl mx-auto py-[10px] lg:py-[40px]'>
         <div
            className='mb-[20px] md:hidden flex justify-center items-center gap-2'
            onClick={() => setToggle(!toggle)}
         >
            <p className='text-sm'>Filter Mobil</p>
            <BsChevronDown
               className={`${
                  toggle
                     ? 'transform -rotate-180 transition duration-200'
                     : 'transform rotate-0 transition duration-200'
               }`}
            />
         </div>
         <form
            className={`px-[20px] lg:px-0 lg:mb-0 ${
               toggle
                  ? 'h-[0px] opacity-0 overflow-y-hidden lg:overflow-visible transition-all duration-300 ease-out'
                  : 'h-[100px] opacity-100 transition-all duration-300 ease-in-out mb-[40px]'
            } lg:opacity-100 lg:h-auto`}
            action=''
         >
            <div className='flex items-center justify-center'>
               <input
                  className='w-full placeholder-gray-800 rounded-tl-[10px] rounded-bl-[10px] py-3 px-3 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  placeholder='cari mobil'
                  type='text'
               />
               <div className='bg-gray-50 text-gray-500 p-2 rounded-tr-[10px] rounded-br-[10px]'>
                  <BiSearch size={30} />
               </div>
            </div>
            <div className='flex items-center justify-center mt-[15px] gap-[20px]'>
               <select
                  className='w-[50%] p-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  name=''
                  id=''
               >
                  <option value=''>Model</option>
                  <option value=''>MPV</option>
                  <option value=''>SUV</option>
                  <option value=''>LCGC</option>
               </select>
               <select
                  className='w-[50%] p-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  name=''
                  id=''
               >
                  <option value=''>Harga</option>
                  <option value=''>Di bawah 100 Juta</option>
                  <option value=''>100-200 Juta</option>
                  <option value=''>200-300 Juta</option>
               </select>
            </div>
         </form>
      </div>
   );
};

export default SearchFilter;
