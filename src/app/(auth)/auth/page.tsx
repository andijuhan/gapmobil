import LoginForm from '@/components/LoginForm';
import React from 'react';

const page = () => {
   return (
      <div className={`h-screen flex justify-center items-center bg-base-200`}>
         <LoginForm />
      </div>
   );
};

export default page;
