export const createSlug = (input: string) => {
   // Definisikan ekspresi reguler untuk mencocokkan karakter spesial
   const specialCharactersRegex = /[^a-zA-Z0-9\s]/g;

   // Gunakan metode replace dengan ekspresi reguler untuk menghapus karakter spesial
   const resultString = input.replace(specialCharactersRegex, '');
   const slug = resultString.replace(/\s/g, '-');
   const code = generateRandomCode();
   const uniqSlug = slug + '-' + code;

   return uniqSlug;
};

export const generateRandomCode = () => {
   const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let code = '';

   for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
   }

   return code;
};

export const formatPrice = (price: number) => {
   const formattedPrice = price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
   });

   return formattedPrice;
};

export const fetcher = async (url: string) => {
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error('Network response was not ok');
   }
   return response.json();
};

export const generateCarModelYear = () => {
   const startYear = 2000;
   const endYear = new Date().getFullYear();

   const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index
   );

   return years;
};
