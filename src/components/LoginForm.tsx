'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const LoginForm = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [warningMessage, setWarningMessage] = useState('');

   const router = useRouter();

   useEffect(() => {
      if (warningMessage !== '') {
         Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: warningMessage,
            timer: 3000,
            showConfirmButton: false,
         });
         setWarningMessage('');
      }
   }, [warningMessage, setWarningMessage]);

   const validateInput = () => {
      if (username === '' || password === '') {
         setWarningMessage('Masukan username dan password');
         return false;
      }
      return true;
   };

   const handleLogin = async () => {
      const isInputValidated = validateInput();
      if (isInputValidated) {
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
         } else {
            Swal.fire({
               position: 'top-end',
               icon: 'error',
               title: 'Oops...',
               text: data.message,
               timer: 3000,
               showConfirmButton: false,
            });
            setWarningMessage('');
         }
      }
   };
   return (
      <div className='p-7 border rounded-xl bg-base-100 flex flex-col gap-5 shadow-lg'>
         <h2 className='text-xl font-medium text-center mb-3'>Login User</h2>
         <div className='form-control gap-3'>
            <div className='flex flex-col gap-1'>
               <label htmlFor='username'>Username</label>
               <input
                  type='text'
                  className='input input-bordered'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className='flex flex-col gap-1'>
               <label htmlFor='password'>Password</label>
               <input
                  type='password'
                  className='input input-bordered'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <div className='flex items-center gap-3 mt-2'>
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
   );
};

export default LoginForm;
