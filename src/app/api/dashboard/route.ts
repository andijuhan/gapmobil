import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   try {
      const totalCar = await prisma.car.count();
      const totalPost = await prisma.post.count();
      const totalUser = await prisma.user.count();

      return NextResponse.json({ totalCar, totalPost, totalUser });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal mendapatkan data' },
         { status: 500 }
      );
   }
};
