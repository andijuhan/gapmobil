import AddOrEditPost from '@/components/AddOrEditPost';

const page = async () => {
   return (
      <div className='mt-[60px] w-full min-h-screen'>
         <AddOrEditPost mode='ADD_NEW' />
      </div>
   );
};

export default page;
