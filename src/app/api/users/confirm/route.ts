import { validateProfileUpdateToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Request) => {
   const { searchParams } = new URL(req.url);
   const token = searchParams.get('token') || '';

   //validasi token
   const validateToken: any = validateProfileUpdateToken(token);
   if (!validateToken) {
      return NextResponse.json(
         {
            message: 'token expired',
         },
         {
            status: 500,
         }
      );
   }

   const changeEmail = await prisma.user.update({
      where: {
         id: validateToken.id,
      },
      data: {
         email: validateToken.email,
      },
   });

   return NextResponse.json(changeEmail);
};
