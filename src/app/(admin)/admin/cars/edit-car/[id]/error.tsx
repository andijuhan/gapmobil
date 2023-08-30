'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
   error,
   reset,
}: {
   error: Error;
   reset: () => void;
}) {
   const navigate = useRouter();
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
   }, [error]);

   return (
      <div className='p-2 lg:p-7 rounded-lg h-full'>
         <div className='bg-white p-4 lg:p-7 rounded-lg'>
            <h2 className='text-xl font-semibold mb-[30px]'>
               Something went wrong!
            </h2>
            <button
               className='btn'
               onClick={() => navigate.push('/cars/manage-cars')}
            >
               Try again
            </button>
         </div>
      </div>
   );
}
