import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BsLine, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { BiLogoTelegram } from 'react-icons/bi';

const SocialShare = () => {
   return (
      <div className='flex gap-[10px]'>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#7F7F7F]'>
            <AiOutlineMail size={25} />
         </div>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#3B5998]'>
            <FaFacebookF size={25} />
         </div>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#00B800]'>
            <BsLine size={25} />
         </div>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#37AEE2]'>
            <BiLogoTelegram size={25} />
         </div>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#00ACED]'>
            <BsTwitter size={25} />
         </div>
         <div className='w-[40px] h-[40px] text-white flex justify-center items-center rounded-full bg-[#25D366]'>
            <BsWhatsapp size={25} />
         </div>
      </div>
   );
};

export default SocialShare;
