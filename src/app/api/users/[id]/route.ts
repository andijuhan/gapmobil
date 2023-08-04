import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import * as argon2 from 'argon2';

interface IParams {
   params: { id: string };
}

export const GET = async (req: Request, { params }: IParams) => {
   const userId = params.id;

   try {
      const dataUser = await prisma.user.findFirst({ where: { id: userId } });
      return NextResponse.json(dataUser);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mendapatkan data' },
         { status: 500 }
      );
   }
};

export const DELETE = async (req: Request, { params }: IParams) => {
   const userId = params.id;

   try {
      const deleteUser = await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json(deleteUser);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal menghapus data' },
         { status: 500 }
      );
   }
};

export const PATCH = async (req: Request, { params }: IParams) => {
   const userId = params.id;
   const { password, email, phone, role } = await req.json();

   const isUserExist = await prisma.user.findFirst({ where: { email } });
   //jika email sudah digunakan user lain
   if (isUserExist && isUserExist.id !== userId) {
      return NextResponse.json(
         { message: 'Email sudah digunakan user lain' },
         { status: 409 }
      );
   }

   const hash = await argon2.hash(password);
   const isPasswordChange =
      password !== '' && isUserExist?.password !== password;

   //jika password tidak kosong & user mengupdate password
   //lakikan update password di database
   //jika tidak, password di database tidak usah di update
   let payload = isPasswordChange
      ? { password: hash, email, phone, role }
      : { email, phone, role };

   try {
      const updateUser = await prisma.user.update({
         where: { id: userId },
         data: payload,
      });
      return NextResponse.json(updateUser);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengupdate data' },
         { status: 500 }
      );
   }
};
