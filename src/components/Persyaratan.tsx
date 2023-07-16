import React from 'react';

const Persyaratan = () => {
   return (
      <div className='py-[80px]'>
         <div className='max-w-6xl mx-auto px-5 lg:px-0'>
            <h2 className='text-center font-bold text-3xl lg:text-4xl'>
               Persyaratan Paket Kredit
            </h2>
            <div className='flex flex-col lg:flex-row justify-between mt-[50px]'>
               <div className='lg:w-[50%] border-black lg:border-r-[1px]'>
                  <h3 className='font-bold text-2xl'>
                     Persyaratan Perorangan :
                  </h3>
                  <div className='flex items-center gap-3 mt-5'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        1
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy KTP Suami dan Istri
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        2
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy Kartu Keluarga
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        3
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Asli / Foto Copy PBB / AJB / Sertifikat
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        4
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Asli / Foto Copy Slip Gaji
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        5
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy Rekening Tabungan/Koran 3 Bln Terakhi
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        6
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        NPWP
                     </p>
                  </div>
               </div>
               <div className='mt-[30px]'>
                  <h3 className='font-bold text-2xl'>
                     Persyaratan Perusahaan :
                  </h3>
                  <div className='flex items-center gap-3 mt-5'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        1
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy Akte Pendirian dan Perubahan
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        2
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy KTP Direksi dan Komisaris
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        3
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy SIUP, NPWP, TDP, Domisili
                     </p>
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                     <div className='w-10 h-10 p-1 rounded-full bg-[#f7a621] flex items-center justify-center text-white'>
                        4
                     </div>
                     <p className='text-sm lg:text-base w-[250px] lg:w-[400px]'>
                        Foto Copy Rekening Koran 3 Bln Terakhir
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Persyaratan;
