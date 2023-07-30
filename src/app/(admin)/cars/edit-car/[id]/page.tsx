import AddOrEditCar from '@/components/AddOrEditCar';

const page = async ({ params }: any) => {
   const carId = params.id;

   return (
      <div className='mt-[60px] w-full'>
         <AddOrEditCar carId={carId} mode='UPDATE' />
      </div>
   );
};

export default page;
