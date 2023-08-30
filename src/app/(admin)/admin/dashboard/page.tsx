import CardDashboard from '@/components/CardDashboard';
import ContentDashboard from '@/components/ContentDashboard';
import React from 'react';

const page = () => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Dashboard</h1>
         <CardDashboard />
         <div className='bg-white p-4 lg:p-7 rounded-lg mt-5'>
            <ContentDashboard />
         </div>
      </div>
   );
};

export default page;
