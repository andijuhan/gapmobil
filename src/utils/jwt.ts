import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.SECRET || '';

export const createProfileUpdateToken = (email: string, id: string): string => {
   const payload = { email, id };

   const option = {
      expiresIn: '1h',
   };

   const token = jwt.sign(payload, secretKey, option);
   return token;
};

export const validateProfileUpdateToken = (token: string): object | null => {
   try {
      const decode = jwt.verify(token, secretKey);
      return decode as object;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const createSessionToken = (
   id: string,
   username: string,
   email: string,
   role: string
): string => {
   const payload = { id, username, email, role };

   const option = {
      expiresIn: '1d',
   };

   const token = jwt.sign(payload, secretKey, option);
   return token;
};

export const validateSessionToken = (token: string): object | null => {
   try {
      const decoded = jwt.verify(token, secretKey);
      return decoded as object;
   } catch (error) {
      console.log('gagal memvalidasi session token : ' + error);
      return null;
   }
};
