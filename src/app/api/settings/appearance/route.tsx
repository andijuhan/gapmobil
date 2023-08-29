import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   try {
      const appearanceSetting = await prisma.appearanceSetting.findMany();
      return NextResponse.json(appearanceSetting);
   } catch (error) {
      console.log('gagal mendapatkan data');
      return NextResponse.json(
         { message: 'gagal mendapatkan data' },
         { status: 500 }
      );
   }
};

export const POST = async (req: Request) => {
   const { images } = await req.json();

   try {
      await prisma.appearanceSetting.deleteMany();
      const newPppearanceSetting = await prisma.appearanceSetting.create({
         data: {
            imageSlider: images,
         },
      });
      return NextResponse.json(newPppearanceSetting);
   } catch (error) {
      console.log('gagal menyimpan pengaturan');
      return NextResponse.json(
         { message: 'gagal menyimpan pengaturan' },
         { status: 500 }
      );
   }
};
