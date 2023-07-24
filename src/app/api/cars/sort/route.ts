import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   const { searchParams } = new URL(req.url);
   const sort = searchParams.get('sortby');
   const order = searchParams.get('order');

   try {
      let orderBy: any;
      if (sort === 'title') {
         orderBy = { title: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'status') {
         orderBy = { published: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'updateAt') {
         orderBy = { updateAt: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'harga') {
         orderBy = { harga: order === 'desc' ? 'desc' : 'asc' };
      } else {
         throw new Error();
      }

      const data = await prisma.car.findMany({ orderBy });

      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'error', error },
         {
            status: 500,
         }
      );
   }
};
