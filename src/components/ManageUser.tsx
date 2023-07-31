'use client';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils';
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { useState } from 'react';
import Dialog from './Dialog';
import { useRouter } from 'next/navigation';
import { IUserData } from '@/types';

const CreateUser = () => {
   const { data: dataUser } = useSWR<IUserData[]>('/api/users', fetcher);
   const [selectedUserId, setSelectedUserId] = useState('');
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selecteUsername, setSelectedUsername] = useState('');
   const router = useRouter();

   const handleDelete = async () => {
      const response = await fetch(`/api/users/${selectedUserId}`, {
         method: 'DELETE',
      });

      if (response.ok) {
         mutate('/api/users');
      }
   };

   const confirmDelete = (id: string, user: string) => {
      setDeleteDialog(true);
      setSelectedUserId(id);
      setSelectedUsername(user);
   };

   const handleEdit = (id: string) => {
      router.push(`/users/manage-users?id=${id}`);
   };

   return (
      <div className='bg-white px-4 lg:px-7 lg:py-10 rounded-lg'>
         <h2 className='text-lg mb-5 font-medium'>Manage user</h2>
         <div className='flex flex-col gap-3'>
            <div className='overflow-x-auto'>
               <table className='table'>
                  {/* head */}
                  <thead className='text-base text-neutral'>
                     <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {dataUser?.map((item, index) => (
                        <tr
                           className='hover:bg-base-200 cursor-pointer'
                           data-tip='Click to edit'
                           key={index}
                        >
                           <td>{item.username}</td>
                           <td>{item.email}</td>
                           <td>{item.phone}</td>
                           <td>{item.role}</td>
                           <td>
                              <div className='flex gap-5 opacity-50 hover:opacity-40'>
                                 <button
                                    onClick={() =>
                                       confirmDelete(item.id, item.username)
                                    }
                                 >
                                    <AiFillDelete size={20} />
                                 </button>
                                 <button onClick={() => handleEdit(item.id)}>
                                    <BiSolidEditAlt size={20} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <Dialog
               show={deleteDialog}
               setShow={setDeleteDialog}
               title={`Hapus ${selecteUsername} ?`}
               message={`Apakah ingin menghapus user ${selecteUsername} ?`}
               callback={handleDelete}
            />
         </div>
      </div>
   );
};

export default CreateUser;
