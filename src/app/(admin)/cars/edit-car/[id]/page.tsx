import AddOrEditCar from '@/components/AddOrEditCar';
import { ICarApiResponse } from '@/types';

const getCarById = async (
   carId: string
): Promise<ICarApiResponse | undefined> => {
   try {
      const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
         cache: 'no-store',
      });
      return response.json();
   } catch (error) {
      console.log(error);
   }
};

const page = async ({ params }: any) => {
   const carId = params.id;
   const data = await getCarById(carId);

   return (
      <div className='mt-[50px]'>
         <AddOrEditCar carData={data} mode='UPDATE' />
      </div>
   );
};

export default page;
