import prisma from '@/utils/prisma';

import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   try {
      const dataSetting = await prisma.generalSetting.findMany();
      return NextResponse.json(dataSetting);
   } catch (error) {
      console.log(error);
      return NextResponse.json({
         message: 'gagal mendapatkan data setting general',
      });
   }
};

export const POST = async (req: Request) => {
   const { title, description } = await req.json();

   if (title === '' || description === '') {
      console.log('title & description tidak boleh kosong');
      return NextResponse.json(
         {
            message: 'title & description tidak boleh kosong',
         },
         { status: 500 }
      );
   }

   try {
      //hapus data setting general sebelumnya
      await prisma.generalSetting.deleteMany();
      const newGeneralSetting = await prisma.generalSetting.create({
         data: {
            title,
            description,
         },
      });
      return NextResponse.json(newGeneralSetting);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal update data setting general' },
         { status: 500 }
      );
   }
};
