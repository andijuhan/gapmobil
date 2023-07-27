import { BiChevronDown } from 'react-icons/bi';

interface IAdminNavbarProps {
   title: string;
}

const AdminNavbar = ({ title }: IAdminNavbarProps) => {
   return (
      <div className='flex justify-between items-center mb-7'>
         <h1 className='text-xl font-medium'>{title}</h1>
         <div className='flex justify-center gap-2 text-gray-800 items-center cursor-pointer'>
            <span>Welcome Andi</span>
            <BiChevronDown />
         </div>
      </div>
   );
};

export default AdminNavbar;
