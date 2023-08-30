import '../globals.css';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import Drawer from '@/components/Drawer';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { IUserData } from '@/types';

const getUser = async () => {
   const nextCookies = cookies(); // Get cookies object
   const token = nextCookies.get('token'); // Find cookie

   if (!token) {
      redirect(`${process.env.BASE_URL}/auth`);
   }
   //validasi token
   const response = await fetch(`${process.env.BASE_URL}/api/auth/me`, {
      headers: {
         authorization: `bearer ${token?.value}`,
      },
   });
   const data = await response.json();

   if (response.ok) {
      return data;
   } else {
      redirect(`${process.env.BASE_URL}/auth`);
   }
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const data: IUserData = await getUser();

   return (
      <html lang='en'>
         <body className=' text-neutral bg-base-200 min-h-screen flex flex-col'>
            <AdminNavbar data={data} />
            <Drawer contentPage={children} menu={<AdminSidebar />} />
         </body>
      </html>
   );
}
