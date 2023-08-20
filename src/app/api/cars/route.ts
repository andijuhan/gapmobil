import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export const GET = async (req: Request, res: Response) => {
   const { searchParams } = new URL(req.url);
   const sort = searchParams.get('sortby');
   const order = searchParams.get('order');
   const search = searchParams.get('search')?.toLowerCase() || '';
   let page = Number(searchParams.get('page')) || 1;
   const take = Number(searchParams.get('take')) || 10;

   page = (page - 1) * take;

   try {
      let orderBy: any;
      if (sort === 'merek') {
         orderBy = { carBrandName: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'status') {
         orderBy = { published: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'updateAt') {
         orderBy = { updateAt: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'harga') {
         orderBy = { price: order === 'desc' ? 'desc' : 'asc' };
      } else {
         orderBy = { updateAt: 'desc' };
      }

      const cars = await prisma.car.findMany({
         orderBy,
         skip: page,
         take,
         where: {
            OR: [
               { carBrandName: { contains: search } },
               { carModel: { contains: search } },
            ],
         },
         select: {
            id: true,
            images: true,
            carBrandName: true,
            carModel: true,
            year: true,
            published: true,
            updateAt: true,
            price: true,
            username: true,
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

export const DELETE = async (req: Request, res: Response) => {
   const { carId }: { carId: string[] } = await req.json();

   try {
      const deleteCar = await prisma.car.deleteMany({
         where: {
            id: {
               in: carId,
            },
         },
      });
      return NextResponse.json(deleteCar);
   } catch (error) {
      return NextResponse.json(
         { message: 'Gagal menghapus data' },
         { status: 500 }
      );
   }
};

export const POST = async (req: Request, res: Response) => {
   const {
      carBrandName,
      username,
      carModel,
      year,
      slug,
      published,
      price,
      mileage,
      registrationType,
      transmision,
      warranty,
      fuel,
      previousOwners,
      maximumPassengers,
      color,
      registrationDate,
      STNKExpiration,
      odoStatus,
      images,
      description,
   } = await req.json();

   try {
      const data = await prisma.car.create({
         data: {
            carBrandName: (carBrandName as string).toLowerCase(),
            carModel: (carModel as string).toLowerCase(),
            year,
            username,
            slug,
            published,
            price,
            mileage,
            registrationType,
            transmision,
            warranty,
            fuel,
            previousOwners,
            maximumPassengers,
            color,
            registrationDate: new Date(registrationDate),
            STNKExpiration: new Date(STNKExpiration),
            odoStatus,
            images,
            description,
         },
      });

      return NextResponse.json(data);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'errorrr: ' + error },
         {
            status: 500,
         }
      );
   }
};
