'use client';
import React, { useState } from 'react';

const LoginForm = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      const response = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
         console.log(data.message);
      }
      console.log(data);
   };
   return (
      <div className='p-7 border rounded-lg bg-base-100 flex flex-col gap-5'>
         <h2 className='text-2xl font-medium text-center mb-3'>Login Page</h2>
         <div className='form-control gap-5'>
            <label className='input-group'>
               <span className='w-[120px]'>Username</span>
               <input
                  type='text'
                  placeholder='Your username'
                  className='input input-bordered'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </label>
            <label className='input-group'>
               <span className='w-[120px]'>Password</span>
               <input
                  type='password'
                  placeholder='secret'
                  className='input input-bordered'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </label>
            <div className='flex items-center gap-3 mt-3'>
               <button
                  type='button'
                  onClick={handleLogin}
                  className='btn btn-primary'
               >
                  Login
               </button>
               <button className='btn'>Home</button>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
