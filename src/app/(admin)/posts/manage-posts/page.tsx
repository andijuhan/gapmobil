/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import ManagePosts from '@/components/ManagePosts';
import { useGeneralSetting } from '@/hooks/useStore';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
import useSWR from 'swr';

const page = () => {
   const { data, isLoading } = useSWR('/api/posts', fetcher);
   const { title } = useGeneralSetting();

   useEffect(() => {
      document.title = 'Kelola Artikel - ' + title;
   }, [title]);

   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Kelola Artikel</h1>
         <div className='bg-white p-4 lg:p-7 rounded-lg'>
            <ManagePosts
               apiResponse={data?.posts}
               loading={isLoading}
               totalPage={data?.totalPage}
            />
         </div>
      </div>
   );
};

export default page;
