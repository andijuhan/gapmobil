//fungsi validasi email
export const isEmailValid = (email: string) => {
   // Pola regex untuk memvalidasi email
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Memeriksa apakah email sesuai dengan pola regex
   return emailRegex.test(email);
};

//fungsi validasi nomer hp
export const isPhoneNumValid = (input: string) => {
   // Hapus semua karakter kecuali angka
   const cleanedNumber = input.replace(/[^\d]/g, '');

   const isCountryCodeValid = cleanedNumber.startsWith('62');

   const isPhoneLengthValid = cleanedNumber.length >= 10;

   if (isCountryCodeValid && isPhoneLengthValid) {
      return true;
   } else {
      return false;
   }
};

export const isPasswordValid = (password: string) => {
   const passwordPattern = /^(?=.*[A-Z]).{8,}$/;
   if (passwordPattern.test(password)) {
      return true;
   } else {
      return false;
   }
};
