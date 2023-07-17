import ProductCard from '@/components/ProductCard';
import SearchFilter from '@/components/SearchFilter';

const page = () => {
   return (
      <div className='bg-[#ebebeb] pt-[80px]'>
         <SearchFilter />
         <div className='py-[70px] bg-white'>
            <div className='max-w-6xl mx-auto px-[10px]'>
               <div className='flex items-center justify-center gap-4 text-sm md:text-base mb-[20px]'>
                  <p>Menampilkan halaman ke </p>
                  <select
                     className='p-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                     name=''
                     id=''
                  >
                     <option value=''>1</option>
                     <option value=''>2</option>
                     <option value=''>3</option>
                  </select>
                  <p>dari 37 hasil</p>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
               </div>

               <div className='flex items-center justify-center gap-4 mt-[20px] text-sm md:text-base'>
                  <p>Menampilkan halaman ke </p>
                  <select
                     className='p-3 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
                     name=''
                     id=''
                  >
                     <option value=''>1</option>
                     <option value=''>2</option>
                     <option value=''>3</option>
                  </select>
                  <p>dari 37 hasil</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default page;
