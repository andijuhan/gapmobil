import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as argon2 from 'argon2';

export const GET = async (req: Request) => {
   const { searchParams } = new URL(req.url);
   let page = Number(searchParams.get('page')) || 1;
   const take = Number(searchParams.get('take')) || 10;
   const search = searchParams.get('search') || '';

   page = (page - 1) * take;
   try {
      const dataUser = await prisma.user.findMany({
         orderBy: {
            createAt: 'desc',
         },
         skip: page,
         take,
         where: {
            username: {
               contains: search,
               mode: 'insensitive',
            },
         },
      });

      const totalData = await prisma.user.count();
      const totalPage = Math.ceil(totalData / take);

      return NextResponse.json({ dataUser, totalPage });
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
