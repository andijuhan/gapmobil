import LoginForm from '@/components/LoginForm';
import React from 'react';

const page = () => {
   return (
      <div
         className={`h-screen flex justify-center items-center bg-[url('/images/car-backround.jpg')] bg-cover bg-center backdrop-blur-lg`}
      >
         <LoginForm />
      </div>
   );
};

export default page;