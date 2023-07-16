import { FaLocationDot } from 'react-icons/fa6';
import {
   BsFillTelephoneFill,
   BsInstagram,
   BsTiktok,
   BsFacebook,
} from 'react-icons/bs';

const ContactUs = () => {
   return (
      <div className='mt-[50px] lg:mt-[80px] px-[10px] lg:px-0'>
         <div className='max-w-6xl py-[80px] mx-auto'>
            <h2 className='text-2xl text-center lg:text-left lg:text-4xl font-bold mb-[30px]'>
               Hubungi Kami.
            </h2>
            <div className='flex flex-col lg:flex-row justify-between gap-[40px] lg:gap-0'>
               <div className='w-full lg:w-[40%] flex flex-col gap-[20px] border rounded-[30px] p-[20px]'>
                  <div className='flex gap-[20px]'>
                     <div>
                        <FaLocationDot size={20} />
                     </div>
                     <div className='flex flex-col'>
                        <h3 className='text-2xl font-bold text-[#f7a621]'>
                           GAPMOBIL
                        </h3>
                        <p className='font-bold mt-2'>
                           Bursa mobil summarecon serpong
                        </p>
                        <p className='mt-2'>blok G no.20</p>
                        <p>Gading serpong, Kelapa dua</p>
                        <p className='font-bold mt-2'>
                           08.30 - 17.30 WIB (Senin - Minggu)
                        </p>
                     </div>
                  </div>

                  <div className='flex gap-[20px]'>
                     <div>
                        <BsFillTelephoneFill size={20} />
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>0818 7555 88</span>
                     </div>
                  </div>

                  <div className='flex gap-[20px]'>
                     <div>
                        <BsInstagram size={20} />
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>gapmobil</span>
                     </div>
                  </div>

                  <div className='flex gap-[20px]'>
                     <div>
                        <BsTiktok size={20} />
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>gapmobil.gs</span>
                     </div>
                  </div>

                  <div className='flex gap-[20px]'>
                     <div>
                        <BsFacebook size={20} />
                     </div>
                     <div className='flex flex-col'>
                        <span className='font-bold'>GAPmobil.gs</span>
                     </div>
                  </div>
               </div>

               <div className='w-full lg:w-[55%] rounded-[30px] overflow-hidden border'>
                  <iframe
                     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.5165143574293!2d106.6190412695983!3d-6.255027966487222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fc7a84efc901%3A0xfe6c53d68d9b8821!2sGAP%20Mobil!5e0!3m2!1sid!2sid!4v1689519480072!5m2!1sid!2sid'
                     className='w-full h-[400px] lg:h-full'
                     style={{ border: '0' }}
                     allowFullScreen
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
