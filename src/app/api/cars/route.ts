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
         orderBy = { updateAt: 'desc' };
      }

      const data = await prisma.car.findMany({ orderBy, take: 10 });

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json(
         { message: 'error', error },
         {
            status: 500,
         }
      );
   }
};

export const POST = async (req: Request, res: Response) => {
   const {
      title,
      slug,
      published,
      harga,
      jarakTempuh,
      tipeRegistrasi,
      transmisi,
      garansi,
      bahanBakar,
      tanganKe,
      tempatDuduk,
      warna,
      tglReg,
      masaBerlakuStnk,
      statusOdo,
      images,
      detailModifikasi,
   } = await req.json();

   try {
      const data = await prisma.car.create({
         data: {
            title,
            slug,
            published,
            harga,
            jarakTempuh,
            tipeRegistrasi,
            transmisi,
            garansi,
            bahanBakar,
            tanganKe,
            tempatDuduk,
            warna,
            tglReg: new Date(tglReg),
            masaBerlakuStnk: new Date(masaBerlakuStnk),
            statusOdo,
            images,
            detailModifikasi,
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json(
         { message: 'errorrr: ' + error },
         {
            status: 500,
         }
      );
   }
};
