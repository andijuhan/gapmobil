import AddOrEditPost from '@/components/AddOrEditPost';

const page = async ({ params }: any) => {
   const postId = params.id;

   return (
      <div className='mt-[60px] w-full'>
         <AddOrEditPost postId={postId} mode='UPDATE' />
      </div>
   );
};

export default page;
