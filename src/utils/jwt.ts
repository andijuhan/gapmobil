import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.SECRET || '';

export const createSessionToken = (
   username: string,
   email: string,
   role: string
): string => {
   const payload = { username, email, role };

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
