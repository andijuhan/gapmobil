import { serialize } from 'cookie';
import * as argon2 from 'argon2';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';
import { createSessionToken } from '@/utils/jwt';

export const POST = async (req: Request, res: Response) => {
   const { username, password } = await req.json();

   try {
      //mendapatkan data user
      const user = await prisma.user.findFirst({
         where: { username },
      });
      if (!user) {
         return NextResponse.json(
            { message: 'username belum terdaftar' },
            { status: 401 }
         );
      }

      //verify username and password
      const isPasswordMatch = await argon2.verify(user.password, password);
      if (!isPasswordMatch) {
         return NextResponse.json(
            { message: 'password tidak cocok' },
            { status: 401 }
         );
      }

      //create token
      const sessionToken = createSessionToken(
         user.username,
         user.email,
         user.role
      );

      //save token to db

      await prisma.user.update({
         where: {
            username,
         },
         data: { token: sessionToken },
      });

      const MAX_AGE = 60 * 60 * 24 * 30; // days;

      //attach cookie
      const serialized = serialize('token', sessionToken, {
         httpOnly: true,
         secure: false,
         sameSite: 'strict',
         maxAge: MAX_AGE,
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
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal authentikasi data' },
         { status: 500 }
      );
   }
};
