import React from 'react';

const CreateUser = () => {
   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg'>
         <h2 className='text-lg mb-5'>Create user</h2>
         <div className='form-control gap-5'>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='username'>
                  Username
               </label>
               <input
                  className='input input-bordered w-full'
                  type='text'
                  name='username'
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='password'>
                  Password
               </label>
               <input
                  className='input input-bordered w-full'
                  type='password'
                  name='password'
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='email'>
                  Email
               </label>
               <input
                  className='input input-bordered w-full'
                  type='email'
                  name='email'
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='phone'>
                  Phone
               </label>
               <input
                  className='input input-bordered w-full'
                  type='text'
                  name='phone'
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='role'>
                  Role
               </label>
               <select className='select select-bordered w-full' name='role'>
                  <option value='user'>User</option>
                  <option value='super_admin'>Super Admin</option>
                  <option value='admin'>Admin</option>
               </select>
            </div>
         </div>
      </div>
   );
};

export default CreateUser;
