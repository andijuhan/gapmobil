'use client';
/* eslint-disable react-hooks/rules-of-hooks */

import ManageCars from '@/components/ManageCars';
import { fetcher } from '@/utils';
import useSWR from 'swr';

const page = () => {
   const { data, error, isLoading } = useSWR('/api/cars', fetcher);

   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Kelola Mobil</h1>
         <div className='bg-white p-4 lg:p-7 rounded-lg'>
            <ManageCars
               apiResponse={data?.cars}
               totalPage={data?.totalPage}
               loading={isLoading}
            />
         </div>
      </div>
   );
};

export default page;
