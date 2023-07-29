import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const DELETE = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   const id = params.id;

   try {
      const data = await prisma.carModel.delete({ where: { id } });
      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json(
         { message: 'Gagal menghapus data:' + error },
         { status: 500 }
      );
   }
};

export const PATCH = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   const id = params.id;
   const { modelName } = await req.json();

   try {
      const checkModelName = await prisma.carModel.findFirst({
         where: { modelName },
      });

      if (checkModelName) {
         return NextResponse.json(
            { message: 'Model mobil sudah ada' },
            { status: 409 }
         );
      }
      const data = await prisma.carModel.update({
         data: {
            modelName,
         },
         where: {
            id,
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json(
         { message: 'Gagal mengupdate data:' + error },
         { status: 500 }
      );
   }
};
