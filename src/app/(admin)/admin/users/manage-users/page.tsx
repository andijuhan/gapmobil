/* eslint-disable react-hooks/rules-of-hooks */
import AddOrEditUser from '@/components/AddOrEditUser';
import ManageUser from '@/components/ManageUser';

const page = ({ params }: any) => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Kelola Pengguna</h1>
         <div className='grid grid-cols-2 gap-5'>
            <AddOrEditUser />
            <ManageUser />
         </div>
      </div>
   );
};

export default page;
