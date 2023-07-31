'use client';
import {
   isEmailValid,
   isPasswordValid,
   isPhoneNumValid,
} from '@/utils/validasi';
import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import { mutate } from 'swr';
import { useSearchParams } from 'next/navigation';
import { IUserData } from '@/types';
import { useRouter } from 'next/navigation';

const CreateUser = () => {
   const searchParams = useSearchParams();
   const userId = searchParams.get('id');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setphone] = useState('');
   const [role, setRole] = useState('');
   const [warningMessage, setWarningMessage] = useState('');
   const [isWarning, setIswarning] = useState(false);
   const [successEdit, setSuccessEdit] = useState(false);
   const [successAdd, setSuccessAdd] = useState(false);
   const [mode, setMode] = useState<'ADD_NEW' | 'UPDATE'>('ADD_NEW');
   const router = useRouter();

   useEffect(() => {
      const getUserById = async () => {
         const response = await fetch(`/api/users/${userId}`);
         const data: IUserData = await response.json();
         setMode('UPDATE');
         if (response.ok) {
            setUsername(data.username);
            setEmail(data.email);
            setphone(data.phone);
            setRole(data.role);
         }
      };
      if (userId) getUserById();
   }, [userId]);

   const resetData = () => {
      mutate('/api/users');
      setUsername('');
      setEmail('');
      setPassword('');
      setphone('');
      setRole('');
   };

   //validasi input
   const validasiInput = () => {
      //jika username kosong
      if (username === '' || password === '' || email === '' || role === '') {
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

      const validatePassword = isPasswordValid(password);

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

   const handleEditUser = async () => {
      const isInputValid = validasiInput();
      if (isInputValid) {
         const response = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, email, phone, role }),
         });

         const data = await response.json();

         if (response.ok) {
            resetData();
            setMode('ADD_NEW');
            setSuccessEdit(true);
         }
         if (!response.ok) {
            setWarningMessage(data.message);
            setIswarning(true);
         }
      }
   };

   //handle add user
   const handleAddUser = async () => {
      const isInputValid = validasiInput();
      if (isInputValid) {
         const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, phone, role }),
         });

         const data = await response.json();

         if (response.ok) {
            resetData();
            setSuccessAdd(true);
         }
         if (!response.ok) {
            setWarningMessage(data.message);
            setIswarning(true);
         }
      }
   };

   const handleCancel = () => {
      resetData();
      setMode('ADD_NEW');
      router.push('/users/manage-users');
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg '>
         <h2 className='text-lg mb-5 font-medium'>
            {mode == 'ADD_NEW' ? 'Create user' : 'Edit user'}
         </h2>
         <div className='form-control gap-5'>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='username'>
                  Username
               </label>
               <input
                  className={`input input-bordered w-full max-w-xs`}
                  disabled={mode === 'UPDATE'}
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className='flex gap-5 items-center'>
               <label className='w-[150px]' htmlFor='password'>
                  Password
               </label>
               <input
                  className='input input-bordered w-full max-w-xs'
                  type='password'
                  name='password'
                  placeholder='Your secret password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onClick={mode === 'ADD_NEW' ? handleAddUser : handleEditUser}
                  className={`btn ${
                     mode === 'ADD_NEW' ? 'btn-primary' : 'btn-secondary'
                  } w-max`}
               >
                  {mode === 'ADD_NEW' ? 'Add user' : 'Update User'}
               </button>
               {mode === 'UPDATE' && (
                  <button onClick={handleCancel} className='btn'>
                     Cancel
                  </button>
               )}
            </div>
         </div>
         <Toast
            message={warningMessage}
            mode='WARNING'
            show={isWarning}
            setShow={setIswarning}
         />
         <Toast
            message='Berhasil update user'
            mode='SUKSES'
            show={successEdit}
            setShow={setSuccessEdit}
         />
         <Toast
            message='Berhasil menambah user'
            mode='SUKSES'
            show={successAdd}
            setShow={setSuccessAdd}
         />
      </div>
   );
};

export default CreateUser;
