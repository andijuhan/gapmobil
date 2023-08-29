import AppearanceSetting from '@/components/AppearanceSetting';
import React from 'react';

const page = () => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Pengaturan Tampilan</h1>
         <div className='grid grid-cols-2 gap-5'>
            <AppearanceSetting />
         </div>
      </div>
   );
};

export default page;
