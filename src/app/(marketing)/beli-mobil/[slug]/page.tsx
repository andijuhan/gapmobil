import DetailProduct from '@/components/DetailProduct';
import SliderProducts from '@/components/SliderProducts';
import SocialShare from '@/components/SocialShare';

const page = () => {
   return (
      <div className='mt-[80px]'>
         <div className='max-w-6xl mx-auto py-[50px] lg:py-[70px] px-[10px]'>
            <SliderProducts />
            <div className='border-b border-gray-300 mt-[40px]'></div>
            <DetailProduct />
            <SocialShare />
         </div>
      </div>
   );
};

export default page;
