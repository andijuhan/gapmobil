import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

interface IParams {
   params: { id: string };
}

export const DELETE = async (req: Request, { params }: IParams) => {
   const id = params.id;

   try {
      await prisma.post.delete({ where: { id } });
      return NextResponse.json({ message: 'Sukses menghapus data' });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal menghapus data' },
         { status: 500 }
      );
   }
};

export const GET = async (req: Request, { params }: IParams) => {
   const id = params.id;

   try {
      const postById = await prisma.post.findUnique({
         where: { id },
         include: {
            categories: true,
         },
      });
      return NextResponse.json(postById);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mendapatkan data' },
         { status: 500 }
      );
   }
};

export const PATCH = async (req: Request, { params }: IParams) => {
   const id = params.id;
   const { published, title, content, categoryIds, image } = await req.json();

   try {
      const updatedPost = await prisma.post.update({
         where: { id },
         data: { published, title, content, image, categoryIds },
      });

      return NextResponse.json(updatedPost);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal mengupdate post' },
         { status: 500 }
      );
   }
};
