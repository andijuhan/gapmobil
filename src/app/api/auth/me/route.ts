import { validateSessionToken } from '@/utils/jwt';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
   const authorization = req.headers.get('authorization') || '';
   const token = authorization.slice(7);

   if (!token) {
      return NextResponse.json(
         {
            message: 'unauthorized',
         },
         {
            status: 401,
         }
      );
   }

   const validateToken = validateSessionToken(token);

   if (!validateToken) {
      return NextResponse.json(
         {
            message: 'Something went wrong',
         },
         {
            status: 400,
         }
      );
   }

   return NextResponse.json(validateToken);
};
