import AddOrEditCar from '@/components/AddOrEditCar';
import { redirect } from 'next/navigation';

const getCarBrand = async () => {
   try {
      const response = await fetch(`${process.env.BASE_URL}/api/cars/brands`, {
         cache: 'no-store',
      });
      if (!response.ok) redirect(`${process.env.BASE_URL}/cars/manage-cars`);
      return response.json();
   } catch (error) {
      redirect(`${process.env.BASE_URL}/cars/manage-cars`);
   }
};

const page = async () => {
   const data = await getCarBrand();

   return (
      <div className='mt-[60px] w-full'>
         <AddOrEditCar carBrands={data} mode='ADD_NEW' />
      </div>
   );
};

export default page;
