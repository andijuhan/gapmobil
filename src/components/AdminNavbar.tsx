interface IAdminNavbarProps {
   title: string;
}

const AdminNavbar = ({ title }: IAdminNavbarProps) => {
   return (
      <div className='flex justify-between items-center mb-7'>
         <h1 className='text-xl font-bold'>{title}</h1>
         <div className='h-10 w-10 rounded-full font-semibold text-2xl flex justify-center items-center text-white bg-violet-600 p-4 ring-4 ring-violet-300 cursor-pointer'>
            A
         </div>
      </div>
   );
};

export default AdminNavbar;
