import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const DELETE = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   const id = params.id;

   try {
      const brandNameById = await prisma.carBrand.findUnique({ where: { id } });

      const deleteCarModel = await prisma.carModel.deleteMany({
         where: {
            carBrandName: brandNameById?.brandName,
         },
      });

      const deleteCarBrand = await prisma.carBrand.delete({
         where: { id },
      });
      return NextResponse.json(deleteCarBrand);
   } catch (error) {
      console.log(error);
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
   const { brandName } = await req.json();

   try {
      const checkBrandName = await prisma.carBrand.findUnique({
         where: { id },
      });
      if (checkBrandName) {
         return NextResponse.json(
            { message: 'Merek mobil sudah ada' },
            { status: 409 }
         );
      }
      const data = await prisma.carBrand.update({
         data: {
            brandName,
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
