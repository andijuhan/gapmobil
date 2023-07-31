import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as argon2 from 'argon2';

export const GET = async (req: Request) => {
   try {
      const dataUser = await prisma.user.findMany({
         orderBy: {
            createAt: 'desc',
         },
      });
      return NextResponse.json(dataUser);
   } catch (error) {
      NextResponse.json({ message: 'Gagal mendapatkan data' }, { status: 500 });
   }
};

export const POST = async (req: Request, res: Response) => {
   const { username, password, email, role, phone, image } = await req.json();

   try {
      //cek is username exits
      const isUsernameExis = await prisma.user.findFirst({
         where: { username: (username as string).toLowerCase() },
      });
      const isEmailExist = await prisma.user.findFirst({
         where: { email: (email as string).toLowerCase() },
      });

      if (isUsernameExis) {
         return NextResponse.json(
            { message: 'Username sudah digunakan' },
            { status: 409 }
         );
      }

      if (isEmailExist) {
         return NextResponse.json(
            { message: 'Email sudah digunakan' },
            { status: 409 }
         );
      }
      const hash = await argon2.hash(password);
      const dataUser = await prisma.user.create({
         data: {
            username: (username as string).toLowerCase(),
            password: hash,
            email: (email as string).toLowerCase(),
            role,
            phone,
            image,
         },
      });
      return NextResponse.json(dataUser);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal membuat data user' },
         { status: 500 }
      );
   }
};
