import ManageCarBrands from '@/components/ManageCarBrands';
import ManageCarModel from '@/components/ManageCarModel';

const page = () => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Kelola Merek mobil</h1>
         <div className='grid grid-cols-2 gap-5'>
            <ManageCarBrands />
            <ManageCarModel />
         </div>
      </div>
   );
};

export default page;
