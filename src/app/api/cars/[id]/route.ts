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
      carBrandName,
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
      await prisma.car.update({
         data: {
            carBrandName: (carBrandName as string).toLowerCase(),
            carModel: (carModel as string).toLowerCase(),
            year,
            price,
            published,
            slug,
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
