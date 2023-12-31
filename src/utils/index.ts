export const createSlug = (input: string) => {
   // Definisikan ekspresi reguler untuk mencocokkan karakter spesial
   const specialCharactersRegex = /[^a-zA-Z0-9\s]/g;

   // Gunakan metode replace dengan ekspresi reguler untuk menghapus karakter spesial
   const trimmedString = input.trim();
   const resultString = trimmedString.replace(specialCharactersRegex, '');
   const slug = resultString.replace(/\s/g, '-');
   const code = generateRandomCode();
   const uniqSlug = slug.trim() + '-' + code;

   return uniqSlug;
};

export const generateRandomCode = () => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   let code = '';

   for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
   }

   return code.toLowerCase();
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

export const convertISOdateToStandar = (dateString: string) => {
   const date = dateString.split('T');
   return date[0];
};

export const convertSimpleDateToISO = (dateString: string) => {
   const date = dateString + 'T00:00:00.000Z';
   return date;
};
