interface IDialogProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   title: string;
   message: string;
   callback: () => void;
}

const Dialog = ({ show, setShow, title, message, callback }: IDialogProps) => {
   return (
      <div
         className={`fixed inset-0 bg-black bg-opacity-30 ${
            show ? 'z-40 opacity-100' : '-z-50 opacity-0'
         } transition-all duration-500 ease-in-out`}
      >
         <dialog open={show} id='my_modal_2' className='modal'>
            <div className='modal-box'>
               <h3 className='font-bold text-lg capitalize'>{title}</h3>
               <p className='py-4'>{message}</p>
               <div className='modal-action'>
                  {/* if there is a button in form, it will close the modal */}
                  <button
                     onClick={() => {
                        callback();
                        setShow(false);
                     }}
                     className='btn btn-primary'
                  >
                     Oke
                  </button>
                  <button onClick={() => setShow(false)} className='btn'>
                     Close
                  </button>
               </div>
            </div>
         </dialog>
      </div>
   );
};

export default Dialog;
