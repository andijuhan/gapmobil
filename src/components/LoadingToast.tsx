import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

const LoadingToast = ({
   show,
   message,
}: {
   show: boolean;
   message: string;
}) => {
   return (
      <Transition
         show={show}
         enter='transition-opacity duration-500'
         enterFrom='opacity-0'
         enterTo='opacity-100'
         leave='transition-opacity duration-500'
         leaveFrom='opacity-100'
         leaveTo='opacity-0'
      >
         <div
            className={`w-[320px] fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 items-center font-semibold text-white bg-blue-400 p-5 rounded-lg`}
         >
            <AiOutlineLoading3Quarters className='animate-spin' size={30} />
            <span>{message}</span>
         </div>
      </Transition>
   );
};

export default LoadingToast;
