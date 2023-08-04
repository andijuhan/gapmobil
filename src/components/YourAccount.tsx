/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Toast from '@/components/Toast';
import { useUser } from '@/hooks/useStore';
import { IUserData } from '@/types';
import {
   isEmailValid,
   isPasswordValid,
   isPhoneNumValid,
} from '@/utils/validasi';
import React, { useEffect, useState } from 'react';

const YourAccount = () => {
   const [username, setUsername] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setphone] = useState('');
   const [role, setRole] = useState('');
   const [warningMessage, setWarningMessage] = useState('');
   const [infoMessage, setInfoMessage] = useState('');
   const [successUpdate, setSuccessUpdate] = useState(false);
   const [isWarning, setIswarning] = useState(false);
   const { id } = useUser();

   useEffect(() => {
      const getUserById = async () => {
         const response = await fetch(`/api/users/${id}`);
         const data: IUserData = await response.json();

         if (response.ok) {
            setUsername(data.username);
            setEmail(data.email);
            setphone(data.phone);
            setRole(data.role);
         }
      };
      if (id) getUserById();
   }, [id]);

   const validasiInput = () => {
      //jika username kosong
      if (username === '' || email === '' || role === '') {
         setWarningMessage('Silahkan lengkapi data');
         setIswarning(true);

         return false;
      }
      //jika format email salah
      const validateEmail = isEmailValid(email);

      if (!validateEmail) {
         setWarningMessage('Format email salah');
         setIswarning(true);
         return false;
      }

      const validatePassword =
         oldPassword !== '' ? isPasswordValid(oldPassword) : true;

      if (!validatePassword) {
         setIswarning(true);
         setWarningMessage(
            'Gunakan minimal 8 karakter dan kombinasi huruf kapital'
         );
         return false;
      }
      //jika format no hp salah
      const validatePhoneNum = isPhoneNumValid(phone);

      if (!validatePhoneNum) {
         setIswarning(true);
         setWarningMessage('Format No HP salah');
         return false;
      }
      return true;
   };

   const handleUpdateAccount = async () => {
      const isInputValid = validasiInput();
      if (isInputValid) {
         const response = await fetch(`/api/users/update-profile/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               oldPassword,
               newPassword,
               email,
               phone,
               role,
            }),
         });

         const data = await response.json();

         if (response.ok) {
            setSuccessUpdate(true);
            setInfoMessage(data.message);
         }
         if (!response.ok) {
            setWarningMessage(data.message);
            setIswarning(true);
         }
      }
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg text-sm'>
         <h2 className='text-lg mb-5 font-medium'>Update Account</h2>
         <div className='form-control gap-5'>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='username'>
                  Username
               </label>
               <input
                  className={`input input-bordered w-full max-w-xs`}
                  disabled
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='password'>
                  Old Password
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='password'
                  name='password'
                  placeholder='New password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='password'>
                  New Password
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='password'
                  name='password'
                  placeholder='New password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='email'>
                  Email
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='email'
                  name='email'
                  placeholder='youremail@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='phone'>
                  Phone
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='text'
                  name='phone'
                  value={phone}
                  placeholder='628123456789'
                  onChange={(e) => setphone(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center '>
               <label className='w-[150px]' htmlFor='role'>
                  Role
               </label>
               <select
                  className='select select-bordered max-w-xs'
                  name='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
               >
                  <option value=''>Select role</option>
                  <option value='USER'>User</option>
                  <option value='ADMIN'>Admin</option>
                  <option value='SUPER ADMIN'>Super Admin</option>
               </select>
            </div>
            <div className='flex items-center mt-5 gap-5'>
               <button
                  type='button'
                  onClick={handleUpdateAccount}
                  className='w-max btn btn-primary'
               >
                  Update
               </button>
            </div>
         </div>
         <Toast
            message={warningMessage}
            mode='WARNING'
            show={isWarning}
            setShow={setIswarning}
         />
         <Toast
            message={infoMessage}
            mode='SUKSES'
            show={successUpdate}
            setShow={setSuccessUpdate}
            timer={10000}
         />
      </div>
   );
};

export default YourAccount;
