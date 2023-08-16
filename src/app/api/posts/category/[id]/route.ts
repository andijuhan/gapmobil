import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

interface IParams {
   params: { id: string };
}

export const DELETE = async (req: Request, { params }: IParams) => {
   const id = params.id;

   try {
      await prisma.category.delete({ where: { id } });
      return NextResponse.json({ message: 'Sukses menghapus data' });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal menghapus data' },
         { status: 500 }
      );
   }
};

export const PATCH = async (req: Request, { params }: IParams) => {
   const id = params.id;
   const { categoryName } = await req.json();

   try {
      //cek apakah nama kategori sudah digunakan
      const isCategoryNameInUse = await prisma.category.findFirst({
         where: {
            categoryName,
         },
      });

      if (isCategoryNameInUse) {
         return NextResponse.json(
            { message: 'Nama Kategori sudah digunakan' },
            { status: 500 }
         );
      }
      const updatedCategory = await prisma.category.update({
         where: { id },
         data: { categoryName },
      });

      return NextResponse.json(updatedCategory);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengaupdate kategori' },
         { status: 500 }
      );
   }
};
