import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   try {
      const data = await prisma.car.findMany({
         orderBy: {
            updateAt: 'desc',
         },
      });
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
