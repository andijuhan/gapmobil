import GeneralSetting from '@/components/GeneralSetting';
import React from 'react';

const page = () => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Pengaturan Umum</h1>
         <div className='grid grid-cols-2 gap-5'>
            <GeneralSetting />
         </div>
      </div>
   );
};

export default page;
