import { AiOutlineWarning } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

const WarningToast = ({ show }: { show: boolean }) => {
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
            className={`w-[320px] fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 items-center font-semibold text-white bg-red-400 p-5 rounded-lg`}
         >
            <AiOutlineWarning size={30} />
            <span>Silahkan lengkapi data</span>
         </div>
      </Transition>
   );
};

export default WarningToast;
