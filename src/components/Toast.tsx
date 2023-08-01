import {
   AiOutlineLoading3Quarters,
   AiOutlineCheckCircle,
   AiOutlineWarning,
} from 'react-icons/ai';
import { Transition } from '@headlessui/react';

interface IToastProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   message: string;
   mode: 'SUKSES' | 'LOADING' | 'WARNING';
}

const Toast = ({ message, mode, show, setShow }: IToastProps) => {
   setTimeout(() => {
      setShow(false);
   }, 5000);
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
         <div className='toast toast-center top-[7vh] z-50'>
            <div
               className={`alert ${mode === 'SUKSES' && 'alert-success'} ${
                  mode === 'LOADING' && 'alert-info'
               } ${mode === 'WARNING' && 'alert-error'} flex text-base-100`}
            >
               {mode === 'WARNING' && (
                  <AiOutlineWarning size={30} className='animate-pulse' />
               )}
               {mode === 'LOADING' && (
                  <AiOutlineLoading3Quarters
                     size={30}
                     className='animate-spin'
                  />
               )}
               {mode === 'SUKSES' && (
                  <AiOutlineCheckCircle size={30} className='animate-pulse' />
               )}
               <span>{message}</span>
            </div>
         </div>
      </Transition>
   );
};

export default Toast;
