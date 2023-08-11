import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

interface IParams {
   params: { id: string };
}

export const GET = async (req: Request, { params }: IParams) => {
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

export const DELETE = async (req: Request, { params }: IParams) => {
   const id = params.id;

   try {
      await prisma.car.delete({ where: { id } });
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
      deskripsi,
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
            tglReg: new Date(tglReg),
            masaBerlakuStnk: new Date(masaBerlakuStnk),
            statusOdo,
            images,
            deskripsi,
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
