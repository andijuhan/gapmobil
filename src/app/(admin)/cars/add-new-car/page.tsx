import AddOrEditCar from '@/components/AddOrEditCar';

const page = async () => {
   return (
      <div className='mt-[60px] w-full'>
         <AddOrEditCar mode='ADD_NEW' />
      </div>
   );
};

export default page;
