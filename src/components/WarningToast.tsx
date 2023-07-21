import { AiOutlineWarning } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

const transitionStyles = {
   appear: 'opacity-0',
   appearActive: 'transition-opacity duration-300 opacity-100',
   enter: 'opacity-0',
   enterActive: 'transition-opacity duration-300 opacity-100',
   // exit: "opacity-100",  // this breaks the exit transition
   exitActive: 'transition-opacity duration-200 opacity-0',
};

const WarningToast = ({ show }: { show: boolean }) => {
   return (
      <Transition
         show={show}
         enter='transition-opacity duration-500'
         enterFrom='opacity-0'
         enterTo='opacity-90'
         leave='transition-opacity duration-500'
         leaveFrom='opacity-90'
         leaveTo='opacity-0'
      >
         <div
            className={`w-[320px] fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 items-center font-semibold text-white bg-red-400 p-5 rounded-lg ${transitionStyles}`}
         >
            <AiOutlineWarning size={30} />
            <span>Silahkan lengkapi data</span>
         </div>
      </Transition>
   );
};

export default WarningToast;
