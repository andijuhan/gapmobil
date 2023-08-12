/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import ManagePosts from '@/components/ManagePosts';
import { fetcher } from '@/utils';
import useSWR from 'swr';

const page = () => {
   const { data, error, isLoading } = useSWR('/api/posts', fetcher);
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Manage Posts</h1>
         <div className='bg-white p-4 lg:p-7 rounded-lg'>
            <ManagePosts apiResponse={data} loading={isLoading} />
         </div>
      </div>
   );
};

export default page;
