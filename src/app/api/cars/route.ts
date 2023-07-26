import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   const { searchParams } = new URL(req.url);
   const sort = searchParams.get('sortby');
   const order = searchParams.get('order');
   const search = searchParams.get('search')?.toLowerCase() || '';
   let page = Number(searchParams.get('page')) || 0;
   const take = Number(searchParams.get('take')) || 10;
   console.log(search);

   if (page !== 0) {
      page = (page - 1) * take;
   }

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

      const cars = await prisma.car.findMany({
         orderBy,
         skip: page,
         take,
         where: {
            title: { contains: search },
         },
         select: {
            id: true,
            images: true,
            title: true,
            published: true,
            updateAt: true,
            harga: true,
         },
      });

      const totalData = await prisma.car.count();
      const totalPage = Math.ceil(totalData / take);

      return NextResponse.json({ cars, totalPage });
   } catch (error) {
      return NextResponse.json(
         { message: 'Gagal mendapatkan data dari database:', error },
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
            title: (title as string).toLowerCase(),
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
