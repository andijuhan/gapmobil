/* eslint-disable react-hooks/rules-of-hooks */
import AdminNavbar from '@/components/AdminNavbar';
import ListCars from '@/components/ListCars';

export interface IApiResponse {
   id: string;
   published: boolean;
   slug: string;
   title: string;
   harga: number;
   jarakTempuh: number;
   tipeRegistrasi: string;
   transmisi: string;
   garansi: boolean;
   bahanBakar: string;
   tanganKe: number;
   tempatDuduk: number;
   warna: string;
   tglReg: string;
   masaBerlakuStnk: string;
   statusOdo: string;
   images: string[];
   detailModifikasi: string;
   createAt: string;
   updateAt: string;
}

const getData = async (): Promise<IApiResponse[]> => {
   const response = await fetch('http://localhost:3000/api/cars', {
      cache: 'no-store',
   });

   if (!response.ok) {
      throw new Error('Failed to fetch data');
   }

   return response.json();
};

const page = async () => {
   const data = await getData();

   return (
      <div className='p-2 lg:p-5 rounded-lg h-full'>
         <div className='pt-4 lg:pt-0 lg:px-0 px-2'>
            <AdminNavbar title='Manage Cars' />
         </div>
         <div className='bg-white p-4 lg:p-10 rounded-lg'>
            <ListCars apiResponse={data} />
         </div>
      </div>
   );
};

export default page;
