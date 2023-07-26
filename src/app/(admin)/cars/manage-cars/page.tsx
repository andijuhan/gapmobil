/* eslint-disable react-hooks/rules-of-hooks */
import AdminNavbar from '@/components/AdminNavbar';
import ListCars from '@/components/ListCars';

const getData = async () => {
   try {
      const response = await fetch('http://localhost:3000/api/cars', {
         cache: 'no-store',
      });

      return response.json();
   } catch (error) {
      console.log(error);
   }
};

const page = async () => {
   const data = await getData();

   return (
      <div className='p-2 lg:p-7 rounded-lg h-full'>
         <div className='pt-4 lg:pt-0 lg:px-0 px-2'>
            <AdminNavbar title='Manage Cars' />
         </div>
         <div className='bg-white p-4 lg:p-7 rounded-lg'>
            <ListCars apiResponse={data} />
         </div>
      </div>
   );
};

export default page;
