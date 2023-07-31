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

   const hash = await argon2.hash(password);

   try {
      const updateUser = await prisma.user.update({
         where: { id: userId },
         data: { password: hash, email, phone, role },
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
