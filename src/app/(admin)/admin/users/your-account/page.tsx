import YourAccount from '@/components/YourAccount';

const page = () => {
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full w-full mt-[60px]'>
         <h1 className='text-xl font-medium mb-7 mt-5'>Akun Anda</h1>
         <div className='grid grid-cols-2 gap-5'>
            <YourAccount />
         </div>
      </div>
   );
};

export default page;
