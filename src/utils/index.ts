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
