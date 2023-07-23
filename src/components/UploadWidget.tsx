/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface CloudinaryUploadWidget {
   open: () => void;
   createUploadWidget: (
      options: {
         cloudName: string;
         uploadPreset: string;
      },
      callback: (error: any, result: CloudinaryResult | null) => void
   ) => CloudinaryUploadWidget;
}

interface CloudinaryResult {
   event: string;
   info: {
      secure_url: string;
      public_id: string;
   };
}

interface IUploadWidget {
   setImages: React.Dispatch<React.SetStateAction<string[]>>;
   images: string[];
   warning: boolean;
}

const UploadWidget = ({ images, setImages, warning }: IUploadWidget) => {
   const cloudinaryRef = useRef<CloudinaryUploadWidget | null>(null);
   const widgetRef = useRef<CloudinaryUploadWidget | null>(null);

   useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      document.body.appendChild(script);

      script.onload = () => {
         cloudinaryRef.current = (window as any)
            .cloudinary as CloudinaryUploadWidget;
         widgetRef.current = cloudinaryRef.current?.createUploadWidget(
            {
               cloudName: 'djlpcw7uf',
               uploadPreset: 'qwzja4i9',
            },
            function handleUploadResult(error: any, result: any) {
               const data: any[] = result?.data?.info?.files || [];
               const cloudinaryImg: string[] = data.map(
                  (item: any) => item?.uploadInfo?.secure_url || ''
               );
               console.log(cloudinaryImg.length);
               if (cloudinaryImg.length > 0) {
                  setImages((prevImages) => [...prevImages, ...cloudinaryImg]);
               }
            }
         );
      };

      return () => {
         // Clean up the script if necessary
         document.body.removeChild(script);
      };
   }, []);

   const handleUpload = () => {
      widgetRef.current?.open();
   };

   const handleRemoveImages = (imgUrl: string) => {
      // Filter out the elements that don't match the value to remove
      const updatedArray = images.filter((element) => element !== imgUrl);

      // Update the state with the new array
      setImages(updatedArray);
   };

   return (
      <div
         className={`h-[300px] border rounded-lg w-full flex flex-col justify-center items-center gap-4 ${
            images.length === 0 && warning ? 'ring-2 ring-red-300' : ''
         }`}
      >
         <button
            onClick={handleUpload}
            className='font-semibold bg-blue-600 text-white rounded-lg p-3'
         >
            Add Image
         </button>
         <p className='text-sm font-light'>Car galery slider</p>
         <div className='flex justify-center items-center gap-2'>
            {images.length === 0 ? (
               <img className='w-[100px]' src='/images/no-image.png' alt='' />
            ) : (
               <div className='flex gap-3 justify-center items-center'>
                  {images.map((item, index) => (
                     <div className='relative' key={index}>
                        <img
                           className='w-[90px] h-[60px] object-cover object-center rounded-lg'
                           src={item}
                           alt=''
                        ></img>
                        <div
                           className='absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white cursor-pointer'
                           onClick={() => handleRemoveImages(item)}
                        >
                           <AiOutlineClose />
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default UploadWidget;
