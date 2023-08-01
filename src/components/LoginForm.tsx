'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

const LoginForm = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [warningMessage, setWarningMessage] = useState('');
   const [warning, setWarning] = useState(false);
   const router = useRouter();

   const validateInput = () => {
      if (username === '' || password === '') {
         setWarningMessage('Masukan username dan password');
         setWarning(true);
         return false;
      }
      return true;
   };

   const handleLogin = async () => {
      const isInputValidate = validateInput();
      if (isInputValidate) {
         const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
         });

         const data = await response.json();

         if (response.ok) {
            router.push('/dashboard');
         }

         if (!response.ok) {
            setWarningMessage(data.message);
            setWarning(true);
         }
      }
   };
   return (
      <>
         <div className='p-7 border rounded-xl bg-base-100 flex flex-col gap-5 shadow-sm'>
            <h2 className='text-xl font-medium text-center mb-3'>Login User</h2>
            <div className='form-control gap-5'>
               <input
                  type='text'
                  placeholder='Username'
                  className='input input-bordered'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input
                  type='password'
                  placeholder='Password'
                  className='input input-bordered'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <div className='flex items-center gap-3'>
                  <button
                     type='button'
                     onClick={handleLogin}
                     className='btn btn-primary w-full'
                  >
                     Login
                  </button>
               </div>
            </div>
         </div>
         <Toast
            message={warningMessage}
            mode='WARNING'
            show={warning}
            setShow={setWarning}
         />
      </>
   );
};

export default LoginForm;
