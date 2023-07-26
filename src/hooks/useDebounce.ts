import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
   //param value = keyword pencarian, param delay = waktu delay
   //buat state untuk menyimpan nilai debounce
   //buat useEffect untuk mendeteksi perubahan params
   //useEffect akan set nilai debounce sesuai delai waktu
   const [debounceValue, setDebounceValue] = useState<string>('');

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebounceValue(value);
      }, delay);

      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debounceValue;
};

export default useDebounce;
