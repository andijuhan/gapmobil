import { NextResponse } from 'next/server';

import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   try {
      const data = await prisma.carBrand.findMany();
      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengambil data brand car:' + error },
         {
            status: 500,
         }
      );
   }
};

export const POST = async (req: Request, res: Response) => {
   const { brandName } = await req.json();

   try {
      const data = await prisma.carBrand.create({
         data: { brandName: (brandName as string).toLowerCase() },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal menambah data brand car:' + error },
         {
            status: 500,
         }
      );
   }
};
