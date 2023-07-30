import React from 'react';

const LoginForm = () => {
   return (
      <div className='p-7 border rounded-lg bg-base-100 flex flex-col gap-5'>
         <h2 className='text-xl font-medium text-center mb-3'>Login Page</h2>
         <div className='form-control gap-5'>
            <label className='input-group'>
               <span className='w-[120px]'>Email</span>
               <input
                  type='text'
                  placeholder='info@site.com'
                  className='input input-bordered'
               />
            </label>
            <label className='input-group'>
               <span className='w-[120px]'>Password</span>
               <input
                  type='password'
                  placeholder='secret'
                  className='input input-bordered'
               />
            </label>
            <div className='flex items-center gap-3 mt-3'>
               <button className='btn btn-primary'>Login</button>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
