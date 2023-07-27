import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   const id = params.id;

   try {
      const data = await prisma.car.findUnique({
         where: { id },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mendapatkan data dari database:' + error },
         { status: 500 }
      );
   }
};

export const PATCH = async (
   req: Request,
   { params }: { params: { id: string } }
) => {
   const id = params.id;
   const {
      merek,
      model,
      tahun,
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
      await prisma.car.update({
         data: {
            merek: (merek as string).toLowerCase(),
            model_: (model as string).toLowerCase(),
            tahun,
            harga,
            published,
            slug,
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
         },
         where: {
            id,
         },
      });

      return NextResponse.json({ message: 'Data berhasil diupdate' });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengupdate data:' + error },
         { status: 500 }
      );
   }
};
