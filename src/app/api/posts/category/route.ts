import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   try {
      const categories = await prisma.category.findMany();
      return NextResponse.json(categories);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal mendapatkan data kategori' },
         { status: 500 }
      );
   }
};

export const POST = async (req: Request) => {
   const { categoryName, slug } = await req.json();

   if (!categoryName) {
      console.log('categoryName tidak boleh kosong');
      return NextResponse.json(
         { message: 'categoryName tidak boleh kosong' },
         { status: 500 }
      );
   }

   try {
      //cek apakah nama kategori sudah ada
      const isCategoryNameExist = await prisma.category.findFirst({
         where: { categoryName },
      });
      if (isCategoryNameExist) {
         return NextResponse.json(
            { message: 'Nama kategori sudah ada' },
            { status: 500 }
         );
      }
      const newCategory = await prisma.category.create({
         data: {
            categoryName,
            slug,
         },
      });
      return NextResponse.json(newCategory);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal menambah data kategori' },
         { status: 500 }
      );
   }
};
