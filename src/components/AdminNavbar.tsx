import { AiOutlineUser } from 'react-icons/ai';

interface IAdminNavbarProps {
   title: string;
}

const AdminNavbar = ({ title }: IAdminNavbarProps) => {
   return (
      <div className='flex justify-between items-center mb-7'>
         <h1 className='text-xl font-semibold'>{title}</h1>
         <div className='h-10 w-10 bg-violet-600 ring-2 ring-violet-300 text-white p-2 rounded-full font-semibold text-2xl flex justify-center items-center cursor-pointer'>
            <AiOutlineUser size={30} />
         </div>
      </div>
   );
};

export default AdminNavbar;
