import prisma from '@/utils/prisma';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
   const serialized = serialize('token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
   });

   return NextResponse.json(
      { message: 'sukses' },
      {
         status: 200,
         headers: {
            'Set-Cookie': serialized,
         },
      }
   );
};
