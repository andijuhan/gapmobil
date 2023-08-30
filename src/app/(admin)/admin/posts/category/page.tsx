/* eslint-disable react-hooks/rules-of-hooks */

import ManageCategory from '@/components/ManageCategory';

const page = ({ params }: any) => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Kelola Kategori</h1>
         <div className='grid grid-cols-2 gap-5'>
            <ManageCategory />
         </div>
      </div>
   );
};

export default page;
