/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

interface IUploadWidget {
   setImages: React.Dispatch<React.SetStateAction<string[]>>;
   images: string[];
   children: (parentMethod: () => void) => React.ReactNode;
}

const CloudinaryMediaLiblaryWidget = ({
   images,
   setImages,
   children,
}: IUploadWidget) => {
   const cloudinaryRef = useRef<any>(null);
   const widgetRef = useRef<any>(null);

   useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://media-library.cloudinary.com/global/all.js';
      document.body.appendChild(script);

      script.onload = () => {
         cloudinaryRef.current = (window as any).cloudinary as any;
         widgetRef.current = cloudinaryRef.current?.createMediaLibrary(
            {
               cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
               api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
               username: process.env.NEXT_PUBLIC_CLOUDINARY_USER_ACCOUNT,
               button_class: 'myBtn',
               button_caption: 'Select Image or Video',
            },
            {
               insertHandler: function (result: any) {
                  const data: any[] = result.assets;
                  const cloudinaryImg: string[] = data.map(
                     (item: any) => item.secure_url
                  );

                  setImages((prevImg) => [...prevImg, ...cloudinaryImg]);
               },
            }
         );
      };

      return () => {
         // Clean up the script if necessary
         document.body.removeChild(script);
      };
   }, []);

   const handleGalery = () => {
      widgetRef.current?.show();
   };

   return <div>{children(handleGalery)}</div>;
};

export default CloudinaryMediaLiblaryWidget;
