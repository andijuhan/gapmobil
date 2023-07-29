import { NextResponse } from 'next/server';

import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   const { searchParams } = new URL(req.url);
   const brand = searchParams.get('brand') || '';
   try {
      const data = await prisma.carModel.findMany({
         where: {
            carBrandName: brand,
         },
         orderBy: {
            modelName: 'asc',
         },
      });
      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengambil data brand model car:' + error },
         {
            status: 500,
         }
      );
   }
};

export const POST = async (req: Request, res: Response) => {
   const { modelName, carBrandName } = await req.json();

   try {
      const checkModelName = await prisma.carModel.findFirst({
         where: {
            modelName,
         },
      });

      if (checkModelName) {
         return NextResponse.json(
            { message: 'Model mobil sudah ada' },
            { status: 409 }
         );
      }
      const data = await prisma.carModel.create({
         data: {
            carBrandName,
            modelName: (modelName as string).toLowerCase(),
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal menambah data model car:' + error },
         {
            status: 500,
         }
      );
   }
};
