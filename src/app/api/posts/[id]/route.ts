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
