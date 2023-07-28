import AddOrEditCar from '@/components/AddOrEditCar';
import { ICarApiResponse } from '@/types';
import { redirect } from 'next/navigation';

const getCarById = async (
   carId: string
): Promise<ICarApiResponse | undefined> => {
   try {
      const response = await fetch(
         `${process.env.BASE_URL}/api/cars/${carId}`,
         {
            cache: 'no-store',
         }
      );
      if (!response.ok) redirect(`${process.env.BASE_URL}/cars/manage-cars`);
      return response.json();
   } catch (error) {
      redirect(`${process.env.BASE_URL}/cars/manage-cars`);
   }
};

const page = async ({ params }: any) => {
   const carId = params.id;
   const data = await getCarById(carId);

   return (
      <div className='mt-[60px] w-full'>
         <AddOrEditCar carData={data} mode='UPDATE' />
      </div>
   );
};

export default page;
