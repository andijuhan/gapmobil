import { AiOutlineLogout } from 'react-icons/ai';

interface IAdminNavbarProps {
   title: string;
}

const AdminNavbar = ({ title }: IAdminNavbarProps) => {
   return (
      <div className='flex justify-between items-center mb-7'>
         <h1 className='text-xl font-semibold'>{title}</h1>
         <div className='h-10 w-10 bg-violet-600 text-white border p-2 rounded-full font-semibold text-2xl flex justify-center items-center cursor-pointer'>
            <AiOutlineLogout size={30} />
         </div>
      </div>
   );
};

export default AdminNavbar;
